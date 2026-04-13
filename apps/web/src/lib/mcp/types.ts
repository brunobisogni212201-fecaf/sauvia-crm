/**
 * MCP Server Type Definitions
 *
 * Defines types for authentication info, DTOs, and tool request/response schemas
 * used in the MCP server implementation.
 */

/**
 * Authentication information passed to MCP tools
 */
export interface MCPAuthInfo {
  userId: string
  organizationId: string
  email: string
  scopes: string[]
  token?: string
}

/**
 * Patient Data Transfer Object
 */
export interface PatientDTO {
  id: string
  name: string
  email: string
  phone?: string
  status: 'active' | 'inactive' | 'archived'
  createdAt: string
  updatedAt: string
}

/**
 * Nutritionist Dashboard Metrics
 */
export interface DashboardDTO {
  totalPatients: number
  activePatients: number
  averageAdherence: number
  appointmentsToday: number
  recentLogins: Array<{
    date: string
    count: number
  }>
}

/**
 * Health Plan DTO
 */
export interface HealthPlanDTO {
  id: string
  patientId: string
  title: string
  description: string
  type: 'DIET' | 'EXERCISE' | 'MEDICATION' | 'HABIT'
  startDate: string
  endDate?: string
  isActive: boolean
  items: Record<string, any>
  createdAt: string
}

/**
 * Routine Log Entry
 */
export interface RoutineLogDTO {
  id: string
  patientId: string
  planId?: string
  type: 'MEAL' | 'EXERCISE' | 'MEDICATION' | 'HABIT' | 'WATER'
  data: Record<string, any>
  completedAt: string
  notes?: string
}

/**
 * Patient Adherence Summary
 */
export interface AdherenceSummaryDTO {
  patientId: string
  patientName: string
  overallAdherence: number
  byPlan: Array<{
    planId: string
    planTitle: string
    adherence: number
  }>
  logsThisWeek: number
  streak: number
}

/**
 * MCP Tool Input Schema for common patterns
 */
export interface PaginationInput {
  page?: number
  limit?: number
  search?: string
}

/**
 * MCP Tool Response wrapper
 */
export interface MCPToolResponse<T = any> {
  content: Array<{
    type: 'text' | 'image' | 'resource'
    text?: string
    uri?: string
    mimeType?: string
  }>
  isError?: boolean
}

/**
 * Health calculation result
 */
export interface HealthCalculationResult {
  type: 'IMC' | 'TMB' | 'HYDRATION' | 'BODY_FAT'
  result: number
  unit: string
  classification: string
  recommendation: string
}
