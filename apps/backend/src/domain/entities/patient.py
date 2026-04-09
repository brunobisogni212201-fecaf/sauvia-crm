from dataclasses import dataclass, field
from datetime import datetime

from src.domain.value_objects.enums import Gender


@dataclass
class Patient:
    id: str
    user_id: str
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
    active: bool = True
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
