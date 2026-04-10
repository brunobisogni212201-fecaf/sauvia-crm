import os
import secrets
from typing import Optional

import httpx
from authlib.integrations.httpx_client import OAuth2Client
from fastapi import APIRouter, HTTPException, Request, Query
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

from src.config import settings


router = APIRouter(prefix="/auth", tags=["OAuth"])

COGNITO_CLIENT_ID = os.getenv("COGNITO_CLIENT_ID", "2fs7g0dd2c7rp3n4aas53c18p0")
COGNITO_CLIENT_SECRET = os.getenv("COGNITO_CLIENT_SECRET", "")
COGNITO_USER_POOL_ID = os.getenv("COGNITO_USER_POOL_ID", "us-east-1_Zftb4N8wn")
COGNITO_REGION = os.getenv("COGNITO_REGION", "us-east-1")
COGNITO_DOMAIN = (
    f"https://{COGNITO_USER_POOL_ID}.auth.{COGNITO_REGION}.amazoncognito.com"
)

REDIRECT_URI = os.getenv(
    "COGNITO_REDIRECT_URI", "https://sauvia.com.br/api/v1/auth/callback"
)


class TokenResponse(BaseModel):
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    id_token: Optional[str] = None
    token_type: str = "Bearer"
    expires_in: int = 3600


class UserInfo(BaseModel):
    sub: str
    email: Optional[str] = None
    email_verified: Optional[bool] = None
    name: Optional[str] = None
    cognito_username: Optional[str] = None


@router.get("/login")
async def login():
    """Redirect to Cognito login page"""
    state = secrets.token_urlsafe(32)

    auth_url = f"{COGNITO_DOMAIN}/login"
    params = {
        "client_id": COGNITO_CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": "email openid profile",
        "state": state,
    }

    query_string = "&".join([f"{k}={v}" for k, v in params.items()])
    full_url = f"{auth_url}?{query_string}"

    return RedirectResponse(url=full_url)


@router.get("/callback")
async def callback(code: str = Query(...), state: Optional[str] = Query(None)):
    """Handle OAuth callback from Cognito"""
    if not COGNITO_CLIENT_SECRET:
        raise HTTPException(
            status_code=500, detail="Cognito client secret not configured"
        )

    token_url = f"{COGNITO_DOMAIN}/oauth2/token"

    async with httpx.AsyncClient() as client:
        response = await client.post(
            token_url,
            data={
                "grant_type": "authorization_code",
                "client_id": COGNITO_CLIENT_ID,
                "client_secret": COGNITO_CLIENT_SECRET,
                "code": code,
                "redirect_uri": REDIRECT_URI,
            },
            headers={"Content-Type": "application/x-www-form-urlencoded"},
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=400, detail=f"Token exchange failed: {response.text}"
        )

    tokens = response.json()

    userinfo_url = f"{COGNITO_DOMAIN}/oauth2/userInfo"

    access_token = tokens.get("access_token")
    async with httpx.AsyncClient() as client:
        user_response = await client.get(
            userinfo_url,
            headers={"Authorization": f"Bearer {access_token}"},
        )

    user_data = user_response.json()

    return {
        "tokens": tokens,
        "user": user_data,
    }


@router.get("/userinfo")
async def userinfo(request: Request):
    """Get user info from Cognito"""
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Missing or invalid authorization header"
        )

    access_token = auth_header.replace("Bearer ", "")

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{COGNITO_DOMAIN}/oauth2/userInfo",
            headers={"Authorization": f"Bearer {access_token}"},
        )

    if response.status_code != 200:
        raise HTTPException(status_code=401, detail="Invalid token")

    return response.json()


@router.post("/token")
async def token_grant(
    grant_type: str = Query(...),
    code: Optional[str] = Query(None),
    refresh_token: Optional[str] = Query(None),
    redirect_uri: Optional[str] = Query(None),
):
    """OAuth2 token endpoint for client credentials or refresh token"""

    if grant_type == "authorization_code":
        if not code:
            raise HTTPException(status_code=400, detail="Missing authorization code")

        if not COGNITO_CLIENT_SECRET:
            raise HTTPException(
                status_code=500, detail="Cognito client secret not configured"
            )

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{COGNITO_DOMAIN}/oauth2/token",
                data={
                    "grant_type": "authorization_code",
                    "client_id": COGNITO_CLIENT_ID,
                    "client_secret": COGNITO_CLIENT_SECRET,
                    "code": code,
                    "redirect_uri": redirect_uri or REDIRECT_URI,
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )

    elif grant_type == "refresh_token":
        if not refresh_token:
            raise HTTPException(status_code=400, detail="Missing refresh token")

        if not COGNITO_CLIENT_SECRET:
            raise HTTPException(
                status_code=500, detail="Cognito client secret not configured"
            )

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{COGNITO_DOMAIN}/oauth2/token",
                data={
                    "grant_type": "refresh_token",
                    "client_id": COGNITO_CLIENT_ID,
                    "client_secret": COGNITO_CLIENT_SECRET,
                    "refresh_token": refresh_token,
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )

    elif grant_type == "client_credentials":
        if not COGNITO_CLIENT_SECRET:
            raise HTTPException(
                status_code=500, detail="Cognito client secret not configured"
            )

        async with httpx.AsyncClient() as client:
            response = await client.post(
                f"{COGNITO_DOMAIN}/oauth2/token",
                data={
                    "grant_type": "client_credentials",
                    "client_id": COGNITO_CLIENT_ID,
                    "client_secret": COGNITO_CLIENT_SECRET,
                    "scope": "default-m2m-resource-server/read default-m2m-resource-server/write",
                },
                headers={"Content-Type": "application/x-www-form-urlencoded"},
            )

    else:
        raise HTTPException(
            status_code=400, detail=f"Unsupported grant type: {grant_type}"
        )

    if response.status_code != 200:
        raise HTTPException(
            status_code=400, detail=f"Token request failed: {response.text}"
        )

    return response.json()


@router.post("/logout")
async def logout():
    """Logout and redirect to Cognito logout"""
    logout_url = f"{COGNITO_DOMAIN}/logout"
    params = {
        "client_id": COGNITO_CLIENT_ID,
        "logout_uri": REDIRECT_URI,
    }

    query_string = "&".join([f"{k}={v}" for k, v in params.items()])

    return RedirectResponse(url=f"{logout_url}?{query_string}")


@router.get("/jwks")
async def jwks():
    """Get JWKS from Cognito"""
    jwks_url = f"https://cognito-idp.{COGNITO_REGION}.amazonaws.com/{COGNITO_USER_POOL_ID}/.well-known/jwks.json"

    async with httpx.AsyncClient() as client:
        response = await client.get(jwks_url)

    return response.json()
