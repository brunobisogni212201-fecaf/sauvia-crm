from dataclasses import dataclass, field
from datetime import datetime

from src.domain.value_objects.enums import Role


@dataclass
class User:
    id: str
    email: str
    cpf: str
    external_auth_id: str
    role: Role = Role.NUTRITIONIST
    name: str | None = None
    phone: str | None = None
    avatar_url: str | None = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
