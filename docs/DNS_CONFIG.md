# ========================================

# SAUVIA CRM - DNS Configuration Script

# ========================================

# Zone: qzz.io (already configured)

# Zone ID: 0e75bef8e8dab2a320711e525e4c8a01

# Account ID: 1261bfa2ba2fad9e536ab2868c6817d4

# ========================================

# DNS RECORDS NEEDED FOR SAUVIA.QZZ.IO

# ========================================

# Frontend (Vercel) - A record pointing to Vercel

# @ -> A -> 76.76.21.21 (Vercel Anycast)

# Backend (Render) - CNAME or A record

# api -> CNAME -> [render-backend-url].onrender.com

# Mobile - CNAME for mobile app

# mobile -> CNAME -> exp.host or your EAS URL

# ========================================

# TLS/SSL

# ========================================

# Cloudflare will automatically provision free SSL

# Enable "Full (strict)" mode for production

# ========================================

# PAGE RULES (if needed)

# ========================================

# - Always Use HTTPS: ON

# - Automatic HTTPS Rewrites: ON

# - Brotli: ON

# - Security Level: Medium

# ========================================

# FIREWALL RULES

# ========================================

# - Block suspicious IPs

# - Rate limiting for API endpoints

# - Challenge bad bots

# ========================================

# Scripts para configuração

# ========================================

#!/bin/bash

# Criar registros DNS

CF_API_TOKEN="YOUR_TOKEN_HERE"
ZONE_ID="0e75bef8e8dab2a320711e525e4c8a01"

# Frontend - Vercel (A record)

curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
 -H "Authorization: Bearer $CF_API_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"type":"A","name":"sauvia","content":"76.76.21.21","ttl":1,"proxied":true}'

# Backend - Render (CNAME)

curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
 -H "Authorization: Bearer $CF_API_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"type":"CNAME","name":"api","content":"sauvia-backend.onrender.com","ttl":1,"proxied":true}'

# WWW redirect

curl -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
 -H "Authorization: Bearer $CF_API_TOKEN" \
 -H "Content-Type: application/json" \
 -d '{"type":"CNAME","name":"www","content":"sauvia.qzz.io","ttl":1,"proxied":true}'
