# 🎯 Clerk + MCP Implementation Complete Guide

**Status**: Ready to Deploy  
**Last Updated**: 2025-04-10  
**Total Setup Time**: ~30 minutes

---

## ✅ Phase 1: Verify All Files Are in Place

```bash
cd sauvia-app

# Verify backend Clerk auth module
test -f apps/backend/src/adapters/driven/security/clerk_auth.py && echo "✓ Backend auth module" || echo "✗ Backend auth module MISSING"

# Verify frontend MCP route
test -f apps/web/src/app/mcp/[transport]/route.ts && echo "✓ MCP route handler" || echo "✗ MCP route handler MISSING"

# Verify OAuth endpoints
test -f apps/web/src/app/.well-known/oauth-protected-resource/mcp/route.ts && echo "✓ OAuth protected resource" || echo "✗ OAuth protected resource MISSING"
test -f apps/web/src/app/.well-known/oauth-authorization-server/route.ts && echo "✓ OAuth authorization server" || echo "✗ OAuth authorization server MISSING"

# Verify MCP libraries
test -f apps/web/src/lib/mcp/types.ts && echo "✓ MCP types" || echo "✗ MCP types MISSING"
test -f apps/web/src/lib/mcp/backend-client.ts && echo "✓ Backend client" || echo "✗ Backend client MISSING"
```

---

## ✅ Phase 2: Set Up Environment Variables

### 2.1 Get Clerk Keys

1. **Open** [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. **Select organization**: "sauvia"
3. **Navigate to**: Settings → API Keys
4. **Copy**:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_` or `pk_live_`)
   - `CLERK_SECRET_KEY` (starts with `sk_test_` or `sk_live_`)

### 2.2 Create `.env.local` Files

**Backend (apps/backend/.env)**
```bash
# Clerk Authentication
CLERK_JWT_KEY=sk_test_xxxxxxxxxxxxx  # Same as CLERK_SECRET_KEY above
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_AUDIENCE=

# API Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/sauvia
REDIS_URL=redis://localhost:6379/0
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Environment
ENV=development
DEBUG=true
```

**Web Frontend (apps/web/.env.local)**
```bash
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Node Environment
NODE_ENV=development
```

**Mobile (apps/mobile/.env)**
```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### 2.3 Verify Environment Setup

```bash
# Backend
cd apps/backend
python -c "import os; from dotenv import load_dotenv; load_dotenv(); print('CLERK_JWT_KEY:', os.getenv('CLERK_JWT_KEY')[:20] + '...')" 

# Web
cd ../web
grep "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" .env.local
```

---

## ✅ Phase 3: Install Dependencies

### 3.1 Backend Dependencies

```bash
cd apps/backend

# Install/update Python packages
pip install --upgrade pip
pip install -r requirements.txt

# Verify cryptography is installed (needed for RS256)
python -c "from cryptography.hazmat.primitives import serialization; print('✓ Cryptography installed')"

# Verify JWT verification works
python -c "from src.adapters.driven.security.clerk_auth import verify_clerk_token; print('✓ Clerk auth module loads correctly')"
```

### 3.2 Web Dependencies

```bash
cd apps/web

# Install with pnpm
pnpm install

# Verify MCP packages
pnpm list @clerk/mcp-tools mcp-handler
```

### 3.3 Mobile Dependencies

```bash
cd apps/mobile

# Install with pnpm
pnpm install

# Verify Clerk is installed
pnpm list @clerk/clerk-expo
```

---

## ✅ Phase 4: Run Verification Tests

### 4.1 Backend Verification

```bash
cd apps/backend

echo "Testing Clerk auth module..."
python -c "
from src.adapters.driven.security.clerk_auth import verify_clerk_token, get_clerk_public_keys
print('✓ Module imports successful')

# Try to fetch public keys (will fail without internet, but should not crash)
try:
    keys = get_clerk_public_keys()
    print('✓ Can fetch Clerk JWKS')
except Exception as e:
    print(f'⚠ JWKS fetch (network error expected): {str(e)[:50]}...')
"
```

### 4.2 Frontend Verification

```bash
cd apps/web

echo "Testing Next.js build..."
pnpm build

echo "Testing MCP routes..."
pnpm dev &
sleep 5
curl http://localhost:3000/.well-known/oauth-protected-resource/mcp
curl http://localhost:3000/.well-known/oauth-authorization-server
```

---

## ✅ Phase 5: Start Services Locally

### 5.1 Terminal 1 - Backend API

```bash
cd apps/backend

# Start with auto-reload
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000

# Expected output:
# INFO:     Uvicorn running on http://0.0.0.0:8000
# INFO:     Application startup complete
```

### 5.2 Terminal 2 - Frontend Web App

```bash
cd apps/web

# Start dev server with turbopack
pnpm dev

# Expected output:
# ▲ Next.js 15.5.15
# - Local:        http://localhost:3000
# - Environments: .env.local
```

### 5.3 Terminal 3 - Test Endpoints

```bash
# Test 1: OAuth Protected Resource Metadata
echo "=== Test 1: OAuth Protected Resource ==="
curl -s http://localhost:3000/.well-known/oauth-protected-resource/mcp | jq .

# Test 2: OAuth Authorization Server Metadata
echo -e "\n=== Test 2: OAuth Authorization Server ==="
curl -s http://localhost:3000/.well-known/oauth-authorization-server | jq .

# Test 3: MCP Handler (will show 401 without token - expected)
echo -e "\n=== Test 3: MCP Handler (no token) ==="
curl -s http://localhost:3000/mcp/http -X OPTIONS

# Test 4: Backend Health Check
echo -e "\n=== Test 4: Backend Health ==="
curl -s http://localhost:8000/health || echo "Add health endpoint if missing"
```

---

## ✅ Phase 6: Test Authentication Flow

### 6.1 Browser Login Test

1. **Open** http://localhost:3000 in your browser
2. **Click** "Sign In" button
3. **Complete** Clerk authentication (email or social login)
4. **Verify** you're redirected to dashboard
5. **Check DevTools** Network tab for `Authorization: Bearer ...` header

### 6.2 Get Clerk Token for Testing

```bash
# In browser DevTools Console, run:
# await fetch('http://localhost:3000/api/auth/token').then(r => r.json()).then(d => console.log(d))

# Or check Network tab for any request with Authorization header
# Copy the Bearer token value
```

### 6.3 Test MCP Endpoint with Token

```bash
# Replace YOUR_TOKEN with token from browser
YOUR_TOKEN="eyJhbGciOiJSUzI1NiIsImtpZCI6Ins..." # Paste here

# Test MCP with token
curl -X POST http://localhost:3000/mcp/http \
  -H "Authorization: Bearer $YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list"
  }' | jq .

# Expected response: list of MCP tools
```

---

## ✅ Phase 7: Wire Backend Auth (Integration)

### 7.1 Add Clerk Dependency to Your Routers

If your backend routers don't have Clerk auth yet, add it:

```python
# apps/backend/src/adapters/driving/api/routes/auth.py

from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from src.adapters.driven.security.clerk_auth import verify_clerk_token, extract_user_id_from_token

router = APIRouter(prefix="/auth", tags=["auth"])
security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security)
) -> dict:
    """Extract and verify current user from Clerk token"""
    token = f"Bearer {credentials.credentials}"
    return verify_clerk_token(token)

@router.get("/me")
async def get_me(user: dict = Depends(get_current_user)):
    """Get current user info from Clerk token"""
    return {
        "userId": extract_user_id_from_token(user),
        "email": user.get("email"),
        "name": user.get("name"),
    }

# Example protected route
@router.get("/patients")
async def list_patients(user: dict = Depends(get_current_user)):
    """List patients for current nutritionist"""
    user_id = extract_user_id_from_token(user)
    # Fetch patients for this user_id
    return {"patients": []}
```

### 7.2 Update Main App to Include Routes

```python
# apps/backend/src/main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.adapters.driving.api.routes.auth import router as auth_router

app = FastAPI(title="Sauvia API", version="1.0")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://sauvia.com.br"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/v1")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
```

---

## ✅ Phase 8: Test Full Integration

### 8.1 Integration Test Script

```bash
#!/bin/bash

echo "🧪 Running Integration Tests..."

# Start services in background
cd apps/backend
python -m uvicorn src.main:app --port 8000 &
BACKEND_PID=$!

cd ../web
pnpm dev &
WEB_PID=$!

sleep 10

# Test 1: Backend is running
echo -n "Test 1: Backend health... "
if curl -s http://localhost:8000/health | grep -q "healthy"; then
    echo "✓"
else
    echo "✗"
fi

# Test 2: Frontend is running
echo -n "Test 2: Frontend running... "
if curl -s http://localhost:3000 | grep -q "<html"; then
    echo "✓"
else
    echo "✗"
fi

# Test 3: OAuth endpoints exist
echo -n "Test 3: OAuth metadata endpoints... "
STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/.well-known/oauth-protected-resource/mcp)
if [ $STATUS -eq 200 ]; then
    echo "✓"
else
    echo "✗ (Status: $STATUS)"
fi

# Cleanup
kill $BACKEND_PID $WEB_PID 2>/dev/null

echo "✅ Integration tests complete!"
```

---

## ✅ Phase 9: Deploy to Production

### 9.1 Prepare for Vercel (Web)

```bash
cd apps/web

# Add environment variables to Vercel
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# Paste your pk_live_xxxxx key

vercel env add CLERK_SECRET_KEY
# Paste your sk_live_xxxxx key

vercel env add NEXT_PUBLIC_API_URL
# Enter: https://api.sauvia.com.br/api/v1 (or your backend URL)

# Deploy
vercel deploy --prod
```

### 9.2 Deploy Backend (Docker)

```bash
cd apps/backend

# Build Docker image
docker build -t sauvia-backend:latest .

# Tag for registry
docker tag sauvia-backend:latest YOUR_REGISTRY/sauvia-backend:latest

# Push to registry
docker push YOUR_REGISTRY/sauvia-backend:latest

# Deploy to ECS/Fargate (update with your service)
aws ecs update-service \
  --cluster sauvia-prod \
  --service backend \
  --force-new-deployment
```

### 9.3 Update Clerk Settings

1. **Go to** https://dashboard.clerk.com
2. **Settings → Allowed Redirect URLs** - Add:
   - `https://api.sauvia.com.br/mcp/callback`
   - `https://sauvia.com.br/sign-in`
3. **Settings → Advanced** - Ensure OAuth is enabled

---

## ✅ Phase 10: Monitoring & Troubleshooting

### 10.1 Check Logs

```bash
# Backend logs
docker logs sauvia-backend-prod

# Frontend logs (Vercel)
vercel logs

# Clerk auth issues
# Check CloudWatch or application logs for token verification errors
```

### 10.2 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Token inválido" | Check CLERK_JWT_KEY matches CLERK_SECRET_KEY |
| "Key ID inválido" | Ensure Clerk keys haven't rotated (restart to clear cache) |
| ".well-known 404" | Verify middleware config in proxy.ts and rebuild |
| "CORS error" | Add your domain to Clerk allowed origins |
| "401 Unauthorized" | Verify user is logged in and token isn't expired |

### 10.3 Health Check Endpoints

```bash
# Frontend health
curl https://sauvia.com.br/.well-known/oauth-protected-resource/mcp

# Backend health
curl https://api.sauvia.com.br/health

# Auth status
curl -H "Authorization: Bearer $(get_token)" https://api.sauvia.com.br/api/v1/auth/me
```

---

## 🚀 Next Steps

### After Successful Setup:

1. **AWS Cleanup** (Optional but recommended)
   ```bash
   # Backup Cognito if needed
   aws cognito-idp list-users --user-pool-id us-east-1_xxxxx > cognito-backup.json
   
   # Delete user pool after confirming migration is complete
   # This saves $50-100/month
   ```

2. **MCP Client Integration**
   - Connect Claude Desktop to MCP server
   - Test tools: get-sauvia-user, list-patients, etc.

3. **Monitor & Optimize**
   - Setup error tracking (Sentry)
   - Monitor token verification performance
   - Track MCP tool usage

---

## 📋 Completion Checklist

- [ ] **Phase 1**: All files verified to exist
- [ ] **Phase 2**: Environment variables set for all three apps
- [ ] **Phase 3**: Dependencies installed in backend, web, and mobile
- [ ] **Phase 4**: Verification tests pass
- [ ] **Phase 5**: Services start without errors
- [ ] **Phase 6**: Browser login works and token obtained
- [ ] **Phase 7**: Backend auth dependency integrated
- [ ] **Phase 8**: Full integration test passes
- [ ] **Phase 9**: Production deployment successful
- [ ] **Phase 10**: Production health checks pass

---

## 📞 Support

- **Clerk Docs**: https://clerk.com/docs
- **MCP Spec**: https://modelcontextprotocol.io
- **FastAPI Docs**: https://fastapi.tiangolo.com
- **Next.js Docs**: https://nextjs.org/docs

---

**🎉 Implementation Complete!**  
Your Sauvia app is now using Clerk authentication with full MCP integration for AI assistants.