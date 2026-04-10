from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from src.config import settings
import boto3


router = APIRouter()


class ConsentUpdate(BaseModel):
    marketing: bool
    analytics: bool
    cookies: bool


class ConsentResponse(BaseModel):
    marketing: bool
    analytics: bool
    cookies: bool
    updated_at: datetime


# In-memory storage for demo
_consents_db: dict[str, ConsentResponse] = {}
_audit_logs_db: dict[str, list] = {}


def get_user_id_from_token(authorization: Optional[str]) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    access_token = authorization.replace("Bearer ", "")
    try:
        import jwt

        payload = jwt.decode(access_token, settings.secret_key, algorithms=["HS256"])
        return payload.get("sub", "default-user")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.get("/export")
async def export_user_data(authorization: Optional[str] = Header(None)):
    """Export all user data as JSON (LGPD compliance)."""
    user_id = get_user_id_from_token(authorization)

    cognito = boto3.client(
        "cognito-idp",
        region_name=settings.cognito_region,
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
    )

    try:
        # Get user attributes
        user_pool_id = settings.cognito_user_pool_id
        user_response = cognito.admin_get_user(
            UserPoolId=user_pool_id,
            Username=user_id,
        )

        user_data = {
            "user_id": user_id,
            "email": next(
                (
                    a["Value"]
                    for a in user_response["UserAttributes"]
                    if a["Name"] == "email"
                ),
                None,
            ),
            "name": next(
                (
                    a["Value"]
                    for a in user_response["UserAttributes"]
                    if a["Name"] == "name"
                ),
                None,
            ),
            "created_at": user_response.get("UserCreateDate"),
            "last_modified": user_response.get("UserLastModifiedDate"),
            "status": user_response.get("UserStatus"),
            "consents": _consents_db.get(
                user_id,
                ConsentResponse(
                    marketing=True,
                    analytics=True,
                    cookies=True,
                    updated_at=datetime.utcnow(),
                ),
            ).model_dump(),
            "audit_logs": _audit_logs_db.get(user_id, []),
        }

        return user_data
    except Exception as e:
        return {
            "user_id": user_id,
            "consents": _consents_db.get(
                user_id,
                ConsentResponse(
                    marketing=True,
                    analytics=True,
                    cookies=True,
                    updated_at=datetime.utcnow(),
                ),
            ).model_dump(),
            "audit_logs": _audit_logs_db.get(user_id, []),
        }


@router.get("/consents", response_model=ConsentResponse)
async def get_consents(authorization: Optional[str] = Header(None)):
    """Get user's granular consent settings."""
    user_id = get_user_id_from_token(authorization)

    if user_id not in _consents_db:
        _consents_db[user_id] = ConsentResponse(
            marketing=True,
            analytics=True,
            cookies=True,
            updated_at=datetime.utcnow(),
        )

    return _consents_db[user_id]


@router.put("/consents", response_model=ConsentResponse)
async def update_consents(
    consents: ConsentUpdate,
    authorization: Optional[str] = Header(None),
):
    """Update user's consent preferences."""
    user_id = get_user_id_from_token(authorization)

    consent_response = ConsentResponse(
        marketing=consents.marketing,
        analytics=consents.analytics,
        cookies=consents.cookies,
        updated_at=datetime.utcnow(),
    )

    _consents_db[user_id] = consent_response

    # Log to audit
    if user_id not in _audit_logs_db:
        _audit_logs_db[user_id] = []

    _audit_logs_db[user_id].append(
        {
            "action": "consent_update",
            "details": consents.model_dump(),
            "timestamp": datetime.utcnow().isoformat(),
        }
    )

    return consent_response


@router.get("/audit-logs")
async def get_audit_logs(authorization: Optional[str] = Header(None)):
    """Get audit trail for user's data operations."""
    user_id = get_user_id_from_token(authorization)

    return {"logs": _audit_logs_db.get(user_id, [])}


@router.delete("/delete-account", status_code=204)
async def delete_account(authorization: Optional[str] = Header(None)):
    """Delete user account and all associated data (LGPD right to deletion)."""
    user_id = get_user_id_from_token(authorization)

    cognito = boto3.client(
        "cognito-idp",
        region_name=settings.cognito_region,
        aws_access_key_id=settings.aws_access_key_id,
        aws_secret_access_key=settings.aws_secret_access_key,
    )

    try:
        user_pool_id = settings.cognito_user_pool_id
        cognito.admin_delete_user(
            UserPoolId=user_pool_id,
            Username=user_id,
        )
    except Exception as e:
        raise HTTPException(
            status_code=400, detail=f"Failed to delete account: {str(e)}"
        )

    # Clean up local data
    if user_id in _consents_db:
        del _consents_db[user_id]
    if user_id in _audit_logs_db:
        del _audit_logs_db[user_id]

    return None
