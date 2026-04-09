"""Dependency injection container for wiring adapters to use cases."""

from src.application.use_cases.patients.create_patient import CreatePatientUseCase
from src.application.use_cases.patients.list_patients import ListPatientsUseCase


# TODO: Initialize real adapters here when persistence is connected
# Example:
# patient_repo = SQLAlchemyPatientRepository(session)
# create_patient_use_case = CreatePatientUseCase(patient_repo)
# list_patients_use_case = ListPatientsUseCase(patient_repo)
