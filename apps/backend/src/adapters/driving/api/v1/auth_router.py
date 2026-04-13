from fastapi import APIRouter, HTTPException, Header
from pydantic import BaseModel
from src.config import settings
import jwt

router = APIRouter()


class LoginRequest(BaseModel):
    email: str
    password: str


class RegisterRequest(BaseModel):
    email: str
    password: str
    name: str
    cpf: str | None = None


class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class UserResponse(BaseModel):
    id: str
    email: str
    name: str | None = None


def get_clerk_client():
    """Initialize Clerk client - uses keyless mode if no secret key configured"""
    if not settings.clerk_secret_key:
        return None
    from clerk import Clerk
    return Clerk(api_key=settings.clerk_secret_key)


def create_jwt_token(user_sub: str, email: str) -> tuple[str, str]:
    """Create JWT tokens for session (uses own secret key as fallback)"""
    from datetime import datetime, timezone

    now = datetime.now(timezone.utc)
    access_token = jwt.encode(
        {
            "sub": user_sub,
            "email": email,
            "iat": now,
            "exp": now.timestamp() + (settings.access_token_expire_minutes * 60),
            "type": "access",
            "iss": "sauvia-backend",
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
            "iss": "sauvia-backend",
        },
        settings.secret_key,
        algorithm="HS256",
    )
    return access_token, refresh_token


@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    """
    Register new user.
    Note: With Clerk, users are created through Clerk's sign-up flow.
    This endpoint is a placeholder for custom registration logic.
    """
    clerk = get_clerk_client()
    if clerk:
        try:
            clerk.users.create(
                email_addresses=[{"email": request.email, "verify_email": True}],
                first_name=request.name,
            )
            return TokenResponse(
                access_token="clerk_managed",
                refresh_token="clerk_managed",
                token_type="bearer",
            )
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Registration failed: {str(e)}")

    return TokenResponse(
        access_token="pending_clerk_setup",
        refresh_token="pending_clerk_setup",
        token_type="bearer",
    )


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    """
    Login endpoint.
    Note: With Clerk, authentication is handled by Clerk's frontend components.
    This endpoint can be used for API-based authentication if needed.
    """
    clerk = get_clerk_client()
    if clerk:
        try:
            user = clerk.users.get_user_by_email(request.email)
            if user:
                jwt_access, jwt_refresh = create_jwt_token(user.id, request.email)
                return TokenResponse(
                    access_token=jwt_access,
                    refresh_token=jwt_refresh,
                    token_type="bearer",
                )
        except Exception as e:
            pass

    return TokenResponse(
        access_token="clerk_redirect",
        refresh_token="clerk_redirect",
        token_type="bearer",
    )


@router.post("/refresh")
async def refresh_token(authorization: str = Header(None)):
    """Refresh access token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing refresh token")

    token = authorization.replace("Bearer ", "")
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
    """Logout user and revoke Clerk session if available"""
    if not authorization or not authorization.startswith("Bearer "):
        return {"message": "Logged out successfully"}

    clerk = get_clerk_client()
    if clerk:
        try:
            token = authorization.replace("Bearer ", "")
            clerk.sessions.revoke(token)
        except Exception:
            pass

    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserResponse)
async def get_current_user(authorization: str = Header(None)):
    """Get current user from JWT token"""
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    access_token = authorization.replace("Bearer ", "")
    try:
        payload = jwt.decode(
            access_token,
            settings.secret_key,
            algorithms=["HS256"],
            options={"iss": "sauvia-backend"},
        )
        return UserResponse(
            id=payload.get("sub"),
            email=payload.get("email", ""),
            name=payload.get("name"),
        )
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidIssuerError:
        raise HTTPException(status_code=401, detail="Invalid token issuer")
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.get("/clerk-auth-status")
async def clerk_auth_status():
    """Check if Clerk is properly configured"""
    clerk = get_clerk_client()
    return {
        "configured": clerk is not None,
        "mode": "clerk" if clerk else "keyless",
    }
