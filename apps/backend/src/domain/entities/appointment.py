from dataclasses import dataclass, field
from datetime import datetime

from src.domain.value_objects.enums import AppointmentType, AppointmentStatus


@dataclass
class Appointment:
    id: str
    user_id: str
    patient_id: str
    date_time: datetime
    type: AppointmentType
    duration: int = 60
    status: AppointmentStatus = AppointmentStatus.SCHEDULED
    notes: str | None = None
    meeting_url: str | None = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)
