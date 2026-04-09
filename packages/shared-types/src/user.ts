import type { Role } from "./enums";

export interface User {
  id: string;
  email: string;
  name: string | null;
  cpf: string;
  phone: string | null;
  externalAuthId: string;
  role: Role;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserDto {
  email: string;
  name?: string;
  cpf: string;
  phone?: string;
  role?: Role;
}

export interface UpdateUserDto {
  name?: string;
  phone?: string;
  avatarUrl?: string;
}
