import boto3
import hmac
import hashlib
import base64
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException, Header, Query
from fastapi.responses import RedirectResponse
from pydantic import BaseModel
from src.config import settings

router = APIRouter()


def get_cognito_client():
    return boto3.client(
        "cognito-idp",
        region_name=settings.cognito_region,
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
    )


def calculate_secret_hash(username: str) -> str:
    """Calculate Cognito Secret Hash"""
    if not settings.cognito_client_secret:
        return ""

    message = username + settings.cognito_client_id
    signature = hmac.new(
        settings.cognito_client_secret.encode("utf-8"),
        message.encode("utf-8"),
        hashlib.sha256,
    ).digest()
    return base64.b64encode(signature).decode("utf-8")


def create_jwt_token(user_sub: str, email: str) -> tuple[str, str]:
    import jwt
    import secrets

    now = datetime.now(timezone.utc)
    access_token = jwt.encode(
        {
            "sub": user_sub,
            "email": email,
            "iat": now,
            "exp": now.timestamp() + (settings.access_token_expire_minutes * 60),
            "type": "access",
        },
        settings.secret_key,
        algorithm="HS256",
    )
    refresh_token = jwt.encode(
        {
            "sub": user_sub,
            "iat": now,
            "exp": now.timestamp() + (settings.refresh_token_expire_days * 86400),
            "type": "refresh",
        },
        settings.secret_key,
        algorithm="HS256",
    )
    return access_token, refresh_token


@router.get("/callback")
async def auth_callback(
    code: str = Query(...),
    state: str = Query("web"),  # Pode ser 'web' ou 'mobile'
):
    """
    URL fixa para processar o token do Cognito.
    Pode redirecionar para o Web App ou para o Mobile via Deep Link.
    """
    try:
        # 1. Trocar o código pelos tokens no Cognito
        # Nota: Para trocar o código, o Cognito exige uma chamada POST para o endpoint /oauth2/token
        # Aqui, como o front já costuma ter os tokens via SDK, esta rota serve para orquestrar
        # Se o fluxo for Authorization Code no backend, implementaríamos a troca aqui.

        # 2. Lógica de Redirecionamento Baseada no 'state' ou parâmetros de busca
        if state == "mobile":
            # Redireciona para o deep-link do app mobile
            return RedirectResponse(url=f"sauvia://callback?code={code}")

        # Redireciona para o dashboard web por padrão
        # Buscamos a primeira URL do CORS como base
        base_web_url = settings.cors_origins.split(",")[0]
        return RedirectResponse(url=f"{base_web_url}/dashboard?code={code}")

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Callback failed: {str(e)}")


@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    try:
        cognito = get_cognito_client()

        sign_up_params = {
            "ClientId": settings.cognito_client_id,
            "Username": request.email,
            "Password": request.password,
            "UserAttributes": [
                {"Name": "name", "Value": request.name},
                {"Name": "email", "Value": request.email},
            ],
        }

        # Add SecretHash if client has secret
        if settings.cognito_client_secret:
            sign_up_params["ClientSecretHash"] = calculate_secret_hash(request.email)

        cognito.sign_up(**sign_up_params)

        return TokenResponse(
            access_token="pending_confirmation",
            refresh_token="pending_confirmation",
            token_type="bearer",
        )
    except Exception as e:
        error_msg = str(e)
        if "UserAlreadyExistsException" in error_msg:
            raise HTTPException(status_code=400, detail="Email already registered")
        raise HTTPException(status_code=400, detail=f"Registration failed: {error_msg}")


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    try:
        cognito = get_cognito_client()

        auth_params = {
            "USERNAME": request.email,
            "PASSWORD": request.password,
        }

        # Add SecretHash if client has secret
        if settings.cognito_client_secret:
            auth_params["SECRET_HASH"] = calculate_secret_hash(request.email)

        response = cognito.initiate_auth(
            ClientId=settings.cognito_client_id,
            AuthFlow="USER_PASSWORD_AUTH",
            AuthParameters=auth_params,
        )
        access_token = response["AuthenticationResult"]["AccessToken"]
        refresh_token = response["AuthenticationResult"]["RefreshToken"]

        user_response = cognito.get_user(AccessToken=access_token)
        email = next(
            (
                a["Value"]
                for a in user_response["UserAttributes"]
                if a["Name"] == "email"
            ),
            request.email,
        )
        user_sub = next(
            (a["Value"] for a in user_response["UserAttributes"] if a["Name"] == "sub"),
            "",
        )

        jwt_access, jwt_refresh = create_jwt_token(user_sub, email)

        return TokenResponse(
            access_token=jwt_access,
            refresh_token=jwt_refresh,
            token_type="bearer",
        )
    except Exception as e:
        error_msg = str(e)
        if "NotAuthorizedException" in error_msg:
            raise HTTPException(status_code=401, detail="Invalid credentials")
        if "UserNotConfirmedException" in error_msg:
            raise HTTPException(status_code=400, detail="Email not confirmed")
        raise HTTPException(status_code=400, detail=f"Login failed: {error_msg}")


@router.post("/refresh")
async def refresh_token():
    import jwt
    from fastapi import Header

    async def get_refresh_token(authorization: str = Header(None)):
        if not authorization or not authorization.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Missing refresh token")
        return authorization.replace("Bearer ", "")

    token = await get_refresh_token()
    try:
        payload = jwt.decode(token, settings.secret_key, algorithms=["HS256"])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")

        user_sub = payload.get("sub")
        email = payload.get("email")

        jwt_access, jwt_refresh = create_jwt_token(user_sub, email)
        return TokenResponse(
            access_token=jwt_access,
            refresh_token=jwt_refresh,
            token_type="bearer",
        )
    except Exception as e:
        raise HTTPException(status_code=401, detail="Invalid refresh token")


@router.post("/logout")
async def logout(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        return {"message": "Logged out successfully"}

    access_token = authorization.replace("Bearer ", "")
    try:
        cognito = get_cognito_client()
        cognito.global_sign_out(AccessToken=access_token)
    except:
        pass

    return {"message": "Logged out successfully"}


@router.get("/me")
async def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    access_token = authorization.replace("Bearer ", "")
    try:
        import jwt

        payload = jwt.decode(access_token, settings.secret_key, algorithms=["HS256"])
        return {
            "id": payload.get("sub"),
            "email": payload.get("email"),
        }
    except:
        raise HTTPException(status_code=401, detail="Invalid token")
