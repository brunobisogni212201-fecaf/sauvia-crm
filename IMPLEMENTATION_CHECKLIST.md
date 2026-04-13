# ✅ Implementation Checklist - Clerk + MCP Integration

**Status**: Core files created and ready for environment setup
**Date**: 2025-04-10
**Estimated Time to Production**: 30-60 minutes

---

## 📋 Phase 1: Verification (5 min)

### Backend Files Created
- [ ] `apps/backend/src/adapters/driven/security/__init__.py` exists
- [ ] `apps/backend/src/adapters/driven/security/clerk_auth.py` exists (128 lines)
- [ ] `cryptography>=42.0.0` added to `apps/backend/requirements.txt`

**Verify:**
```bash
ls -la apps/backend/src/adapters/driven/security/
grep "cryptography" apps/backend/requirements.txt
```

### Frontend Files Created
- [ ] `apps/web/src/lib/mcp/types.ts` exists (122 lines)
- [ ] `apps/web/src/lib/mcp/backend-client.ts` exists (320 lines)
- [ ] `apps/web/src/app/mcp/[transport]/route.ts` exists (796 lines)
- [ ] `apps/web/src/app/.well-known/oauth-authorization-server/route.ts` exists
- [ ] `apps/web/src/app/.well-known/oauth-protected-resource/mcp/route.ts` exists

**Verify:**
```bash
ls -la apps/web/src/lib/mcp/
ls -la apps/web/src/app/mcp/\[transport\]/
ls -la apps/web/src/app/.well-known/oauth-*/
```

### Frontend Files Updated
- [ ] `apps/web/src/lib/api-client.ts` - uses Clerk `auth()` instead of Cognito
- [ ] `apps/web/src/proxy.ts` - includes `.well-known` routes as public
- [ ] `apps/web/package.json` - `amazon-cognito-identity-js` removed

**Verify:**
```bash
grep -n "from @clerk/nextjs" apps/web/src/lib/api-client.ts
grep -n ".well-known" apps/web/src/proxy.ts
! grep "amazon-cognito" apps/web/package.json && echo "✓ Cognito removed"
```

### Cognito Cleanup
- [ ] `apps/web/src/lib/cognito.ts` deleted
- [ ] `apps/web/src/lib/cognito.test.ts` deleted
- [ ] `apps/mobile/lib/cognito.ts` deleted
- [ ] Mobile `package.json` - `amazon-cognito-identity-js` removed

**Verify:**
```bash
[ ! -f apps/web/src/lib/cognito.ts ] && echo "✓ Web cognito.ts deleted"
[ ! -f apps/mobile/lib/cognito.ts ] && echo "✓ Mobile cognito.ts deleted"
! grep "amazon-cognito" apps/mobile/package.json && echo "✓ Mobile Cognito removed"
```

---

## 🔑 Phase 2: Environment Setup (10 min)

### Clerk Dashboard Configuration
- [ ] Logged in to https://dashboard.clerk.com
- [ ] Selected organization: `sauvia`
- [ ] Noted down `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (pk_test_...)
- [ ] Noted down `CLERK_SECRET_KEY` (sk_test_...)
- [ ] Verified Settings → OAuth Applications has "Dynamic client registration" enabled
- [ ] Verified Settings → API Keys shows both keys

**Location**: https://dashboard.clerk.com/apps/{app-id}/settings/api-keys

### Web Frontend Environment (.env.local or Vercel)
```bash
# .env.local file (create if not exists)
cat > apps/web/.env.local << 'ENVFILE'
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxx

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
ENVFILE
```

**Verify:**
```bash
grep "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" apps/web/.env.local
grep "CLERK_SECRET_KEY" apps/web/.env.local
```

- [ ] Created `apps/web/.env.local`
- [ ] Populated with `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- [ ] Populated with `CLERK_SECRET_KEY`
- [ ] Populated with `NEXT_PUBLIC_API_URL`

### Backend Environment (.env or container secrets)
```bash
# .env file (create if not exists)
cat > apps/backend/.env << 'ENVFILE'
# Clerk Configuration
CLERK_JWT_KEY=sk_test_xxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxx

# Optional
CLERK_AUDIENCE=your-audience-claim
ENVFILE
```

**Verify:**
```bash
grep "CLERK_JWT_KEY" apps/backend/.env
```

- [ ] Created or updated `apps/backend/.env`
- [ ] Populated with `CLERK_JWT_KEY`
- [ ] Populated with `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

### Mobile Environment (if applicable)
- [ ] Created `.env` or configured Expo with `EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY`

---

## 📦 Phase 3: Dependency Installation (10 min)

### Backend Python Dependencies
```bash
cd apps/backend
pip install -r requirements.txt
```

- [ ] Ran `pip install -r requirements.txt` without errors
- [ ] Verified `PyJWT`, `cryptography`, `httpx` installed:
  ```bash
  pip list | grep -E "PyJWT|cryptography|httpx"
  ```

### Frontend Node Dependencies
```bash
cd apps/web
pnpm install
```

- [ ] Ran `pnpm install` without errors
- [ ] Verified `mcp-handler`, `@clerk/mcp-tools`, `@clerk/nextjs` installed:
  ```bash
  pnpm list | grep -E "mcp-handler|@clerk"
  ```

### Mobile Dependencies (if applicable)
```bash
cd apps/mobile
pnpm install
```

- [ ] Ran `pnpm install` without errors

---

## 🧪 Phase 4: Local Testing (15 min)

### Test 1: Backend Module Import
```bash
cd apps/backend
python -c "from src.adapters.driven.security.clerk_auth import verify_clerk_token; print('✓ Clerk auth module imported successfully')"
```

- [ ] Command runs without `ModuleNotFoundError` or `ImportError`
- [ ] Output: `✓ Clerk auth module imported successfully`

### Test 2: Backend Server Start
```bash
cd apps/backend
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

- [ ] Server starts: `Uvicorn running on http://0.0.0.0:8000`
- [ ] No import errors
- [ ] No module not found errors

**In another terminal:**
```bash
curl http://localhost:8000/health  # or your health check endpoint
```

- [ ] Backend responds (even if 200 or 401, means server is running)

### Test 3: Frontend Build
```bash
cd apps/web
pnpm build
```

- [ ] Build completes without TypeScript errors
- [ ] Output: `✓ Compiled successfully`

**Or for development:**
```bash
cd apps/web
pnpm dev
```

- [ ] Dev server starts: `▲ Next.js X.X.X`
- [ ] Listening on: `http://localhost:3000`

### Test 4: Metadata Endpoints (Public Routes)
```bash
# In another terminal, while Next.js is running:

# Test 1: OAuth Protected Resource Metadata
curl http://localhost:3000/.well-known/oauth-protected-resource/mcp

# Expected output: JSON with scopes_supported
# Should contain: "read:patients", "write:patients", etc.

# Test 2: OAuth Authorization Server Metadata
curl http://localhost:3000/.well-known/oauth-authorization-server

# Expected output: JSON with authorization_endpoint, token_endpoint, etc.
```

- [ ] Both endpoints return HTTP 200
- [ ] Both endpoints return valid JSON
- [ ] Protected resource endpoint includes scopes

### Test 5: MCP Route (Requires Authentication)
```bash
# This will return 401 without token (expected)
curl http://localhost:3000/mcp/http -v
```

- [ ] Returns HTTP 401 (Unauthorized) - **Expected without token**
- [ ] Response includes `{"error": "..."}` or similar

**Authenticate and test:**
```bash
# Get a valid Clerk token (from browser login)
# Then test with token:

CLERK_TOKEN="your_token_here"
curl -X POST http://localhost:3000/mcp/http \
  -H "Authorization: Bearer $CLERK_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc": "2.0", "id": 1, "method": "tools/list"}'

# Expected: MCP response with available tools
```

- [ ] Returns MCP response (may include tool list or error)
- [ ] No 500 Internal Server Error

### Test 6: Browser Login Flow
1. Open http://localhost:3000 in browser
2. Click "Sign In" (or equivalent Clerk login button)
3. Should see Clerk login modal
4. Enter credentials or use OAuth provider
5. Should be redirected to app dashboard
6. Check browser console (DevTools F12)

- [ ] Clerk modal appears
- [ ] Can complete login flow
- [ ] No JavaScript errors in console
- [ ] Successfully authenticated

---

## 🔌 Phase 5: Backend Integration (20 min)

### Integrate Clerk Auth into Routers

Find your main router file or auth router (typically `apps/backend/src/adapters/driving/api/routes/` or `src/main.py`):

```python
# 1. Add imports
from fastapi.security import HTTPBearer, HTTPAuthCredentials
from src.adapters.driven.security.clerk_auth import verify_clerk_token

# 2. Create security scheme
security = HTTPBearer()

# 3. Add dependency
async def get_current_user(
    credentials: HTTPAuthCredentials = Depends(security)
) -> dict:
    """Verify Clerk token and return user info"""
    return verify_clerk_token(f"Bearer {credentials.credentials}")

# 4. Use in routes
@router.get("/auth/me")
async def get_me(user: dict = Depends(get_current_user)):
    return {
        "userId": user.get("sub"),
        "email": user.get("email"),
        "claims": user
    }
```

- [ ] Imported HTTPBearer and HTTPAuthCredentials
- [ ] Imported verify_clerk_token
- [ ] Created `get_current_user` dependency
- [ ] Updated at least one route to use `Depends(get_current_user)`
- [ ] Backend still starts without errors

**Test the endpoint:**
```bash
# Without token (should fail):
curl http://localhost:8000/auth/me

# With Clerk token:
curl -H "Authorization: Bearer YOUR_CLERK_TOKEN" http://localhost:8000/auth/me
```

- [ ] Without token: returns 403 or 401
- [ ] With token: returns user information

---

## 🚀 Phase 6: Production Preparation (15 min)

### Code Quality Checks
```bash
# Run linter on web
cd apps/web
pnpm lint

# Run type check on web
pnpm tsc --noEmit

# Check backend for obvious issues
cd apps/backend
python -m py_compile src/adapters/driven/security/clerk_auth.py
```

- [ ] No major linting errors
- [ ] TypeScript compiles without errors
- [ ] Python syntax valid

### Environment Variables for Production
- [ ] Vercel environment variables configured (web)
- [ ] Backend container secrets configured (ECS/Docker/etc)
- [ ] Production Clerk API keys ready (different from test if desired)

### Git Cleanup
```bash
# Remove development .env.local from tracking (if added)
git rm --cached apps/web/.env.local 2>/dev/null || true
echo "apps/web/.env.local" >> apps/web/.gitignore
echo "apps/backend/.env" >> apps/backend/.gitignore

# Stage all changes
git add -A
git status  # Review what's staged
```

- [ ] Reviewed git changes
- [ ] .env files in .gitignore
- [ ] Ready to commit

---

## 📊 Phase 7: Verification Summary

Run this script to verify all setup is complete:

```bash
#!/bin/bash

echo "🔍 Verifying Implementation..."
echo ""

# Check files exist
echo "📁 Checking files..."
files_ok=true

for file in \
  "apps/backend/src/adapters/driven/security/__init__.py" \
  "apps/backend/src/adapters/driven/security/clerk_auth.py" \
  "apps/web/src/lib/mcp/types.ts" \
  "apps/web/src/lib/mcp/backend-client.ts" \
  "apps/web/src/app/mcp/[transport]/route.ts" \
  "apps/web/src/app/.well-known/oauth-authorization-server/route.ts" \
  "apps/web/src/app/.well-known/oauth-protected-resource/mcp/route.ts"
do
  if [ -f "$file" ]; then
    echo "  ✓ $file"
  else
    echo "  ✗ $file (MISSING)"
    files_ok=false
  fi
done

# Check dependencies
echo ""
echo "📦 Checking dependencies..."

if grep -q "cryptography" apps/backend/requirements.txt; then
  echo "  ✓ cryptography in requirements.txt"
else
  echo "  ✗ cryptography NOT in requirements.txt"
fi

if ! grep -q "amazon-cognito" apps/web/package.json; then
  echo "  ✓ Cognito removed from web package.json"
else
  echo "  ✗ Cognito still in web package.json"
fi

# Check environment
echo ""
echo "🔑 Checking environment..."

if [ -f "apps/web/.env.local" ]; then
  if grep -q "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY" apps/web/.env.local; then
    echo "  ✓ Clerk keys in web/.env.local"
  else
    echo "  ⚠ web/.env.local exists but missing CLERK keys"
  fi
else
  echo "  ⚠ apps/web/.env.local NOT FOUND (create it)"
fi

if [ -f "apps/backend/.env" ]; then
  if grep -q "CLERK_JWT_KEY" apps/backend/.env; then
    echo "  ✓ CLERK_JWT_KEY in backend/.env"
  else
    echo "  ⚠ backend/.env exists but missing CLERK_JWT_KEY"
  fi
else
  echo "  ⚠ apps/backend/.env NOT FOUND (create it)"
fi

echo ""
echo "✨ Verification complete!"
```

Save and run:
```bash
chmod +x verify-implementation.sh
./verify-implementation.sh
```

---

## 🎯 Final Checklist Before Going Live

- [ ] All Phase 1-7 items checked ✓
- [ ] Local testing successful
- [ ] Backend can verify Clerk tokens
- [ ] Frontend MCP server running
- [ ] Environment variables secured in Vercel/container secrets
- [ ] Git changes reviewed and ready to commit
- [ ] Documentation reviewed (IMPLEMENTATION_COMPLETE.md)
- [ ] Team informed of Cognito deprecation
- [ ] AWS Cognito backup created (optional but recommended)

---

## 🎉 Success Criteria

Your implementation is **COMPLETE** when:

1. ✅ Backend Clerk auth module created and importable
2. ✅ Frontend MCP server with 9 tools implemented
3. ✅ OAuth metadata endpoints respond with valid JSON
4. ✅ Middleware allows .well-known routes as public
5. ✅ API client uses Clerk instead of Cognito
6. ✅ All Cognito references removed
7. ✅ Local dev environment works end-to-end
8. ✅ Backend can verify Clerk JWT tokens
9. ✅ No TypeScript or Python errors
10. ✅ Environment variables configured

---

## 📞 Troubleshooting

### Issue: "ModuleNotFoundError: No module named 'cryptography'"
**Solution:**
```bash
cd apps/backend
pip install cryptography==42.0.0
```

### Issue: "Cannot find module '@clerk/mcp-tools'"
**Solution:**
```bash
cd apps/web
pnpm install @clerk/mcp-tools
pnpm install mcp-handler
```

### Issue: ".well-known endpoints return 404"
**Solution:**
1. Check files exist: `ls apps/web/src/app/.well-known/*/route.ts`
2. Rebuild Next.js: `pnpm build`
3. Check proxy.ts includes `.well-known` routes

### Issue: Backend can't fetch Clerk JWKS
**Solution:**
1. Verify internet connection: `curl https://api.clerk.com/v1/jwks`
2. Check CLERK_JWT_KEY is set
3. Check no firewall blocking Clerk API

### Issue: Token verification fails with "Key not found"
**Solution:**
1. Restart backend to clear key cache: `python -m uvicorn ...`
2. Verify token is valid (not expired)
3. Check kid (key ID) in token header matches Clerk JWKS

---

## 📖 Next Steps After Completion

1. **Deploy to Production**
   - Push to GitHub
   - Deploy web to Vercel
   - Deploy backend to ECS/Docker
   - Update environment variables

2. **AWS Cleanup** (optional)
   - Backup Cognito pool
   - Delete Cognito user pool
   - Reduce AWS bill by $50-100/month

3. **MCP Integration**
   - Configure Claude Desktop
   - Test with ChatGPT (if available)
   - Create custom LLM clients

4. **Monitoring**
   - Setup Sentry error tracking
   - Monitor Clerk token failures
   - Track MCP tool usage

---

**Estimated Total Time**: ~60 minutes
**Status**: ✅ Core Implementation Complete - Ready for Testing

Good luck! 🚀
