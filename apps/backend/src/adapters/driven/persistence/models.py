from datetime import datetime

from sqlalchemy import (
    Boolean,
    Column,
    DateTime,
    Enum,
    Float,
    ForeignKey,
    Index,
    Integer,
    String,
    Text,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import DeclarativeBase, relationship

from src.domain.value_objects.enums import (
    AppointmentStatus,
    AppointmentType,
    ConsentType,
    Gender,
    MessageDirection,
    PlanStatus,
    Priority,
    Role,
    TicketStatus,
)


class Base(DeclarativeBase):
    pass


class UserModel(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    email = Column(String, unique=True, nullable=False)
    name = Column(String, nullable=True)
    cpf = Column(String, unique=True, nullable=False)
    phone = Column(String, nullable=True)
    external_auth_id = Column(String, unique=True, nullable=False)
    role = Column(Enum(Role), default=Role.NUTRITIONIST, nullable=False)
    avatar_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    patients = relationship("PatientModel", back_populates="user", cascade="all, delete-orphan")
    appointments = relationship("AppointmentModel", back_populates="user", cascade="all, delete-orphan")
    tickets = relationship("TicketModel", back_populates="user", cascade="all, delete-orphan")
    nutrition_plans = relationship("NutritionPlanModel", back_populates="user", cascade="all, delete-orphan")


class PatientModel(Base):
    __tablename__ = "patients"
    __table_args__ = (Index("patients_user_id_idx", "user_id"),)

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=False)
    cpf = Column(String, nullable=True)
    birth_date = Column(DateTime, nullable=True)
    gender = Column(Enum(Gender), nullable=True)
    height = Column(Float, nullable=True)
    weight = Column(Float, nullable=True)
    goal = Column(Text, nullable=True)
    medical_notes = Column(Text, nullable=True)
    address = Column(Text, nullable=True)
    emergency_contact = Column(String, nullable=True)
    active = Column(Boolean, default=True, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    user = relationship("UserModel", back_populates="patients")
    appointments = relationship("AppointmentModel", back_populates="patient", cascade="all, delete-orphan")
    nutrition_plans = relationship("NutritionPlanModel", back_populates="patient", cascade="all, delete-orphan")
    messages = relationship("MessageModel", back_populates="patient", cascade="all, delete-orphan")


class AppointmentModel(Base):
    __tablename__ = "appointments"
    __table_args__ = (
        Index("appointments_user_date_idx", "user_id", "date_time"),
        Index("appointments_patient_id_idx", "patient_id"),
    )

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    patient_id = Column(String, ForeignKey("patients.id", ondelete="CASCADE"), nullable=False)
    date_time = Column(DateTime, nullable=False)
    duration = Column(Integer, default=60, nullable=False)
    type = Column(Enum(AppointmentType), nullable=False)
    status = Column(Enum(AppointmentStatus), default=AppointmentStatus.SCHEDULED, nullable=False)
    notes = Column(Text, nullable=True)
    meeting_url = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    user = relationship("UserModel", back_populates="appointments")
    patient = relationship("PatientModel", back_populates="appointments")


class NutritionPlanModel(Base):
    __tablename__ = "nutrition_plans"
    __table_args__ = (
        Index("nutrition_plans_patient_id_idx", "patient_id"),
        Index("nutrition_plans_user_id_idx", "user_id"),
    )

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    patient_id = Column(String, ForeignKey("patients.id", ondelete="CASCADE"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    meals = Column(JSONB, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=True)
    status = Column(Enum(PlanStatus), default=PlanStatus.ACTIVE, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    user = relationship("UserModel", back_populates="nutrition_plans")
    patient = relationship("PatientModel", back_populates="nutrition_plans")


class MessageModel(Base):
    __tablename__ = "messages"
    __table_args__ = (Index("messages_patient_id_idx", "patient_id"),)

    id = Column(String, primary_key=True)
    patient_id = Column(String, ForeignKey("patients.id", ondelete="CASCADE"), nullable=False)
    direction = Column(Enum(MessageDirection), nullable=False)
    content = Column(Text, nullable=False)
    whatsapp_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)

    patient = relationship("PatientModel", back_populates="messages")


class TicketModel(Base):
    __tablename__ = "tickets"
    __table_args__ = (Index("tickets_user_status_idx", "user_id", "status"),)

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    subject = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    status = Column(Enum(TicketStatus), default=TicketStatus.OPEN, nullable=False)
    priority = Column(Enum(Priority), default=Priority.MEDIUM, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    user = relationship("UserModel", back_populates="tickets")
    messages = relationship("TicketMessageModel", back_populates="ticket", cascade="all, delete-orphan")


class TicketMessageModel(Base):
    __tablename__ = "ticket_messages"
    __table_args__ = (Index("ticket_messages_ticket_id_idx", "ticket_id"),)

    id = Column(String, primary_key=True)
    ticket_id = Column(String, ForeignKey("tickets.id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    is_staff = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)

    ticket = relationship("TicketModel", back_populates="messages")


class KnowledgeArticleModel(Base):
    __tablename__ = "knowledge_articles"

    id = Column(String, primary_key=True)
    title = Column(String, nullable=False)
    content = Column(Text, nullable=False)
    category = Column(String, nullable=False)
    slug = Column(String, unique=True, nullable=False)
    published = Column(Boolean, default=False, nullable=False)
    order = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)


class AuditLogModel(Base):
    __tablename__ = "audit_logs"
    __table_args__ = (
        Index("audit_logs_user_id_idx", "user_id"),
        Index("audit_logs_created_at_idx", "created_at"),
    )

    id = Column(String, primary_key=True)
    user_id = Column(String, nullable=True)
    action = Column(String, nullable=False)
    entity = Column(String, nullable=False)
    entity_id = Column(String, nullable=True)
    metadata_ = Column("metadata", JSONB, nullable=True)
    ip_address = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)


class SettingModel(Base):
    __tablename__ = "settings"

    id = Column(String, primary_key=True)
    key = Column(String, unique=True, nullable=False)
    value = Column(JSONB, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)


class UserConsentModel(Base):
    __tablename__ = "user_consents"
    __table_args__ = (Index("user_consents_user_id_idx", "user_id"),)

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    consent_type = Column(Enum(ConsentType), nullable=False)
    granted = Column(Boolean, default=False, nullable=False)
    granted_at = Column(DateTime, nullable=True)
    revoked_at = Column(DateTime, nullable=True)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)
