from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.config import settings
from src.adapters.driving.api.v1.auth_router import router as auth_router
from src.adapters.driving.api.v1.oauth_router import router as oauth_router
from src.adapters.driving.api.v1.patients_router import router as patients_router
from src.adapters.driving.api.v1.appointments_router import (
    router as appointments_router,
)
from src.adapters.driving.api.v1.lgpd_router import router as lgpd_router

app = FastAPI(
    title="Sauvia CRM API",
    description="Backend API for Sauvia CRM - Nutrition Management Platform",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins.split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/api/v1/auth", tags=["Auth"])
app.include_router(oauth_router, prefix="/api/v1/auth", tags=["OAuth"])
app.include_router(patients_router, prefix="/api/v1/patients", tags=["Patients"])
app.include_router(
    appointments_router, prefix="/api/v1/appointments", tags=["Appointments"]
)
app.include_router(lgpd_router, prefix="/api/v1/lgpd", tags=["LGPD"])


@app.get("/health")
async def health_check():
    return {"status": "ok", "environment": settings.app_env}
