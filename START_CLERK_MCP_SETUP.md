# 🚀 START HERE: Clerk + MCP Setup - Action Plan

**Status**: ✅ All code is implemented and ready  
**Time to complete**: 8-10 minutes  
**Last updated**: 2025-04-10

---

## 📋 Your Action Items (In Order)

### Step 1: Get Clerk API Keys (2 minutes)

1. Open: https://dashboard.clerk.com
2. Select organization: **"sauvia"**
3. Go to: **Settings → API Keys**
4. Copy these two values (you'll need them in step 3):
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` (starts with `pk_test_` or `pk_live_`)
   - `CLERK_SECRET_KEY` (starts with `sk_test_` or `sk_live_`)

⏸️ **Stop here and have both keys ready before continuing**

---

### Step 2: Prepare Your Terminal (1 minute)

```bash
cd sauvia-app

# Make setup script executable
chmod +x scripts/clerk-mcp-setup.sh
```

---

### Step 3: Run Automated Setup (2 minutes)

```bash
# Run from sauvia-app root directory
./scripts/clerk-mcp-setup.sh
```

**What to do when prompted:**
- It will ask for `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → Paste your pk_test_/pk_live_ key
- It will ask for `CLERK_SECRET_KEY` → Paste your sk_test_/sk_live_ key
- Then it will automatically:
  - ✅ Verify all files exist
  - ✅ Create `.env` files for backend, web, mobile
  - ✅ Install Python and Node dependencies
  - ✅ Run verification tests

⏸️ **Wait until script completes (should show "✅ Setup complete!")**

---

### Step 4: Start Services (3 separate terminals)

**Terminal 1 - Backend API (Port 8000)**
```bash
cd apps/backend
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

Wait for output: `Application startup complete`

**Terminal 2 - Web Frontend (Port 3000)**
```bash
cd apps/web
pnpm dev
```

Wait for output: `Local: http://localhost:3000`

**Terminal 3 - Run Tests**
```bash
# Test OAuth endpoints
curl http://localhost:3000/.well-known/oauth-protected-resource/mcp

# Should return JSON with status 200 ✓
```

---

### Step 5: Test in Browser (2 minutes)

1. Open browser: http://localhost:3000
2. Click "Sign In" button
3. Complete Clerk authentication (email or social login)
4. You should see the dashboard
5. **✓ Success**: You're now authenticated with Clerk!

---

### Step 6: Verify MCP Tools Work (1 minute)

In browser DevTools Console, run:

```javascript
// Get a token from Clerk
const { getToken } = await import('@clerk/clerk-js');
const token = await getToken();

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
// Should show list of 9 MCP tools ✓
```

---

## ✅ Success Checklist

If you can check all these boxes, you're done! 🎉

- [ ] Setup script ran without errors
- [ ] Backend started on port 8000
- [ ] Web app started on port 3000
- [ ] OAuth endpoints returned JSON (200 status)
- [ ] Browser login with Clerk worked
- [ ] MCP endpoint returned list of tools

---

## 🚨 If Something Goes Wrong

### Issue: "Command not found: python" or "pip not found"
- **Solution**: Install Python 3.11+
- Check: `python --version` (should be 3.11 or higher)

### Issue: "Command not found: pnpm"
- **Solution**: Install pnpm
- Run: `npm install -g pnpm`

### Issue: ".well-known returns 404"
- **Solution**: Rebuild Next.js
- Run: `cd apps/web && pnpm build`

### Issue: Backend import errors
- **Solution**: Install dependencies
- Run: `cd apps/backend && pip install -r requirements.txt`

### Issue: "CLERK_JWT_KEY not set"
- **Solution**: Run setup script again
- Verify `.env` file was created: `cat apps/backend/.env`

### For other issues:
See `QUICK_START_CLERK_MCP.sh` (Troubleshooting section)

---

## 📚 What's Implemented

### ✅ Backend (Python FastAPI)
- Clerk JWT verification (`apps/backend/src/adapters/driven/security/clerk_auth.py`)
- Can verify tokens from Clerk
- Ready to integrate into your routers

### ✅ Frontend (Next.js)
- MCP route with 9 tools
- OAuth metadata endpoints
- Clerk authentication
- Backend API client

### ✅ Documentation
- Complete setup guide: `CLERK_MCP_COMPLETE_SETUP.md`
- Implementation details: `IMPLEMENTATION_COMPLETE.md`
- Quick reference: `QUICK_START_CLERK_MCP.sh`
- Implementation status: `IMPLEMENTATION_READY.md`

---

## 🎯 After Setup Works Locally

### Option A: Stop Here (For Testing)
Your local dev environment is now ready for testing!

### Option B: Deploy to Production

**Web (Vercel):**
```bash
cd apps/web
vercel deploy --prod
```

**Backend (Docker):**
```bash
cd apps/backend
docker build -t sauvia-backend:latest .
docker push YOUR_REGISTRY/sauvia-backend:latest
```

See `IMPLEMENTATION_READY.md` for full production deployment guide.

---

## 💡 Key Points to Remember

- 🔑 **Clerk Keys**: Use test keys (`pk_test_`, `sk_test_`) for local development
- 🔒 **Security**: Never commit `.env` files to git
- 🌐 **URLs**: Backend on 8000, web on 3000 (don't mix these up)
- 📱 **Tokens**: Last 7 days, then need to login again
- 💰 **Cost**: You'll save $50-100/month by replacing Cognito

---

## 📞 Getting Help

1. **Step-by-step guide**: Read `CLERK_MCP_COMPLETE_SETUP.md` (10 phases)
2. **Quick reference**: Check `QUICK_START_CLERK_MCP.sh` (troubleshooting table)
3. **Implementation details**: See `IMPLEMENTATION_COMPLETE.md`
4. **Clerk Docs**: https://clerk.com/docs

---

## ⏱️ Time Breakdown

| Step | Time |
|------|------|
| Get Clerk keys | 2 min |
| Run setup script | 2 min |
| Start services | 3 min |
| Browser test | 2 min |
| MCP verification | 1 min |
| **TOTAL** | **~10 min** |

---

## 🚀 Ready?

```bash
# Run this command right now:
cd sauvia-app && chmod +x scripts/clerk-mcp-setup.sh && ./scripts/clerk-mcp-setup.sh
```

Then follow the prompts!

---

**Next**: Follow Step 1 above (Get Clerk API Keys) ⬆️

Good luck! 🎉