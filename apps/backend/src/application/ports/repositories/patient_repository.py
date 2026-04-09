from abc import ABC, abstractmethod

from src.domain.entities.patient import Patient


class PatientRepository(ABC):
    @abstractmethod
    async def find_by_id(self, patient_id: str) -> Patient | None: ...

    @abstractmethod
    async def find_by_user_id(
        self, user_id: str, page: int = 1, page_size: int = 20
    ) -> tuple[list[Patient], int]: ...

    @abstractmethod
    async def save(self, patient: Patient) -> Patient: ...

    @abstractmethod
    async def update(self, patient: Patient) -> Patient: ...

    @abstractmethod
    async def delete(self, patient_id: str) -> None: ...
