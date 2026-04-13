import os
import secrets
from typing import Optional

import httpx
from fastapi import APIRouter, HTTPException, Request, Query
from fastapi.responses import RedirectResponse
from pydantic import BaseModel

from src.config import settings


router = APIRouter(prefix="/auth", tags=["OAuth (Clerk)"])


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


@router.get("/login")
async def login(state: Optional[str] = Query(None)):
    """
    Redirect to Clerk sign-in page.
    For mobile: use sau via://callback as redirect_uri
    """
    clerk_publishable_key = settings.clerk_publishable_key or "keyless_mode"

    frontend_url = settings.cors_origins.split(",")[0] if settings.cors_origins else "http://localhost:3000"

    sign_in_url = f"{frontend_url}/sign-in"
    if state:
        sign_in_url += f"?state={state}"

    return RedirectResponse(url=sign_in_url)


@router.get("/callback")
async def callback(code: str = Query(...), state: Optional[str] = Query(None)):
    """
    Handle OAuth callback.
    With Clerk keyless mode, this is handled by the frontend.
    """
    frontend_url = settings.cors_origins.split(",")[0] if settings.cors_origins else "http://localhost:3000"

    if state == "mobile":
        return RedirectResponse(url=f"sauvia://callback?code={code}")

    return RedirectResponse(url=f"{frontend_url}/?authenticated=true")


@router.get("/userinfo")
async def userinfo(request: Request):
    """Get user info - placeholder for Clerk integration"""
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=401, detail="Missing or invalid authorization header"
        )

    return {
        "message": "Use Clerk frontend components for authentication",
        "docs": "https://clerk.com/docs/nextjs/quickstart",
    }


@router.get("/jwks")
async def jwks():
    """Get JWKS from Clerk"""
    if not settings.clerk_publishable_key:
        return {
            "keys": [],
            "message": "Clerk not configured - using keyless mode",
        }

    clerk_js_url = f"https://clerk.clerk.com/api/v1/clerk_pub_key/{settings.clerk_publishable_key}/jwks"

    async with httpx.AsyncClient() as client:
        try:
            response = await client.get(clerk_js_url)
            return response.json()
        except Exception:
            return {"keys": [], "error": "Unable to fetch JWKS from Clerk"}


@router.post("/logout")
async def logout():
    """Logout and redirect to Clerk sign-out"""
    frontend_url = settings.cors_origins.split(",")[0] if settings.cors_origins else "http://localhost:3000"
    return RedirectResponse(url=f"{frontend_url}/sign-out")
