import boto3
from datetime import datetime, timezone
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.config import settings

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    cpf: str


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


def get_cognito_client():
    return boto3.client(
        "cognito-idp",
        region_name=settings.cognito_region,
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
    )


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


@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    try:
        cognito = get_cognito_client()
        cognito.sign_up(
            ClientId=settings.cognito_client_id,
            Username=request.email,
            Password=request.password,
            UserAttributes=[
                {"Name": "name", "Value": request.name},
                {"Name": "email", "Value": request.email},
                {"Name": "custom:cpf", "Value": request.cpf},
            ],
        )
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
        response = cognito.initiate_auth(
            ClientId=settings.cognito_client_id,
            AuthFlow="USER_PASSWORD_AUTH",
            AuthParameters={
                "USERNAME": request.email,
                "PASSWORD": request.password,
            },
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
