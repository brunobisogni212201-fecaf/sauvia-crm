from fastapi import APIRouter, HTTPException, Query

from src.application.dtos.patient_dto import (
    CreatePatientDto,
    PatientResponse,
    UpdatePatientDto,
)
from src.application.dtos.common import PaginatedResponse

router = APIRouter()


@router.get("/", response_model=PaginatedResponse[PatientResponse])
async def list_patients(
    page: int = Query(1, ge=1),
    page_size: int = Query(20, ge=1, le=100),
):
    # TODO: Inject ListPatientsUseCase via DI, get user_id from auth
    raise HTTPException(status_code=501, detail="Not implemented")


@router.post("/", response_model=PatientResponse, status_code=201)
async def create_patient(dto: CreatePatientDto):
    # TODO: Inject CreatePatientUseCase via DI, get user_id from auth
    raise HTTPException(status_code=501, detail="Not implemented")


@router.get("/{patient_id}", response_model=PatientResponse)
async def get_patient(patient_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.put("/{patient_id}", response_model=PatientResponse)
async def update_patient(patient_id: str, dto: UpdatePatientDto):
    raise HTTPException(status_code=501, detail="Not implemented")


@router.delete("/{patient_id}", status_code=204)
async def delete_patient(patient_id: str):
    raise HTTPException(status_code=501, detail="Not implemented")
