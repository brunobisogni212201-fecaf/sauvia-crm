# 🔧 Implementation Code - Ready to Copy & Paste

## 1. BACKEND FASTAPI - Clerk Authentication

### File: `apps/backend/app/core/clerk_auth.py` (Create New)

```python
import jwt
import os
import httpx
from datetime import datetime
from typing import Optional, Dict, Any
from fastapi import HTTPException, status
from functools import lru_cache

CLERK_JWT_KEY = os.getenv("CLERK_JWT_KEY", "")
CLERK_API_URL = "https://api.clerk.com/v1"

class ClerkAuthError(HTTPException):
    def __init__(self, detail: str):
        super().__init__(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=detail,
            headers={"WWW-Authenticate": "Bearer"}
        )

@lru_cache(maxsize=1)
def get_clerk_public_keys() -> Dict[str, Any]:
    """Fetch Clerk's public keys for JWT verification (cached)"""
    try:
        with httpx.Client() as client:
            resp = client.get(f"{CLERK_API_URL}/jwks")
            resp.raise_for_status()
            return resp.json()
    except httpx.RequestError as e:
        raise ClerkAuthError(f"Erro ao obter chaves públicas Clerk: {str(e)}")

def verify_clerk_token(token: str) -> Dict[str, Any]:
    """
    Verify Clerk JWT token using RS256 algorithm

    Args:
        token: JWT token from Clerk

    Returns:
        Decoded token payload

    Raises:
        ClerkAuthError: If token is invalid/expired
    """
    if not token:
        raise ClerkAuthError("Token ausente")

    try:
        # Remove 'Bearer ' prefix if present
        if token.startswith("Bearer "):
            token = token[7:]

        # First decode without verification to get kid
        unverified = jwt.decode(token, options={"verify_signature": False})

        # Get public keys and verify
        keys_response = get_clerk_public_keys()
        public_keys = {key["kid"]: key for key in keys_response.get("keys", [])}

        # Get the key ID from header
        header = jwt.get_unverified_header(token)
        kid = header.get("kid")

        if not kid or kid not in public_keys:
            raise ClerkAuthError("Key ID inválido no token")

        # Verify with correct public key
        decoded = jwt.decode(
            token,
            public_keys[kid]["x"],
            algorithms=["RS256"],
            options={"verify_signature": True}
        )

        return decoded

    except jwt.ExpiredSignatureError:
        raise ClerkAuthError("Token expirado")
    except jwt.InvalidTokenError as e:
        raise ClerkAuthError(f"Token inválido: {str(e)}")
    except Exception as e:
        raise ClerkAuthError(f"Erro ao verificar token: {str(e)}")
```

### File: `apps/backend/app/deps.py` (Update)

```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from app.core.clerk_auth import verify_clerk_token

security = HTTPBearer()

async def get_current_user(credentials: HTTPAuthCredentials = Depends(security)) -> dict:
    """
    Dependency para extrair usuário do token Bearer

    Returns:
        Decoded token com informações do usuário
    """
    token = credentials.credentials
    return verify_clerk_token(token)

async def get_optional_user(request) -> Optional[dict]:
    """
    Opcional: obter usuário se token estiver presente
    """
    auth_header = request.headers.get("Authorization", "")
    if not auth_header.startswith("Bearer "):
        return None

    token = auth_header[7:]
    try:
        return verify_clerk_token(token)
    except:
        return None
```

### Update: `apps/backend/requirements.txt`

Add these lines:
```
pyjwt==2.8.1
cryptography==41.0.7
httpx==0.25.1
```

Remove these lines (if present):
```
# Remove:
# amazon-cognito-identity-js
# boto3
# botocore
```

---

## 2. FRONTEND WEB - Types & Backend Client

### File: `apps/web/src/lib/mcp/types.ts` (Create New)

```typescript
/**
 * MCP Types para Sauvia CRM
 * Compartilhados entre tools e backend
 */

export interface MCPAuthInfo {
  userId: string
  organizationId: string
  email: string
  scopes: string[]
  createdAt: number
}

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

export interface AdherenceDTO {
  patientId: string
  planId?: string
  period: string
  overallAdherence: number
  byType: Record<string, number>
  totalLogs: number
  missedDays: number
  streak: number
  lastUpdate: string
}

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
```

### File: `apps/web/src/lib/mcp/backend-client.ts` (Create New)

```typescript
import { PatientDTO, PlanDTO, RoutineLogDTO, AdherenceDTO, DashboardDTO, PaginatedResponse } from './types'

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

  async getPatients(page: number = 1, limit: number = 20): Promise<PaginatedResponse<PatientDTO>> {
    return this.request('GET', `/patients?page=${page}&limit=${limit}`)
  }

  async getPatient(patientId: string): Promise<PatientDTO> {
    return this.request('GET', `/patients/${patientId}`)
  }

  async searchPatients(query: string): Promise<PatientDTO[]> {
    return this.request('GET', `/patients/search?q=${encodeURIComponent(query)}`)
  }

  async getPatientPlans(patientId: string): Promise<PlanDTO[]> {
    return this.request('GET', `/patients/${patientId}/plans`)
  }

  async createPlan(patientId: string, data: Partial<PlanDTO>): Promise<PlanDTO> {
    return this.request('POST', `/patients/${patientId}/plans`, data)
  }

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

  async getAdherence(patientId: string, days: number = 7): Promise<AdherenceDTO> {
    return this.request('GET', `/patients/${patientId}/adherence?days=${days}`)
  }

  async getDashboard(): Promise<DashboardDTO> {
    return this.request('GET', '/dashboard')
  }
}

export function createBackendClient(token: string): BackendClient {
  return new BackendClient(token)
}
```

---

## 3. FRONTEND WEB - MCP Server Route Handler

### File: `apps/web/src/app/mcp/[transport]/route.ts` (Create New)

```typescript
import { verifyClerkToken } from '@clerk/mcp-tools/next'
import { createMcpHandler, withMcpAuth } from 'mcp-handler'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { createBackendClient } from '@/lib/mcp/backend-client'

const clerk = await clerkClient()

const handler = createMcpHandler((server) => {
  // Tool 1: Get Current User
  server.tool(
    'get-sauvia-user',
    'Get current authenticated user',
    {},
    async (_, { authInfo }) => {
      try {
        const userId = authInfo!.extra!.userId as string
        const user = await clerk.users.getUser(userId)

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({
              id: user.id,
              email: user.emailAddresses[0]?.emailAddress,
              name: `${user.firstName} ${user.lastName}`,
            })
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          }],
        }
      }
    }
  )

  // Tool 2: List Patients
  server.tool(
    'list-patients',
    'List all patients',
    {
      type: 'object',
      properties: {
        page: { type: 'number', description: 'Page number' },
        limit: { type: 'number', description: 'Items per page' }
      }
    },
    async ({ page = 1, limit = 20 }, { authInfo }) => {
      try {
        const token = authInfo!.extra!.token as string
        const client = createBackendClient(token)
        const data = await client.getPatients(page, limit)

        return {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          }]
        }
      }
    }
  )

  // Tool 3: Get Patient Details
  server.tool(
    'get-patient-details',
    'Get detailed information about a patient',
    {
      type: 'object',
      properties: {
        patientId: { type: 'string', description: 'Patient ID' }
      },
      required: ['patientId']
    },
    async ({ patientId }, { authInfo }) => {
      try {
        const token = authInfo!.extra!.token as string
        const client = createBackendClient(token)
        const patient = await client.getPatient(patientId)
        const plans = await client.getPatientPlans(patientId)
        const adherence = await client.getAdherence(patientId, 7)

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ patient, plans, adherence }, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          }]
        }
      }
    }
  )

  // Tool 4: Get Dashboard
  server.tool(
    'get-dashboard-metrics',
    'Get dashboard summary',
    {},
    async (_, { authInfo }) => {
      try {
        const token = authInfo!.extra!.token as string
        const client = createBackendClient(token)
        const dashboard = await client.getDashboard()

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(dashboard, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          }]
        }
      }
    }
  )

  // Tool 5: Log Meal
  server.tool(
    'log-meal',
    'Log a meal consumed',
    {
      type: 'object',
      properties: {
        patientId: { type: 'string' },
        mealName: { type: 'string' },
        foods: { type: 'array', items: { type: 'string' } },
        satisfaction: { type: 'number' }
      },
      required: ['patientId', 'mealName']
    },
    async (input, { authInfo }) => {
      try {
        const token = authInfo!.extra!.token as string
        const client = createBackendClient(token)
        const { patientId, mealName, foods, satisfaction } = input

        const log = await client.logRoutine(patientId, {
          type: 'MEAL',
          data: { mealName, foods, satisfaction },
          completedAt: new Date().toISOString(),
        })

        return {
          content: [{
            type: 'text',
            text: JSON.stringify({ success: true, data: log }, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          }]
        }
      }
    }
  )

  // Tool 6: Get Adherence
  server.tool(
    'get-patient-adherence',
    'Get adherence metrics',
    {
      type: 'object',
      properties: {
        patientId: { type: 'string' },
        days: { type: 'number' }
      },
      required: ['patientId']
    },
    async ({ patientId, days = 7 }, { authInfo }) => {
      try {
        const token = authInfo!.extra!.token as string
        const client = createBackendClient(token)
        const adherence = await client.getAdherence(patientId, days)

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(adherence, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          }]
        }
      }
    }
  )

  // Tool 7: Get Recent Logs
  server.tool(
    'get-recent-logs',
    'Get recent routine logs',
    {
      type: 'object',
      properties: {
        patientId: { type: 'string' },
        days: { type: 'number' },
        type: { type: 'string' }
      },
      required: ['patientId']
    },
    async ({ patientId, days = 7, type }, { authInfo }) => {
      try {
        const token = authInfo!.extra!.token as string
        const client = createBackendClient(token)
        const logs = await client.getRoutineLogs(patientId, days, type)

        return {
          content: [{
            type: 'text',
            text: JSON.stringify(logs, null, 2)
          }]
        }
      } catch (error) {
        return {
          content: [{
            type: 'text',
            text: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`
          }]
        }
      }
    }
  )
})

const authHandler = withMcpAuth(
  handler,
  async (_, token) => {
    const clerkAuth = await auth({ acceptsToken: 'oauth_token' })
    return verifyClerkToken(clerkAuth, token)
  },
  {
    required: true,
    resourceMetadataPath: '/.well-known/oauth-protected-resource/mcp'
  }
)

export { authHandler as GET, authHandler as POST }
```

---

## 4. FRONTEND WEB - OAuth Metadata Endpoints

### File: `apps/web/src/app/.well-known/oauth-authorization-server/route.ts` (Create New)

```typescript
import {
  authServerMetadataHandlerClerk,
  metadataCorsOptionsRequestHandler,
} from '@clerk/mcp-tools/next'

const handler = authServerMetadataHandlerClerk()
const corsHandler = metadataCorsOptionsRequestHandler()

export { handler as GET, corsHandler as OPTIONS }
```

### File: `apps/web/src/app/.well-known/oauth-protected-resource/mcp/route.ts` (Create New)

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

---

## 5. FRONTEND WEB - Update Existing Files

### File: `apps/web/src/proxy.ts` (Update)

```typescript
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/auth(.*)",
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

### File: `apps/web/src/lib/api-client.ts` (Update)

```typescript
import { auth } from "@clerk/nextjs/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

interface RequestOptions extends RequestInit {
  token?: string;
  skipAuth?: boolean;
  headers?: Record<string, string>;
}

export async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { token, skipAuth, headers, ...rest } = options;

  let bearerToken = token;
  if (!bearerToken && !skipAuth) {
    try {
      const { getToken } = await auth();
      bearerToken = await getToken() ?? undefined;
    } catch {
      // Silent fail for client-side usage
    }
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(bearerToken && { Authorization: `Bearer ${bearerToken}` }),
      ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }

  return res.json();
}
```

### File: `apps/web/package.json` (Update dependencies section)

Add to dependencies:
```json
"mcp-handler": "^1.0.0",
"@clerk/mcp-tools": "^1.0.0"
```

Remove from dependencies:
```json
// Remove: "amazon-cognito-identity-js": "^6.3.16"
```

---

## 6. ENVIRONMENT VARIABLES

### File: `apps/web/.env.local` (Create or Update)

```bash
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx_CHANGE_ME
CLERK_SECRET_KEY=sk_test_xxxxx_CHANGE_ME

# API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### File: `apps/backend/.env` (Create or Update)

```bash
# Clerk JWT
CLERK_JWT_KEY=sk_test_xxxxx_CHANGE_ME
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx_CHANGE_ME

# Database (existing)
DATABASE_URL=postgresql+asyncpg://user:pass@localhost:5432/sauvia

# Other existing vars...
```

---

## 7. CLEANUP - Remove Cognito Files

### Commands to run:

```bash
# Web
rm -f apps/web/src/lib/cognito.ts
rm -f apps/web/src/lib/cognito.test.ts

# Mobile
rm -f apps/mobile/lib/cognito.ts

# Update Web package.json
cd apps/web
pnpm remove amazon-cognito-identity-js
pnpm add mcp-handler @clerk/mcp-tools

# Update Backend
cd apps/backend
pip install pyjwt cryptography httpx
pip uninstall -y boto3 amazon-cognito-idp
```

---

## 8. VERIFICATION COMMANDS

Test your implementation:

```bash
# Backend health check
curl http://localhost:8000/health

# MCP metadata endpoint
curl http://localhost:3000/.well-known/oauth-protected-resource/mcp

# Test backend JWT verification
curl -X GET http://localhost:8000/api/v1/auth/me \
  -H "Authorization: Bearer YOUR_CLERK_TOKEN"
```

---

## 9. DEPLOYMENT CHECKLIST

```bash
# 1. Add env vars to Vercel
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
vercel env add CLERK_SECRET_KEY
vercel env add NEXT_PUBLIC_API_URL

# 2. Add env vars to backend (ECS/Docker)
aws secretsmanager update-secret --secret-id sauvia-backend-secrets

# 3. Deploy
cd apps/web
vercel deploy --prod

# 4. Verify
curl https://api.sauvia.com.br/.well-known/oauth-protected-resource/mcp
```

---

## 10. AWS COGNITO CLEANUP

```bash
# Backup Cognito users first!
aws cognito-idp list-users \
  --user-pool-id us-east-1_XXXXXXXXX \
  --region us-east-1 > cognito_backup_$(date +%Y%m%d).json

# Delete User Pool (via AWS Console or CLI)
aws cognito-idp delete-user-pool \
  --user-pool-id us-east-1_XXXXXXXXX \
  --region us-east-1

# Verify it's deleted
aws cognito-idp describe-user-pool \
  --user-pool-id us-east-1_XXXXXXXXX \
  --region us-east-1
# Should return error: "User pool does not exist"
```

---

## Summary

Copy and paste these files in order:

1. ✅ Backend Clerk Auth (`app/core/clerk_auth.py`)
2. ✅ Backend Deps (`app/deps.py`)
3. ✅ Backend Requirements
4. ✅ MCP Types (`lib/mcp/types.ts`)
5. ✅ Backend Client (`lib/mcp/backend-client.ts`)
6. ✅ MCP Route Handler (`app/mcp/[transport]/route.ts`)
7. ✅ OAuth Metadata Endpoints (2 files)
8. ✅ Update Proxy & API Client
9. ✅ Update package.json
10. ✅ Add .env files
11. ✅ Run cleanup commands
12. ✅ Deploy & verify

**Total Time: ~30 minutes**