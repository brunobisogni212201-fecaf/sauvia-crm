import type { PlanStatus } from "./enums";

export interface NutritionPlan {
  id: string;
  userId: string;
  patientId: string;
  name: string;
  description: string | null;
  meals: Record<string, unknown>;
  startDate: string;
  endDate: string | null;
  status: PlanStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNutritionPlanDto {
  patientId: string;
  name: string;
  description?: string;
  meals: Record<string, unknown>;
  startDate: string;
  endDate?: string;
}

export interface UpdateNutritionPlanDto {
  name?: string;
  description?: string;
  meals?: Record<string, unknown>;
  startDate?: string;
  endDate?: string;
  status?: PlanStatus;
}
