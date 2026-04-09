import math

from src.application.dtos.common import PaginatedResponse
from src.application.dtos.patient_dto import PatientResponse
from src.application.ports.repositories.patient_repository import PatientRepository


class ListPatientsUseCase:
    def __init__(self, patient_repo: PatientRepository):
        self._patient_repo = patient_repo

    async def execute(
        self, user_id: str, page: int = 1, page_size: int = 20
    ) -> PaginatedResponse[PatientResponse]:
        patients, total = await self._patient_repo.find_by_user_id(
            user_id, page, page_size
        )

        return PaginatedResponse(
            data=[
                PatientResponse(
                    id=p.id,
                    user_id=p.user_id,
                    name=p.name,
                    email=p.email,
                    phone=p.phone,
                    cpf=p.cpf,
                    birth_date=p.birth_date,
                    gender=p.gender,
                    height=p.height,
                    weight=p.weight,
                    goal=p.goal,
                    medical_notes=p.medical_notes,
                    address=p.address,
                    emergency_contact=p.emergency_contact,
                    active=p.active,
                    created_at=p.created_at,
                    updated_at=p.updated_at,
                )
                for p in patients
            ],
            total=total,
            page=page,
            page_size=page_size,
            total_pages=math.ceil(total / page_size) if total > 0 else 0,
        )
