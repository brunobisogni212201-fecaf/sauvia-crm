from fastapi import APIRouter, HTTPException, Header, Query
from datetime import datetime
import uuid
from typing import Optional
from src.application.dtos.patient_dto import (
    CreatePatientDto,
    PatientResponse,
    UpdatePatientDto,
)
from src.application.dtos.common import PaginatedResponse

router = APIRouter()

# In-memory storage for demo (replace with real DB later)
_patients_db: dict[str, PatientResponse] = {}


def get_user_id_from_token(authorization: Optional[str]) -> str:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    access_token = authorization.replace("Bearer ", "")
    try:
        import jwt
        from src.config import settings

        payload = jwt.decode(access_token, settings.secret_key, algorithms=["HS256"])
        return payload.get("sub", "default-user")
    except:
        raise HTTPException(status_code=401, detail="Invalid token")


@router.get("/", response_model=PaginatedResponse[PatientResponse])
async def list_patients(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
    authorization: Optional[str] = Header(None),
):
    user_id = get_user_id_from_token(authorization)

    user_patients = [p for p in _patients_db.values() if p.user_id == user_id]
    total = len(user_patients)
    start = (page - 1) * page_size
    end = start + page_size
    paginated = user_patients[start:end]

    return PaginatedResponse(
        data=paginated,
        total=total,
        page=page,
        page_size=page_size,
        total_pages=(total + page_size - 1) // page_size if total > 0 else 1,
    )


@router.post("/", response_model=PatientResponse, status_code=201)
async def create_patient(
    dto: CreatePatientDto,
    authorization: Optional[str] = Header(None),
):
    user_id = get_user_id_from_token(authorization)

    now = datetime.utcnow()
    patient = PatientResponse(
        id=str(uuid.uuid4()),
        user_id=user_id,
        name=dto.name,
        email=dto.email,
        phone=dto.phone,
        cpf=dto.cpf,
        birth_date=dto.birth_date,
        gender=dto.gender,
        height=dto.height,
        weight=dto.weight,
        goal=dto.goal,
        medical_notes=dto.medical_notes,
        address=dto.address,
        emergency_contact=dto.emergency_contact,
        active=True,
        created_at=now,
        updated_at=now,
    )

    _patients_db[patient.id] = patient
    return patient


@router.get("/{patient_id}", response_model=PatientResponse)
async def get_patient(
    patient_id: str,
    authorization: Optional[str] = Header(None),
):
    user_id = get_user_id_from_token(authorization)

    patient = _patients_db.get(patient_id)
    if not patient or patient.user_id != user_id:
        raise HTTPException(status_code=404, detail="Patient not found")

    return patient


@router.put("/{patient_id}", response_model=PatientResponse)
async def update_patient(
    patient_id: str,
    dto: UpdatePatientDto,
    authorization: Optional[str] = Header(None),
):
    user_id = get_user_id_from_token(authorization)

    patient = _patients_db.get(patient_id)
    if not patient or patient.user_id != user_id:
        raise HTTPException(status_code=404, detail="Patient not found")

    update_data = dto.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        if value is not None:
            setattr(patient, key, value)

    patient.updated_at = datetime.utcnow()
    _patients_db[patient_id] = patient
    return patient


@router.delete("/{patient_id}", status_code=204)
async def delete_patient(
    patient_id: str,
    authorization: Optional[str] = Header(None),
):
    user_id = get_user_id_from_token(authorization)

    patient = _patients_db.get(patient_id)
    if not patient or patient.user_id != user_id:
        raise HTTPException(status_code=404, detail="Patient not found")

    del _patients_db[patient_id]
    return None
