from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

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


@router.post("/register", response_model=TokenResponse)
async def register(request: RegisterRequest):
    # TODO: Implement with Identity Platform via AuthPort
    raise HTTPException(status_code=501, detail="Not implemented")


@router.post("/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    # TODO: Implement with Identity Platform via AuthPort
    raise HTTPException(status_code=501, detail="Not implemented")


@router.post("/refresh")
async def refresh_token():
    raise HTTPException(status_code=501, detail="Not implemented")


@router.post("/logout")
async def logout():
    return {"message": "Logged out successfully"}


@router.get("/me")
async def get_current_user():
    # TODO: Implement with auth middleware
    raise HTTPException(status_code=501, detail="Not implemented")
