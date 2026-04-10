# 🌐 Cloudflare + AWS Integration Complete!

## ✅ Configuration Summary

### Domain Setup
- **Domain:** `sauvia.qzz.io`
- **Zone ID:** `0e75bef8e8dab2a320711e525e4c8a01`
- **Status:** Active and protected by Cloudflare

### DNS Records Created

| Subdomain | Type | Points To | Proxied | Purpose |
|-----------|------|-----------|---------|---------|
| `app.sauvia.qzz.io` | CNAME | AWS ALB | ✅ Yes | Web Frontend (Next.js) |
| `api.sauvia.qzz.io` | CNAME | AWS ALB | ✅ Yes | Backend API (FastAPI) |
| `staging.sauvia.qzz.io` | CNAME | AWS ALB | ✅ Yes | Staging Environment |

### SSL/TLS Configuration
- **Mode:** Full (strict) - End-to-end encryption
- **Always Use HTTPS:** ✅ Enabled
- **Automatic HTTPS Rewrites:** ✅ Enabled
- **Certificate Status:** Active

### Performance Optimizations
- **Brotli Compression:** ✅ Enabled (better than gzip)
- **HTTP/2:** ✅ Enabled
- **Browser Cache TTL:** 4 hours (14400 seconds)
- **CDN Caching:** ✅ Enabled via Cloudflare proxy

### Security Features
- **Security Level:** Medium
- **Browser Integrity Check:** ✅ Enabled
- **DDoS Protection:** ✅ Enabled (via Cloudflare proxy)
- **WAF:** Available (configure in dashboard if needed)

## 🚀 How to Access Your Apps

Once deployed to AWS:

```
Web App:    https://app.sauvia.qzz.io
API:        https://api.sauvia.qzz.io/docs
Staging:    https://staging.sauvia.qzz.io
```

All traffic flows through Cloudflare CDN → AWS ALB → ECS containers

## 📊 Traffic Flow

```
User Request
    ↓
Cloudflare Edge (200+ locations)
    ↓ (DDoS protection, caching, SSL termination)
Cloudflare Proxy
    ↓ (optimized traffic)
AWS ALB (sauvia-alb-staging)
    ↓ (load balancing)
ECS Services (Fargate)
    ↓
  Web:  Port 3000 (Next.js)
  API:  Port 8000 (FastAPI)
```

## 🛠️ Management

### View DNS Records
```bash
./scripts/setup-cloudflare.sh
```

### Cloudflare Dashboard
- **Analytics:** https://dash.cloudflare.com/0e75bef8e8dab2a320711e525e4c8a01/analytics
- **DNS:** https://dash.cloudflare.com/0e75bef8e8dab2a320711e525e4c8a01/dns
- **SSL/TLS:** https://dash.cloudflare.com/0e75bef8e8dab2a320711e525e4c8a01/ssl-tls
- **Caching:** https://dash.cloudflare.com/0e75bef8e8dab2a320711e525e4c8a01/caching

### Purge Cache
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/0e75bef8e8dab2a320711e525e4c8a01/purge_cache" \
  -H "Authorization: Bearer cfut_ZztbZbxpnMznOX0Ium0KOF2zLrKL2bWgqFX4tLBObf8606ee" \
  -H "Content-Type: application/json" \
  --data '{"purge_everything":true}'
```

### Check DNS Resolution
```bash
# Test DNS resolution
dig app.sauvia.qzz.io
dig api.sauvia.qzz.io

# Test HTTPS
curl -I https://app.sauvia.qzz.io
curl -I https://api.sauvia.qzz.io
```

## 🔧 Advanced Configuration (Optional)

### 1. Create Custom Cache Rules

In Cloudflare Dashboard → Caching → Cache Rules:

**Rule 1: Cache Static Assets**
```
Field: URI Path
Operator: contains
Value: /static/ or /_next/static/

Then: Cache Level → Cache Everything
Edge TTL: 30 days
Browser TTL: 30 days
```

**Rule 2: Bypass Cache for API**
```
Field: Hostname
Operator: equals
Value: api.sauvia.qzz.io

Then: Cache Level → Bypass
```

### 2. Set Up WAF Rules

In Cloudflare Dashboard → Security → WAF:

**Recommended Rules:**
- Block known bad IPs
- Rate limiting for `/api/*` (100 req/10s)
- Block SQL injection attempts
- Block XSS attempts

### 3. Configure Load Balancing (Production)

When ready for production:

```bash
# Create health checks
curl -X POST "https://api.cloudflare.com/client/v4/accounts/1261bfa2ba2fad9e536ab2868c6817d4/load_balancers/monitors" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "type": "https",
    "description": "Health check for web app",
    "path": "/health",
    "port": 443,
    "interval": 60,
    "expected_codes": "200",
    "expected_body": "",
    "timeout": 5
  }'
```

### 4. Set Up Workers (Edge Computing)

For advanced use cases like:
- A/B testing
- Geo-based routing
- Custom authentication
- Request/response transformation

```bash
# Example: Redirect www to app
curl -X PUT "https://api.cloudflare.com/client/v4/zones/0e75bef8e8dab2a320711e525e4c8a01/workers/routes" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "pattern": "www.sauvia.qzz.io/*",
    "script": "redirect-worker"
  }'
```

## 📈 Monitoring & Analytics

### Cloudflare Analytics
```bash
# Get zone analytics
curl -s "https://api.cloudflare.com/client/v4/zones/0e75bef8e8dab2a320711e525e4c8a01/analytics/dashboard" \
  -H "Authorization: Bearer $CF_TOKEN" | jq .
```

### View Real-time Logs
Enable Cloudflare Logpush to send logs to AWS S3:
```bash
curl -X POST "https://api.cloudflare.com/client/v4/zones/0e75bef8e8dab2a320711e525e4c8a01/logpush/jobs" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{
    "name": "sauvia-logs",
    "logpull_options": "fields=ClientIP,ClientRequestHost,ClientRequestMethod,EdgeResponseStatus&timestamps=rfc3339",
    "destination_conf": "s3://sauvia-logs-staging?region=us-east-1",
    "dataset": "http_requests",
    "enabled": true
  }'
```

## 🎯 CI/CD Integration

Your GitHub Actions now automatically:
1. ✅ Build Next.js, FastAPI, and Expo
2. ✅ Push Docker images to ECR
3. ✅ Deploy to ECS
4. ✅ Cloudflare automatically caches new content

**No additional Cloudflare configuration needed in CI/CD** - DNS records already point to ALB, which updates automatically when ECS deploys.

## 💰 Cost Breakdown

### Cloudflare (Free Plan)
- **CDN:** Unlimited bandwidth
- **SSL:** Free unlimited certificates
- **DDoS Protection:** Included
- **DNS:** Unlimited requests
- **Total:** $0/month

### AWS (Staging)
- **ECS Fargate:** ~$30-50/month
- **ALB:** ~$16/month
- **S3 + ECR:** ~$5-10/month
- **Total:** ~$50-80/month

## ⚠️ Important Notes

1. **DNS Propagation:** Changes may take up to 5 minutes (Cloudflare proxy)
2. **Cache Purging:** Purge cache if updates don't appear immediately
3. **SSL Certificates:** Auto-managed by Cloudflare, no manual renewal needed
4. **ALB Access:** Direct ALB access still works, but use Cloudflare domains for CDN benefits

## 🚀 Next Steps

1. **Deploy Apps:** Run `./scripts/complete-deploy.sh`
2. **Test HTTPS:** Visit `https://app.sauvia.qzz.io`
3. **Monitor:** Check Cloudflare Analytics dashboard
4. **Optimize:** Configure custom cache rules as needed

---

**Setup Date:** April 9, 2026
**Zone ID:** `0e75bef8e8dab2a320711e525e4c8a01`
**Domain:** `sauvia.qzz.io`
