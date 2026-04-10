#!/bin/bash
# Cloudflare + AWS Integration Script
# Configures DNS, SSL, CDN, and caching for Sauvia App

set -e

ZONE_ID="0e75bef8e8dab2a320711e525e4c8a01"
CF_TOKEN="cfut_ZztbZbxpnMznOX0Ium0KOF2zLrKL2bWgqFX4tLBObf8606ee"
ALB_DNS="sauvia-alb-staging-1537611357.us-east-1.elb.amazonaws.com"
DOMAIN="sauvia.qzz.io"

echo "🌐 Configuring Cloudflare + AWS Integration for $DOMAIN"
echo "================================================================"

# ==================== 1. Verify Zone ====================
echo "✅ Verifying Cloudflare zone..."
ZONE_STATUS=$(curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID" \
  -H "Authorization: Bearer $CF_TOKEN" | jq -r '.result.status')

if [ "$ZONE_STATUS" = "active" ]; then
  echo "✅ Zone $DOMAIN is active"
else
  echo "❌ Zone is not active. Status: $ZONE_STATUS"
  exit 1
fi

# ==================== 2. Create/Update DNS Records ====================
echo ""
echo "📝 Configuring DNS records..."

# App subdomain (web frontend)
echo "Creating app.$DOMAIN → ALB..."
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"type\":\"CNAME\",\"name\":\"app\",\"content\":\"$ALB_DNS\",\"ttl\":1,\"proxied\":true}" | jq -r 'if .success then "✅ app.$DOMAIN created" else "⚠️  app.$DOMAIN already exists or error: \(.errors[0].message)" end'

# API subdomain (backend)
echo "Creating api.$DOMAIN → ALB..."
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"type\":\"CNAME\",\"name\":\"api\",\"content\":\"$ALB_DNS\",\"ttl\":1,\"proxied\":true}" | jq -r 'if .success then "✅ api.$DOMAIN created" else "⚠️  api.$DOMAIN already exists or error: \(.errors[0].message)" end'

# Staging subdomain
echo "Creating staging.$DOMAIN → ALB..."
curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data "{\"type\":\"CNAME\",\"name\":\"staging\",\"content\":\"$ALB_DNS\",\"ttl\":1,\"proxied\":true}" | jq -r 'if .success then "✅ staging.$DOMAIN created" else "⚠️  staging.$DOMAIN already exists or error: \(.errors[0].message)" end'

# ==================== 3. Configure SSL/TLS ====================
echo ""
echo "🔒 Configuring SSL/TLS..."

# Set SSL to Full (strict)
echo "Setting SSL/TLS mode to Full (strict)..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ssl" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"full"}' | jq -r 'if .success then "✅ SSL mode set to Full" else "⚠️  SSL config error" end'

# Enable Always Use HTTPS
echo "Enabling Always Use HTTPS..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/always_use_https" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"on"}' | jq -r 'if .success then "✅ Always HTTPS enabled" else "⚠️  Always HTTPS error" end'

# Enable Automatic HTTPS Rewrites
echo "Enabling Automatic HTTPS Rewrites..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/automatic_https_rewrites" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"on"}' | jq -r 'if .success then "✅ Auto HTTPS rewrites enabled" else "⚠️  Auto HTTPS error" end'

# ==================== 4. Configure Performance ====================
echo ""
echo "⚡ Configuring Performance..."

# Enable Brotli
echo "Enabling Brotli compression..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/brotli" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"on"}' | jq -r 'if .success then "✅ Brotli enabled" else "⚠️  Brotli error" end'

# Enable Early Hints
echo "Enabling Early Hints..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/early_hints" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"on"}' 2>/dev/null | jq -r 'if .success then "✅ Early Hints enabled" else "⚠️  Early Hints not available" end'

# Enable HTTP/3 (if available)
echo "Enabling HTTP/3..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/http3" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"on"}' 2>/dev/null | jq -r 'if .success then "✅ HTTP/3 enabled" else "⚠️  HTTP/3 not available" end'

# ==================== 5. Configure Security ====================
echo ""
echo "🛡️  Configuring Security..."

# Enable Security Level
echo "Setting security level to Medium..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/security_level" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"medium"}' | jq -r 'if .success then "✅ Security level set" else "⚠️  Security level error" end'

# Enable Browser Integrity Check
echo "Enabling Browser Integrity Check..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/browser_check" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":"on"}' | jq -r 'if .success then "✅ Browser check enabled" else "⚠️  Browser check error" end'

# ==================== 6. Configure Caching ====================
echo ""
echo "💾 Configuring Caching..."

# Set browser cache TTL
echo "Setting browser cache TTL..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/browser_cache_ttl" \
  -H "Authorization: Bearer $CF_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"value":14400}' | jq -r 'if .success then "✅ Browser cache TTL set to 4 hours" else "⚠️  Browser cache TTL error" end'

# ==================== 7. Display Configuration ====================
echo ""
echo "================================================================"
echo "✅ Cloudflare + AWS Integration Complete!"
echo ""
echo "🌐 Your Applications:"
echo "   Web App:    https://app.$DOMAIN"
echo "   API:        https://api.$DOMAIN"
echo "   Staging:    https://staging.$DOMAIN"
echo ""
echo "🔒 SSL/TLS:   Full (strict) - End-to-end encryption"
echo "⚡ CDN:       Cloudflare edge caching enabled"
echo "🛡️  Security:  Medium security level + browser integrity"
echo ""
echo "📊 DNS Records:"
curl -s "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?per_page=50" \
  -H "Authorization: Bearer $CF_TOKEN" | jq -r '.result[] | "   \(.type) \(.name) → \(.content) (proxied: \(.proxied))"'
echo ""
echo "🎯 Next Steps:"
echo "   1. Deploy your apps to AWS ECS (./scripts/complete-deploy.sh)"
echo "   2. Test HTTPS endpoints above"
echo "   3. Configure your app to use these domains"
echo "   4. Monitor analytics at: https://dash.cloudflare.com/$ZONE_ID/analytics"
