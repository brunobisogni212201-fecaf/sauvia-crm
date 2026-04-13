/**
 * MCP Backend Client
 * Handles communication with Sauvia backend API for MCP tools
 */

interface BackendClientConfig {
  apiUrl: string
  timeout?: number
}

interface BackendRequest {
  endpoint: string
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  body?: Record<string, any>
  token: string
}

interface BackendResponse<T = any> {
  ok: boolean
  status: number
  data?: T
  error?: string
}

export class BackendClient {
  private apiUrl: string
  private timeout: number

  constructor(config: BackendClientConfig) {
    this.apiUrl = config.apiUrl || 'http://localhost:8000/api/v1'
    this.timeout = config.timeout || 10000
  }

  /**
   * Make authenticated request to backend
   */
  async request<T = any>(options: BackendRequest): Promise<BackendResponse<T>> {
    const { endpoint, method = 'GET', body, token } = options

    try {
      const url = `${this.apiUrl}${endpoint}`

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(this.timeout),
      })

      const data = await response.json().catch(() => null)

      return {
        ok: response.ok,
        status: response.status,
        data: response.ok ? data : undefined,
        error: response.ok ? undefined : data?.detail || response.statusText,
      }
    } catch (error) {
      return {
        ok: false,
        status: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      }
    }
  }

  /**
   * Get current authenticated user
   */
  async getCurrentUser(token: string) {
    return this.request<{
      id: string
      email: string
      name: string
      role: string
    }>({
      endpoint: '/auth/me',
      method: 'GET',
      token,
    })
  }

  /**
   * List patients
   */
  async listPatients(
    token: string,
    options?: { page?: number; limit?: number; search?: string }
  ) {
    const params = new URLSearchParams()
    if (options?.page) params.append('page', String(options.page))
    if (options?.limit) params.append('limit', String(options.limit))
    if (options?.search) params.append('search', options.search)

    return this.request<{
      data: Array<{
        id: string
        name: string
        email: string
        status: string
        createdAt: string
      }>
      pagination: { page: number; limit: number; total: number }
    }>({
      endpoint: `/patients?${params.toString()}`,
      method: 'GET',
      token,
    })
  }

  /**
   * Get patient details
   */
  async getPatient(token: string, patientId: string) {
    return this.request<{
      id: string
      name: string
      email: string
      status: string
      birthDate?: string
      gender?: string
      height?: number
      weight?: number
      createdAt: string
    }>({
      endpoint: `/patients/${patientId}`,
      method: 'GET',
      token,
    })
  }

  /**
   * Get dashboard metrics
   */
  async getDashboardMetrics(token: string) {
    return this.request<{
      totalPatients: number
      activePatients: number
      averageAdherence: number
      appointmentsToday: number
      recentPatients: Array<{ id: string; name: string }>
    }>({
      endpoint: '/dashboard/metrics',
      method: 'GET',
      token,
    })
  }

  /**
   * Get patient adherence data
   */
  async getPatientAdherence(token: string, patientId: string) {
    return this.request<{
      patientId: string
      overallAdherence: number
      byType: Record<string, number>
      period: { start: string; end: string }
    }>({
      endpoint: `/patients/${patientId}/adherence`,
      method: 'GET',
      token,
    })
  }

  /**
   * List plans for a patient
   */
  async listPatientPlans(
    token: string,
    patientId: string,
    options?: { active?: boolean }
  ) {
    const params = new URLSearchParams()
    if (options?.active !== undefined)
      params.append('active', String(options.active))

    return this.request<
      Array<{
        id: string
        title: string
        type: 'DIET' | 'EXERCISE' | 'MEDICATION' | 'HABIT'
        startDate: string
        endDate?: string
        isActive: boolean
      }>
    >({
      endpoint: `/patients/${patientId}/plans?${params.toString()}`,
      method: 'GET',
      token,
    })
  }

  /**
   * Get routine logs for patient
   */
  async getRoutineLogs(
    token: string,
    patientId: string,
    options?: { days?: number; type?: string }
  ) {
    const params = new URLSearchParams()
    if (options?.days) params.append('days', String(options.days))
    if (options?.type) params.append('type', options.type)

    return this.request<
      Array<{
        id: string
        type: 'MEAL' | 'EXERCISE' | 'MEDICATION' | 'WATER' | 'HABIT'
        completedAt: string
        data: Record<string, any>
      }>
    >({
      endpoint: `/routine-logs?patientId=${patientId}&${params.toString()}`,
      method: 'GET',
      token,
    })
  }

  /**
   * Create a new health plan
   */
  async createPlan(
    token: string,
    patientId: string,
    plan: {
      title: string
      description?: string
      type: 'DIET' | 'EXERCISE' | 'MEDICATION' | 'HABIT'
      startDate: string
      endDate?: string
      items: Record<string, any>
    }
  ) {
    return this.request<{
      id: string
      patientId: string
      type: string
      title: string
    }>({
      endpoint: '/plans',
      method: 'POST',
      body: { ...plan, patientId },
      token,
    })
  }

  /**
   * Log a routine activity
   */
  async logRoutineActivity(
    token: string,
    patientId: string,
    log: {
      type: 'MEAL' | 'EXERCISE' | 'MEDICATION' | 'WATER' | 'HABIT'
      data: Record<string, any>
      planId?: string
      notes?: string
    }
  ) {
    return this.request<{
      id: string
      patientId: string
      type: string
      completedAt: string
    }>({
      endpoint: '/routine-logs',
      method: 'POST',
      body: { ...log, patientId },
      token,
    })
  }

  /**
   * Get WhatsApp session status
   */
  async getWhatsAppStatus(token: string) {
    return this.request<{
      isConnected: boolean
      status: 'CONNECTED' | 'DISCONNECTED' | 'QR_PENDING'
      qrCode?: string
      lastConnectedAt?: string
    }>({
      endpoint: '/whatsapp/sessions/status',
      method: 'GET',
      token,
    })
  }

  /**
   * Send WhatsApp message to patient
   */
  async sendWhatsAppMessage(
    token: string,
    patientId: string,
    message: string
  ) {
    return this.request<{
      messageId: string
      status: 'SENT' | 'DELIVERED' | 'READ'
      sentAt: string
    }>({
      endpoint: '/whatsapp/send',
      method: 'POST',
      body: { patientId, message },
      token,
    })
  }
}

// Export singleton instance factory
export function createBackendClient(apiUrl?: string): BackendClient {
  return new BackendClient({
    apiUrl:
      apiUrl || process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1',
    timeout: 10000,
  })
}
