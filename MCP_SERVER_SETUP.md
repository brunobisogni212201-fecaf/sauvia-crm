# 🚀 MCP Server Setup para Sauvia CRM

## Visão Geral

Este guia configura um **Model Context Protocol (MCP) Server** para Sauvia, permitindo que clientes LLM (Claude, GPT, etc) acessem dados do CRM de forma segura via OAuth.

```
┌─ Sauvia MCP Server ─────────────────────────────┐
│                                                   │
│  Client LLM                                      │
│    ↓                                              │
│  ┌─────────────────────────────────────────┐    │
│  │ MCP Transport (HTTP Streaming / SSE)    │    │
│  │ [/mcp/http] [/mcp/sse]                  │    │
│  └─────────────────────────────────────────┘    │
│    ↓ (OAuth Bearer Token)                        │
│  ┌─────────────────────────────────────────┐    │
│  │ Clerk OAuth Verification                │    │
│  │ (verifyClerkToken)                      │    │
│  └─────────────────────────────────────────┘    │
│    ↓ (Authenticated User Context)                │
│  ┌─────────────────────────────────────────┐    │
│  │ MCP Tools Registry                      │    │
│  │ • get-patients                          │    │
│  │ • get-patient-details                   │    │
│  │ • create-plan                           │    │
│  │ • log-routine                           │    │
│  │ • get-adherence                         │    │
│  │ • get-dashboard                         │    │
│  └─────────────────────────────────────────┘    │
│    ↓ (Backend FastAPI Calls)                     │
│  Backend API (http://localhost:8000/api/v1)     │
│                                                   │
└───────────────────────────────────────────────────┘
```

## Prerequisites

- ✅ Migração Cognito → Clerk completada ([COGNITO_TO_CLERK_MIGRATION.md](./COGNITO_TO_CLERK_MIGRATION.md))
- ✅ Next.js 15+ com Clerk integrado
- ✅ Backend FastAPI rodando
- ✅ Node.js 18+, pnpm 10+

## Fase 1: Instalar Dependências

```bash
cd apps/web

# Adicionar MCP + Clerk MCP Tools
pnpm add mcp-handler @clerk/mcp-tools
```

Verificar em `package.json`:
```json
{
  "dependencies": {
    "mcp-handler": "^1.0.0",
    "@clerk/mcp-tools": "^1.0.0",
    "@clerk/nextjs": "^5.0.0"
  }
}
```

## Fase 2: Criar Estrutura MCP

```bash
# Diretórios já criados:
# - src/app/mcp/[transport]/
# - src/app/.well-known/oauth-protected-resource/mcp/
# - src/app/.well-known/oauth-authorization-server/
# - src/lib/mcp/

# Criar tipos compartilhados
touch src/lib/mcp/types.ts
touch src/lib/mcp/tools.ts
touch src/lib/mcp/backend-client.ts
```

## Fase 3: Definir Types MCP

**`src/lib/mcp/types.ts`:**

```typescript
/**
 * MCP Types para Sauvia CRM
 * Compartilhados entre tools e backend
 */

// Auth & Session
export interface MCPAuthInfo {
  userId: string
  organizationId: string
  email: string
  scopes: string[]
  createdAt: number
}

// Patient (from Backend)
export interface PatientDTO {
  id: string
  userId: string
  nutritionistId: string
  name: string
  email: string
  phone?: string
  birthDate?: string
  gender?: 'M' | 'F' | 'O'
  height?: number
  weight?: number
  conditions?: string[]
  allergies?: string[]
  goals?: string[]
  status: 'active' | 'inactive' | 'archived'
  createdAt: string
  updatedAt: string
}

// Health Plan
export interface PlanDTO {
  id: string
  nutritionistId: string
  patientId: string
  title: string
  description?: string
  type: 'DIET' | 'EXERCISE' | 'MEDICATION' | 'HABIT'
  status: 'active' | 'inactive' | 'completed'
  startDate: string
  endDate?: string
  items: Record<string, any>
  createdAt: string
  updatedAt: string
}

// Routine Log
export interface RoutineLogDTO {
  id: string
  patientId: string
  planId?: string
  type: 'MEAL' | 'EXERCISE' | 'MEDICATION' | 'WATER' | 'HABIT'
  data: Record<string, any>
  completedAt: string
  notes?: string
  createdAt: string
}

// Adherence Analytics
export interface AdherenceDTO {
  patientId: string
  planId?: string
  period: string // "7d" | "30d" | "90d"
  overallAdherence: number // 0-100
  byType: Record<string, number> // { DIET: 85, EXERCISE: 70, ... }
  totalLogs: number
  missedDays: number
  streak: number
  lastUpdate: string
}

// Dashboard Summary
export interface DashboardDTO {
  nutritionistId: string
  totalPatients: number
  activePatients: number
  averageAdherence: number
  appointmentsToday: number
  pendingMessages: number
  activePlans: number
  recentPatients: PatientDTO[]
  lastUpdated: string
}

// API Response Wrapper
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: {
    code: string
    message: string
    details?: Record<string, any>
  }
  timestamp: string
}

// Pagination
export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}
```

## Fase 4: Backend Client

**`src/lib/mcp/backend-client.ts`:**

```typescript
/**
 * Backend API Client para MCP Tools
 * Gerencia autenticação e chamadas HTTP
 */

import { MCPAuthInfo, PatientDTO, PlanDTO, RoutineLogDTO, AdherenceDTO, DashboardDTO, ApiResponse, PaginatedResponse } from './types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000/api/v1'

export class BackendClient {
  private baseUrl: string
  private token: string

  constructor(token: string, baseUrl: string = API_URL) {
    this.baseUrl = baseUrl
    this.token = token
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: any
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`,
      },
      body: body ? JSON.stringify(body) : undefined,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(`API Error ${response.status}: ${error.detail || response.statusText}`)
    }

    return response.json()
  }

  // Patients
  async getPatients(page: number = 1, limit: number = 20): Promise<PaginatedResponse<PatientDTO>> {
    return this.request('GET', `/patients?page=${page}&limit=${limit}`)
  }

  async getPatient(patientId: string): Promise<PatientDTO> {
    return this.request('GET', `/patients/${patientId}`)
  }

  async searchPatients(query: string): Promise<PatientDTO[]> {
    return this.request('GET', `/patients/search?q=${encodeURIComponent(query)}`)
  }

  // Plans
  async getPatientPlans(patientId: string): Promise<PlanDTO[]> {
    return this.request('GET', `/patients/${patientId}/plans`)
  }

  async createPlan(patientId: string, data: Partial<PlanDTO>): Promise<PlanDTO> {
    return this.request('POST', `/patients/${patientId}/plans`, data)
  }

  async updatePlan(planId: string, data: Partial<PlanDTO>): Promise<PlanDTO> {
    return this.request('PATCH', `/plans/${planId}`, data)
  }

  // Routine Logs
  async getRoutineLogs(
    patientId: string,
    days: number = 7,
    type?: string
  ): Promise<RoutineLogDTO[]> {
    const query = new URLSearchParams({
      days: String(days),
      ...(type && { type }),
    })
    return this.request('GET', `/patients/${patientId}/routine-logs?${query}`)
  }

  async logRoutine(patientId: string, data: Omit<RoutineLogDTO, 'id' | 'createdAt'>): Promise<RoutineLogDTO> {
    return this.request('POST', `/patients/${patientId}/routine-logs`, data)
  }

  // Adherence
  async getAdherence(patientId: string, days: number = 7): Promise<AdherenceDTO> {
    return this.request('GET', `/patients/${patientId}/adherence?days=${days}`)
  }

  // Dashboard
  async getDashboard(): Promise<DashboardDTO> {
    return this.request('GET', '/dashboard')
  }
}

export function createBackendClient(token: string): BackendClient {
  return new BackendClient(token)
}
```

## Fase 5: MCP Tools Definition

**`src/lib/mcp/tools.ts`:**

```typescript
/**
 * MCP Tools Definition para Sauvia
 * Cada tool = uma ação que o LLM pode chamar
 */

import { MCPAuthInfo, PatientDTO } from './types'
import { BackendClient } from './backend-client'

export interface ToolDefinition {
  name: string
  description: string
  inputSchema: {
    type: 'object'
    properties: Record<string, any>
    required?: string[]
  }
}

export const SAUVIA_TOOLS = {
  // ──────────────────────────────────────
  // Patients Management
  // ──────────────────────────────────────

  'list-patients': {
    name: 'list-patients',
    description: 'List all patients for the authenticated nutritionist',
    inputSchema: {
      type: 'object',
      properties: {
        page: {
          type: 'number',
          description: 'Page number (default: 1)',
        },
        limit: {
          type: 'number',
          description: 'Items per page (default: 20, max: 100)',
        },
        status: {
          type: 'string',
          enum: ['active', 'inactive', 'archived'],
          description: 'Filter by patient status',
        },
      },
    },
  } as ToolDefinition,

  'search-patients': {
    name: 'search-patients',
    description: 'Search patients by name or email',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search term (name or email)',
        },
      },
      required: ['query'],
    },
  } as ToolDefinition,

  'get-patient-details': {
    name: 'get-patient-details',
    description: 'Get detailed information about a specific patient',
    inputSchema: {
      type: 'object',
      properties: {
        patientId: {
          type: 'string',
          description: 'Patient UUID',
        },
      },
      required: ['patientId'],
    },
  } as ToolDefinition,

  // ──────────────────────────────────────
  // Plans Management
  // ──────────────────────────────────────

  'get-patient-plans': {
    name: 'get-patient-plans',
    description: 'List all active plans for a patient',
    inputSchema: {
      type: 'object',
      properties: {
        patientId: {
          type: 'string',
          description: 'Patient UUID',
        },
      },
      required: ['patientId'],
    },
  } as ToolDefinition,

  'create-diet-plan': {
    name: 'create-diet-plan',
    description: 'Create a new diet plan for a patient',
    inputSchema: {
      type: 'object',
      properties: {
        patientId: {
          type: 'string',
          description: 'Patient UUID',
        },
        title: {
          type: 'string',
          description: 'Plan title (e.g., "Diet for Weight Loss")',
        },
        description: {
          type: 'string',
          description: 'Detailed description',
        },
        startDate: {
          type: 'string',
          description: 'Start date (ISO 8601)',
        },
        meals: {
          type: 'array',
          description: 'Array of daily meals',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              time: { type: 'string' }, // HH:mm
              foods: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    quantity: { type: 'number' },
                    unit: { type: 'string' },
                  },
                },
              },
            },
          },
        },
      },
      required: ['patientId', 'title', 'startDate', 'meals'],
    },
  } as ToolDefinition,

  // ──────────────────────────────────────
  // Routine Logs
  // ──────────────────────────────────────

  'log-meal': {
    name: 'log-meal',
    description: 'Log a meal consumed by patient',
    inputSchema: {
      type: 'object',
      properties: {
        patientId: {
          type: 'string',
          description: 'Patient UUID',
        },
        mealName: {
          type: 'string',
          description: 'Name of the meal (e.g., "Breakfast", "Lunch")',
        },
        foods: {
          type: 'array',
          description: 'Foods consumed',
          items: { type: 'string' },
        },
        satisfaction: {
          type: 'number',
          description: 'Satisfaction rating 1-5',
          minimum: 1,
          maximum: 5,
        },
        notes: {
          type: 'string',
          description: 'Additional notes',
        },
      },
      required: ['patientId', 'mealName'],
    },
  } as ToolDefinition,

  'log-exercise': {
    name: 'log-exercise',
    description: 'Log an exercise completed by patient',
    inputSchema: {
      type: 'object',
      properties: {
        patientId: {
          type: 'string',
          description: 'Patient UUID',
        },
        exerciseName: {
          type: 'string',
          description: 'Name of the exercise',
        },
        duration: {
          type: 'number',
          description: 'Duration in minutes',
        },
        intensity: {
          type: 'string',
          enum: ['light', 'moderate', 'vigorous'],
          description: 'Exercise intensity',
        },
        notes: {
          type: 'string',
          description: 'Additional notes',
        },
      },
      required: ['patientId', 'exerciseName', 'duration'],
    },
  } as ToolDefinition,

  'log-medication': {
    name: 'log-medication',
    description: 'Log a medication taken by patient',
    inputSchema: {
      type: 'object',
      properties: {
        patientId: {
          type: 'string',
          description: 'Patient UUID',
        },
        medicationName: {
          type: 'string',
          description: 'Name of the medication',
        },
        taken: {
          type: 'boolean',
          description: 'Was the medication taken?',
        },
        skippedReason: {
          type: 'string',
          description: 'Reason if not taken',
        },
      },
      required: ['patientId', 'medicationName', 'taken'],
    },
  } as ToolDefinition,

  // ──────────────────────────────────────
  // Analytics
  // ──────────────────────────────────────

  'get-patient-adherence': {
    name: 'get-patient-adherence',
    description: 'Get adherence metrics for a patient',
    inputSchema: {
      type: 'object',
      properties: {
        patientId: {
          type: 'string',
          description: 'Patient UUID',
        },
        days: {
          type: 'number',
          description: 'Number of days to analyze (default: 7)',
        },
      },
      required: ['patientId'],
    },
  } as ToolDefinition,

  'get-dashboard-metrics': {
    name: 'get-dashboard-metrics',
    description: 'Get dashboard summary for nutritionist',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  } as ToolDefinition,

  'get-recent-logs': {
    name: 'get-recent-logs',
    description: 'Get recent routine logs from a patient',
    inputSchema: {
      type: 'object',
      properties: {
        patientId: {
          type: 'string',
          description: 'Patient UUID',
        },
        days: {
          type: 'number',
          description: 'Number of days back (default: 7)',
        },
        type: {
          type: 'string',
          enum: ['MEAL', 'EXERCISE', 'MEDICATION', 'WATER', 'HABIT'],
          description: 'Filter by log type',
        },
      },
      required: ['patientId'],
    },
  } as ToolDefinition,
}

// ────────────────────────────────────────────────
// Tool Implementations (Handlers)
// ────────────────────────────────────────────────

export async function handleTool(
  toolName: string,
  input: Record<string, any>,
  authInfo: MCPAuthInfo,
  backendClient: BackendClient
): Promise<string> {
  try {
    switch (toolName) {
      case 'list-patients': {
        const { page = 1, limit = 20, status } = input
        const patients = await backendClient.getPatients(page, limit)
        const filtered = status
          ? patients.data.filter((p) => p.status === status)
          : patients.data

        return JSON.stringify({
          success: true,
          data: filtered,
          total: patients.total,
          page,
          limit,
        })
      }

      case 'search-patients': {
        const { query } = input
        const results = await backendClient.searchPatients(query)
        return JSON.stringify({
          success: true,
          data: results,
          count: results.length,
        })
      }

      case 'get-patient-details': {
        const { patientId } = input
        const patient = await backendClient.getPatient(patientId)
        const plans = await backendClient.getPatientPlans(patientId)
        const adherence = await backendClient.getAdherence(patientId, 7)

        return JSON.stringify({
          success: true,
          data: {
            patient,
            activePlans: plans.filter((p) => p.status === 'active'),
            adherenceMetrics: adherence,
          },
        })
      }

      case 'get-patient-plans': {
        const { patientId } = input
        const plans = await backendClient.getPatientPlans(patientId)
        return JSON.stringify({
          success: true,
          data: plans,
          count: plans.length,
        })
      }

      case 'create-diet-plan': {
        const { patientId, title, description, startDate, meals } = input
        const plan = await backendClient.createPlan(patientId, {
          title,
          description,
          type: 'DIET',
          status: 'active',
          startDate,
          items: { meals },
        })
        return JSON.stringify({
          success: true,
          data: plan,
          message: `Diet plan "${title}" created successfully`,
        })
      }

      case 'log-meal': {
        const { patientId, mealName, foods, satisfaction, notes } = input
        const log = await backendClient.logRoutine(patientId, {
          type: 'MEAL',
          data: { mealName, foods, satisfaction },
          completedAt: new Date().toISOString(),
          notes,
        })
        return JSON.stringify({
          success: true,
          data: log,
          message: 'Meal logged successfully',
        })
      }

      case 'log-exercise': {
        const { patientId, exerciseName, duration, intensity, notes } = input
        const log = await backendClient.logRoutine(patientId, {
          type: 'EXERCISE',
          data: { exerciseName, duration, intensity },
          completedAt: new Date().toISOString(),
          notes,
        })
        return JSON.stringify({
          success: true,
          data: log,
          message: 'Exercise logged successfully',
        })
      }

      case 'log-medication': {
        const { patientId, medicationName, taken, skippedReason } = input
        const log = await backendClient.logRoutine(patientId, {
          type: 'MEDICATION',
          data: { medicationName, taken, skippedReason },
          completedAt: new Date().toISOString(),
        })
        return JSON.stringify({
          success: true,
          data: log,
          message: taken ? 'Medication logged' : 'Medication skipped logged',
        })
      }

      case 'get-patient-adherence': {
        const { patientId, days = 7 } = input
        const adherence = await backendClient.getAdherence(patientId, days)
        return JSON.stringify({
          success: true,
          data: adherence,
        })
      }

      case 'get-dashboard-metrics': {
        const dashboard = await backendClient.getDashboard()
        return JSON.stringify({
          success: true,
          data: dashboard,
        })
      }

      case 'get-recent-logs': {
        const { patientId, days = 7, type } = input
        const logs = await backendClient.getRoutineLogs(patientId, days, type)
        return JSON.stringify({
          success: true,
          data: logs,
          count: logs.length,
        })
      }

      default:
        throw new Error(`Unknown tool: ${toolName}`)
    }
  } catch (error) {
    return JSON.stringify({
      success: false,
      error: {
        code: 'TOOL_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
    })
  }
}
```

## Fase 6: MCP Server Route Handler

**`src/app/mcp/[transport]/route.ts`:**

```typescript
import { verifyClerkToken } from '@clerk/mcp-tools/next'
import { createMcpHandler, withMcpAuth } from 'mcp-handler'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { SAUVIA_TOOLS, handleTool } from '@/lib/mcp/tools'
import { createBackendClient } from '@/lib/mcp/backend-client'

const clerk = await clerkClient()

const handler = createMcpHandler((server) => {
  // ──────────────────────────────────────
  // Register all Sauvia tools
  // ──────────────────────────────────────

  Object.entries(SAUVIA_TOOLS).forEach(([toolName, toolDef]) => {
    server.tool(
      toolDef.name,
      toolDef.description,
      toolDef.inputSchema.properties,
      async (input, { authInfo }) => {
        try {
          // Reconstruct auth info
          const authData = authInfo?.extra as any
          const token = authData?.token as string

          if (!token) {
            throw new Error('No authentication token provided')
          }

          // Create backend client with token
          const backendClient = createBackendClient(token)

          // Handle tool execution
          const result = await handleTool(
            toolName,
            input,
            {
              userId: authData?.userId as string,
              organizationId: authData?.orgId as string,
              email: authData?.email as string,
              scopes: authData?.scopes as string[],
              createdAt: authData?.createdAt as number,
            },
            backendClient
          )

          // Parse and return
          const parsedResult = JSON.parse(result)
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify(parsedResult, null, 2),
              },
            ],
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error'
          return {
            content: [
              {
                type: 'text',
                text: JSON.stringify({
                  success: false,
                  error: {
                    code: 'MCP_ERROR',
                    message: errorMessage,
                  },
                }),
              },
            ],
            isError: true,
          }
        }
      }
    )
  })

  // ──────────────────────────────────────
  // Health Check Resource
  // ──────────────────────────────────────

  server.resource(
    'sauvia://health',
    'MCP Server health status',
    async () => {
      return {
        text: JSON.stringify(
          {
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: '1.0.0',
            tools: Object.keys(SAUVIA_TOOLS).length,
          },
          null,
          2
        ),
      }
    }
  )
})

// ────────────────────────────────────────
// Secure with Clerk OAuth
// ────────────────────────────────────────

const authHandler = withMcpAuth(
  handler,
  async (_, token) => {
    // Verify Clerk token
    const clerkAuth = await auth({ acceptsToken: 'oauth_token' })
    const verified = await verifyClerkToken(clerkAuth, token)

    // Return auth info for tools
    return {
      ...verified,
      extra: {
        userId: verified.sub,
        token,
        email: verified.email,
        orgId: verified.org_id,
        createdAt: verified.iat,
        scopes: verified.scope?.split(' ') ?? [],
      },
    }
  },
  {
    required: true,
    resourceMetadataPath: '/.well-known/oauth-protected-resource/mcp',
  }
)

export { authHandler as GET, authHandler as POST }
```

## Fase 7: OAuth Metadata Endpoints

**`src/app/.well-known/oauth-authorization-server/route.ts`:**

```typescript
import {
  authServerMetadataHandlerClerk,
  metadataCorsOptionsRequestHandler,
} from '@clerk/mcp-tools/next'

const handler = authServerMetadataHandlerClerk()
const corsHandler = metadataCorsOptionsRequestHandler()

export { handler as GET, corsHandler as OPTIONS }
```

**`src/app/.well-known/oauth-protected-resource/mcp/route.ts`:**

```typescript
import {
  metadataCorsOptionsRequestHandler,
  protectedResourceHandlerClerk,
} from '@clerk/mcp-tools/next'

const handler = protectedResourceHandlerClerk({
  scopes_supported: ['profile', 'email', 'openid', 'read:patients', 'write:patients', 'read:plans', 'write:plans'],
})
const corsHandler = metadataCorsOptionsRequestHandler()

export { handler as GET, corsHandler as OPTIONS }
```

## Fase 8: Atualizar Middleware

**`src/proxy.ts`:**

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/auth(.*)",
  // MCP metadata endpoints DEVEM ser públicos
  "/.well-known/oauth-authorization-server(.*)",
  "/.well-known/oauth-protected-resource(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc|mcp)(.*)",
  ],
};
```

## Fase 9: Testing

### Test Local (Desenvolvimento)

```bash
# 1. Start Next.js dev server
cd apps/web
pnpm dev

# 2. Get Clerk token (via curl ou Postman)
curl -X POST https://your-clerk-instance/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "client_id=YOUR_CLIENT_ID&client_secret=YOUR_SECRET&grant_type=client_credentials"

# 3. Test MCP endpoint
curl -X POST http://localhost:3000/mcp/http \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {}
  }'

# 4. Test specific tool
curl -X POST http://localhost:3000/mcp/http \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "get-dashboard-metrics",
      "arguments": {}
    }
  }'
```

### Test com Claude (Production)

1. Acesse [claude.ai](https://claude.ai)
2. Vá para **Settings → Beta Features → MCP Servers**
3. Clique em **Add MCP Server**
4. Configurar:
   - **Name**: "Sauvia CRM"
   - **Transport**: HTTP Streaming
   - **URL**: `https://api.sauvia.com.br/mcp/http`
   - **Auth Type**: OAuth 2.0
   - **Client ID**: (from Clerk dashboard)

## Fase 10: Deployment

### Vercel (Web)

```bash
# 1. Add environment variables
vercel env add NEXT_PUBLIC_API_URL https://api.sauvia.com.br/api/v1
vercel env add CLERK_SECRET_KEY
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

# 2. Deploy
vercel deploy --prod
```

### Monitoramento

```bash
# Verificar logs de erro
vercel logs --prod

# Monitor usage
# Dashboard Clerk → Usage → MCP Calls
```

## Checklist Final

```
[  ] Fase 1: Instalar dependências MCP
[  ] Fase 2: Criar estrutura de diretórios
[  ] Fase 3: Definir types
[  ] Fase 4: Backend client
[  ] Fase 5: Tools definition
[  ] Fase 6: MCP server route
[  ] Fase 7: OAuth metadata endpoints
[  ] Fase 8: Atualizar middleware
[  ] Fase 9: Testar localmente
[  ] Fase 10: Deploy produção
[  ] Monitorar por 24h
```

## Troubleshooting

### Erro: "Token inválido"
- ✅ Verificar se Clerk Secret Key está correto
- ✅ Verificar se token não está expirado
- ✅ Verificar CORS headers

### Erro: "Tool não encontrado"
- ✅ Verificar se tool name está exato
- ✅ Verificar se backend está rodando
- ✅ Verificar logs do backend

### Performance lenta
- ✅ Adicionar cache no backend
- ✅ Usar índices no PostgreSQL
- ✅ Verificar connection pool

## Referências

- [MCP Spec](https://modelcontextprotocol.io/)
- [Clerk Docs](https://clerk.com/docs)
- [mcp-handler GitHub](https://github.com/vercel/mcp-adapter)
- [Sauvia Backend API](./apps/backend/README.md)
- [Clerk MCP Tools](https://github.com/clerk/mcp-tools)

## Próximos Passos

1. ✅ Migração Cognito → Clerk
2. ✅ MCP Server Setup (este documento)
3. ⏭️ [Integrar Zapier](./ZAPIER_INTEGRATION.md)
4. ⏭️ [Configure AI Assistants](./AI_ASSISTANTS_SETUP.md)