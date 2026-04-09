import type { Gender } from "./enums";

export interface Patient {
  id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  cpf: string | null;
  birthDate: string | null;
  gender: Gender | null;
  height: number | null;
  weight: number | null;
  goal: string | null;
  medicalNotes: string | null;
  address: string | null;
  emergencyContact: string | null;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePatientDto {
  name: string;
  email: string;
  phone: string;
  cpf?: string;
  birthDate?: string;
  gender?: Gender;
  height?: number;
  weight?: number;
  goal?: string;
  medicalNotes?: string;
  address?: string;
  emergencyContact?: string;
}

export interface UpdatePatientDto extends Partial<CreatePatientDto> {
  active?: boolean;
}
