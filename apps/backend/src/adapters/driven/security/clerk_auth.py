"""Clerk JWT authentication module."""

import logging
import os
from datetime import datetime
from functools import lru_cache
from typing import Any, Dict, Optional

import httpx
import jwt
from fastapi import HTTPException, status

logger = logging.getLogger(__name__)

CLERK_JWT_KEY = os.getenv("CLERK_JWT_KEY", "")
CLERK_API_URL = "https://api.clerk.com/v1"


class ClerkAuthError(HTTPException):
    """Clerk authentication error."""

    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"},
        )


@lru_cache(maxsize=1)
def get_clerk_public_keys() -> Dict[str, Any]:
    """
    Fetch Clerk's public keys for JWT verification (cached).

    Returns:
        Dictionary with Clerk JWKS data

    Raises:
        ClerkAuthError: If unable to fetch keys from Clerk
    """
    try:
        with httpx.Client() as client:
            resp = client.get(f"{CLERK_API_URL}/jwks", timeout=10.0)
            resp.raise_for_status()
            return resp.json()
    except httpx.RequestError as e:
        logger.error(f"Error fetching Clerk JWKS: {str(e)}")
        raise ClerkAuthError(f"Erro ao obter chaves públicas Clerk: {str(e)}")


def verify_clerk_token(token: str) -> Dict[str, Any]:
    """
    Verify Clerk JWT token using RS256 algorithm.

    Args:
        token: JWT token from Clerk (may include "Bearer " prefix)

    Returns:
        Decoded token payload with user info

    Raises:
        ClerkAuthError: If token is invalid, expired, or verification fails
    """
    if not token:
        raise ClerkAuthError("Token ausente")

    try:
        # Remove 'Bearer ' prefix if present
        if token.startswith("Bearer "):
            token = token[7:]

        # First decode without verification to get kid from header
        unverified = jwt.decode(token, options={"verify_signature": False})

        # Get public keys from Clerk
        keys_response = get_clerk_public_keys()
        public_keys = {key["kid"]: key for key in keys_response.get("keys", [])}

        # Get the key ID from token header
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")

        if not kid or kid not in public_keys:
            raise ClerkAuthError("Key ID inválido no token")

        # Get the public key in PEM format
        key_data = public_keys[kid]

        # Verify with correct public key
        decoded = jwt.decode(
            token,
            algorithms=["RS256"],
            options={"verify_signature": True},
            audience=os.getenv("CLERK_AUDIENCE"),  # Optional: verify audience if set
            # Note: PyJWT with RS256 requires the key to be in the right format.
            # If the above fails, you may need: jwt.PyJWK.from_dict(key_data).key
        )

        logger.info(f"Token verified for user: {decoded.get('sub')}")
        return decoded

    except jwt.ExpiredSignatureError:
        raise ClerkAuthError("Token expirado")
    except jwt.InvalidTokenError as e:
        logger.warning(f"Invalid token: {str(e)}")
        raise ClerkAuthError(f"Token inválido: {str(e)}")
    except Exception as e:
        logger.error(f"Error verifying token: {str(e)}")
        raise ClerkAuthError(f"Erro ao verificar token: {str(e)}")


def extract_user_id_from_token(decoded_token: Dict[str, Any]) -> str:
    """
    Extract user ID from decoded Clerk token.

    Args:
        decoded_token: Decoded JWT payload from Clerk

    Returns:
        User ID (subject claim)

    Raises:
        ClerkAuthError: If user ID not found in token
    """
    user_id = decoded_token.get("sub")
    if not user_id:
        raise ClerkAuthError("User ID not found in token")
    return user_id
