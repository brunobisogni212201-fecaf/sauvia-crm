from enum import Enum


class Role(str, Enum):
    NUTRITIONIST = "NUTRITIONIST"
    ADMIN = "ADMIN"


class Gender(str, Enum):
    MALE = "MALE"
    FEMALE = "FEMALE"
    OTHER = "OTHER"


class AppointmentType(str, Enum):
    INITIAL = "INITIAL"
    FOLLOWUP = "FOLLOWUP"
    RETURN = "RETURN"
    EMERGENCY = "EMERGENCY"
    ONLINE = "ONLINE"


class AppointmentStatus(str, Enum):
    SCHEDULED = "SCHEDULED"
    CONFIRMED = "CONFIRMED"
    IN_PROGRESS = "IN_PROGRESS"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"
    NO_SHOW = "NO_SHOW"


class PlanStatus(str, Enum):
    ACTIVE = "ACTIVE"
    COMPLETED = "COMPLETED"
    CANCELLED = "CANCELLED"


class TicketStatus(str, Enum):
    OPEN = "OPEN"
    IN_PROGRESS = "IN_PROGRESS"
    WAITING = "WAITING"
    RESOLVED = "RESOLVED"
    CLOSED = "CLOSED"


class Priority(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    URGENT = "URGENT"


class MessageDirection(str, Enum):
    INBOUND = "INBOUND"
    OUTBOUND = "OUTBOUND"


class ConsentType(str, Enum):
    MARKETING = "MARKETING"
    ANALYTICS = "ANALYTICS"
    DATA_SHARING = "DATA_SHARING"
    WHATSAPP = "WHATSAPP"
