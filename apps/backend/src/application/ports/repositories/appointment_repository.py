from abc import ABC, abstractmethod
from datetime import datetime

from src.domain.entities.appointment import Appointment


class AppointmentRepository(ABC):
    @abstractmethod
    async def find_by_id(self, appointment_id: str) -> Appointment | None: ...

    @abstractmethod
    async def find_by_user_id(
        self, user_id: str, page: int = 1, page_size: int = 20
    ) -> tuple[list[Appointment], int]: ...

    @abstractmethod
    async def find_overlapping(
        self, user_id: str, date_time: datetime, duration: int
    ) -> Appointment | None: ...

    @abstractmethod
    async def save(self, appointment: Appointment) -> Appointment: ...

    @abstractmethod
    async def update(self, appointment: Appointment) -> Appointment: ...

    @abstractmethod
    async def delete(self, appointment_id: str) -> None: ...
