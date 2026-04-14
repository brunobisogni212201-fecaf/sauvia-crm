"""Clerk JWT authentication module."""

import logging
import os
from functools import lru_cache
from typing import Any, Dict

import httpx
import jwt
from fastapi import HTTPException, status
from jwt import PyJWK

logger = logging.getLogger(__name__)

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


def get_public_key_from_jwk(jwk: Dict[str, Any]) -> Any:
    """
    Convert JWK (JSON Web Key) to cryptographic key object.

    Args:
        jwk: JWK dictionary from Clerk JWKS

    Returns:
        Public key object suitable for RS256 verification

    Raises:
        ClerkAuthError: If conversion fails
    """
    try:
        # Use PyJWT's PyJWK to convert JWK to key object
        pyjwk = PyJWK.from_dict(jwk)
        return pyjwk.key
    except Exception as e:
        logger.error(f"Error converting JWK to key: {str(e)}")
        raise ClerkAuthError(f"Erro ao converter chave pública: {str(e)}")


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

        # Get token header to extract kid (key ID)
        try:
            header = jwt.get_unverified_header(token)
        except jwt.DecodeError as e:
            raise ClerkAuthError(f"Token malformado: {str(e)}")

        kid = header.get("kid")
        if not kid:
            raise ClerkAuthError("Key ID (kid) não encontrado no token")

        # Fetch Clerk's public keys
        keys_response = get_clerk_public_keys()
        keys = keys_response.get("keys", [])

        # Find the key matching the kid
        matching_key = None
        for key in keys:
            if key.get("kid") == kid:
                matching_key = key
                break

        if not matching_key:
            logger.warning(f"Chave pública não encontrada para kid: {kid}")
            raise ClerkAuthError(f"Chave pública não encontrada para kid: {kid}")

        # Convert JWK to public key object
        public_key = get_public_key_from_jwk(matching_key)

        # Verify and decode token with RS256
        decoded = jwt.decode(
            token,
            public_key,
            algorithms=["RS256"],
            audience=os.getenv("CLERK_AUDIENCE"),  # Optional: verify audience if set
        )

        logger.info(f"Token verificado para usuário: {decoded.get('sub')}")
        return decoded

    except jwt.ExpiredSignatureError:
        logger.warning("Token expirado")
        raise ClerkAuthError("Token expirado")
    except jwt.InvalidSignatureError:
        logger.warning("Assinatura do token inválida")
        raise ClerkAuthError("Assinatura do token inválida")
    except jwt.InvalidTokenError as e:
        logger.warning(f"Token inválido: {str(e)}")
        raise ClerkAuthError(f"Token inválido: {str(e)}")
    except ClerkAuthError:
        raise
    except Exception as e:
        logger.error(f"Erro ao verificar token: {str(e)}")
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
