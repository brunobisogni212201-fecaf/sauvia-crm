import type { AppointmentType, AppointmentStatus } from "./enums";

export interface Appointment {
  id: string;
  userId: string;
  patientId: string;
  dateTime: string;
  duration: number;
  type: AppointmentType;
  status: AppointmentStatus;
  notes: string | null;
  meetingUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAppointmentDto {
  patientId: string;
  dateTime: string;
  duration?: number;
  type: AppointmentType;
  notes?: string;
  meetingUrl?: string;
}

export interface UpdateAppointmentDto {
  dateTime?: string;
  duration?: number;
  type?: AppointmentType;
  status?: AppointmentStatus;
  notes?: string;
  meetingUrl?: string;
}
