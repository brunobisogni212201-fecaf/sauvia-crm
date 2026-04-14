# 🚀 Clerk + MCP Quick Start Guide (5-10 minutes)

## Prerequisites

- Node.js 18+ and pnpm 10+
- Python 3.11+ with pip
- Clerk account with organization "sauvia" configured
- Git repository access

## Step 1: Get Clerk Keys (2 min)

1. Open https://dashboard.clerk.com
2. Select "sauvia" organization
3. Go to Settings → API Keys
4. Copy:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_`)
   - `CLERK_SECRET_KEY` (starts with `sk_test_`)

## Step 2: Run Automated Setup (2 min)

```bash
cd sauvia-app

# Make script executable
chmod +x scripts/clerk-mcp-setup.sh

# Run setup
./scripts/clerk-mcp-setup.sh

# Follow prompts to enter Clerk keys
```

This script will:
- ✓ Verify all implementation files exist
- ✓ Create `.env` files for backend, web, and mobile
- ✓ Install dependencies
- ✓ Verify Clerk auth module
- ✓ Build web app

## Step 3: Start Services (3 separate terminals)

**Terminal 1 - Backend (Port 8000)**
```bash
cd apps/backend
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

Expected output:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
INFO:     Application startup complete
```

**Terminal 2 - Web Frontend (Port 3000)**
```bash
cd apps/web
pnpm dev
```

Expected output:
```
▲ Next.js 15.5.15
- Local:        http://localhost:3000
```

**Terminal 3 - Test Endpoints**
```bash
# Test OAuth Protected Resource endpoint
curl http://localhost:3000/.well-known/oauth-protected-resource/mcp

# Test OAuth Authorization Server endpoint
curl http://localhost:3000/.well-known/oauth-authorization-server

# Should both return JSON with 200 status
```

## Step 4: Test in Browser (2 min)

1. Open http://localhost:3000
2. Click "Sign In"
3. Complete Clerk authentication
4. You should be redirected to dashboard
5. Check DevTools Network tab - requests should have `Authorization: Bearer` header

## Step 5: Test MCP Endpoint (1 min)

In browser DevTools Console:
```javascript
// Get Clerk token
const token = await fetch('http://localhost:3000/api/auth/token')
  .then(r => r.json())
  .then(d => d.token);

// Test MCP endpoint
const response = await fetch('http://localhost:3000/mcp/http', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    jsonrpc: '2.0',
    id: 1,
    method: 'tools/list'
  })
});

console.log(await response.json());
// Should return list of available MCP tools
```

## ✅ Success Indicators

- [ ] Setup script completes without errors
- [ ] Backend starts with "Application startup complete"
- [ ] Web app starts with "Local: http://localhost:3000"
- [ ] OAuth endpoints return 200 status with JSON
- [ ] Browser login with Clerk works
- [ ] Requests include Authorization header
- [ ] MCP endpoint responds with tool list

## ⚠️ Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| "CLERK_JWT_KEY not set" | Run setup script again, ensure .env files created |
| "Module not found: cryptography" | Run: `pip install cryptography==42.0.0` |
| ".well-known 404" | Rebuild web: `cd apps/web && pnpm build` |
| "Connection refused" | Check all services running on correct ports |
| "401 Unauthorized" | Verify you're logged in and token not expired |

## 📚 Detailed Documentation

For more comprehensive setup guide, see:
- `CLERK_MCP_COMPLETE_SETUP.md` - Full 10-phase implementation guide
- `IMPLEMENTATION_COMPLETE.md` - Technical implementation details
- `COGNITO_TO_CLERK_MIGRATION.md` - Migration reference

## 🚀 Production Deployment

When ready to deploy:

1. **Web to Vercel:**
   ```bash
   cd apps/web
   vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   # Enter production pk_live_ key
   vercel deploy --prod
   ```

2. **Backend to Docker:**
   ```bash
   cd apps/backend
   docker build -t sauvia-backend:latest .
   docker tag sauvia-backend:latest YOUR_REGISTRY/sauvia-backend:latest
   docker push YOUR_REGISTRY/sauvia-backend:latest
   ```

3. **Update Clerk Settings:**
   - Add production redirect URLs
   - Enable OAuth applications
   - Configure scopes

## 🧪 Integration Test Script

Save as `test-integration.sh` and run:

```bash
#!/bin/bash

echo "Testing Clerk + MCP Integration..."

# Test 1: OAuth Endpoints
echo "1. Testing OAuth endpoints..."
curl -s http://localhost:3000/.well-known/oauth-protected-resource/mcp | jq . && echo "✓" || echo "✗"

# Test 2: Backend Health
echo "2. Testing backend health..."
curl -s http://localhost:8000/health | jq . && echo "✓" || echo "✗"

# Test 3: MCP Handler (expects OPTIONS to work)
echo "3. Testing MCP handler..."
curl -s -X OPTIONS http://localhost:3000/mcp/http -H "Access-Control-Request-Method: POST" && echo "✓" || echo "✗"

echo "Tests complete!"
```

## 📞 Support & Resources

- **Clerk Documentation**: https://clerk.com/docs
- **MCP Protocol**: https://modelcontextprotocol.io
- **FastAPI**: https://fastapi.tiangolo.com
- **Next.js**: https://nextjs.org/docs

## ⏱️ Timeline

- **Setup Script**: 2 minutes
- **Service Startup**: 3 minutes
- **Browser Testing**: 2 minutes
- **MCP Testing**: 1 minute
- **Total**: ~8 minutes to full integration

---

**After successful setup, your Sauvia app is ready for:**
✅ Clerk authentication (replaces Cognito)
✅ MCP integration with AI assistants (Claude, ChatGPT)
✅ Production deployment

💰 **Cost Savings**: ~$60-120/month (Cognito removal)

Questions? Check the detailed guides or refer to CLAUDE.md for project conventions.
