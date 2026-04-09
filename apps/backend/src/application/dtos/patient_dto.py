from datetime import datetime
from pydantic import BaseModel

from src.domain.value_objects.enums import Gender


class CreatePatientDto(BaseModel):
    name: str
    email: str
    phone: str
    cpf: str | None = None
    birth_date: datetime | None = None
    gender: Gender | None = None
    height: float | None = None
    weight: float | None = None
    goal: str | None = None
    medical_notes: str | None = None
    address: str | None = None
    emergency_contact: str | None = None


class UpdatePatientDto(BaseModel):
    name: str | None = None
    email: str | None = None
    phone: str | None = None
    cpf: str | None = None
    birth_date: datetime | None = None
    gender: Gender | None = None
    height: float | None = None
    weight: float | None = None
    goal: str | None = None
    medical_notes: str | None = None
    address: str | None = None
    emergency_contact: str | None = None
    active: bool | None = None


class PatientResponse(BaseModel):
    id: str
    user_id: str
    name: str
    email: str
    phone: str
    cpf: str | None
    birth_date: datetime | None
    gender: Gender | None
    height: float | None
    weight: float | None
    goal: str | None
    medical_notes: str | None
    address: str | None
    emergency_contact: str | None
    active: bool
    created_at: datetime
    updated_at: datetime
