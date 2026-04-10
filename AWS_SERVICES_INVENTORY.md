# 📋 AWS Services Inventory - Sauvia Project

**Account:** `026544697783`  
**Region:** `us-east-1` (US East - N. Virginia)  
**Last Updated:** April 10, 2026

---

## 🎯 Services Overview

### Summary
| Service | Resources | Status | Monthly Cost (Est.) |
|---------|-----------|--------|---------------------|
| **ECR** | 5 repositories | ✅ Active | ~$1-2 |
| **ECS** | 5 clusters | ✅ Active | ~$30-50 |
| **S3** | 5 buckets | ✅ Active | ~$3-5 |
| **ELBv2** | 3 load balancers | ✅ Active | ~$50-60 |
| **EC2** | Default VPC + Subnets | ✅ Active | Included |
| **RDS** | 1 database | ✅ Active | ~$15-20 |
| **IAM** | 3 roles | ✅ Active | Free |
| **Secrets Manager** | 2 secrets | ✅ Active | ~$1 |
| **SSM** | 1 parameter | ✅ Active | Free |
| **CloudWatch** | 2 log groups | ✅ Active | Free tier |
| **CodePipeline** | 1 pipeline | ⚠️ Legacy | ~$1 |
| **CodeBuild** | 1 project | ⚠️ Legacy | ~$5 |
| **Total** | | | **~$106-144/month** |

---

## 📦 1. Amazon ECR (Elastic Container Registry)

**Purpose:** Store Docker images for applications

| Repository | URI | Purpose |
|------------|-----|---------|
| `sauvia-web` | `026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-web` | Next.js frontend |
| `sauvia-backend` | `026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-backend` | FastAPI backend |
| `sauvia-mobile` | `026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-mobile` | Expo mobile app |
| `sauvia-app` | `026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-app` | Legacy app |
| `guardia-app` | `026544697783.dkr.ecr.us-east-1.amazonaws.com/guardia-app` | Guardia project |

**Features:**
- ✅ Image scanning on push enabled
- ✅ AES-256 encryption at rest
- ✅ Immutable tags (configurable)

---

## 🐳 2. Amazon ECS (Elastic Container Service)

**Purpose:** Run containerized applications with Fargate

### Clusters

| Cluster | Capacity Providers | Purpose | Status |
|---------|-------------------|---------|--------|
| `sauvia-web-cluster-staging` | FARGATE, FARGATE_SPOT | Web frontend staging | ✅ Active |
| `sauvia-backend-cluster-staging` | FARGATE, FARGATE_SPOT | Backend API staging | ✅ Active |
| `sauvia-prod` | EC2 | Production environment | ✅ Active |
| `sauvia-cluster` | EC2 | General purpose | ✅ Active |
| `guardia-cluster` | EC2 | Guardia project | ✅ Active |

### Capacity Providers
- **FARGATE:** On-demand (100% availability)
- **FARGATE_SPOT:** Spot instances (cost savings, may be interrupted)

**Note:** ECS services not yet created for staging clusters (pending deployment)

---

## 🪣 3. Amazon S3 (Simple Storage Service)

**Purpose:** Object storage for media, static assets, and artifacts

| Bucket | Purpose | Versioning |
|--------|---------|------------|
| `sauvia-media-staging-us-east-1` | Media uploads (images, files) | ✅ Enabled |
| `sauvia-static-staging-us-east-1` | Static assets (JS, CSS, fonts) | ✅ Enabled |
| `sauvia-codepipeline-artifacts` | CI/CD build artifacts | - |
| `sauvia-perfis-imagens` | User profile images | - |
| `sauvia-prontuarios-pdf` | Medical records PDFs | - |

**Total Storage:** ~$0.023/GB/month

---

## ⚖️ 4. Elastic Load Balancing (ALB)

**Purpose:** Distribute traffic across ECS tasks

| Load Balancer | DNS Name | State | Type |
|---------------|----------|-------|------|
| `sauvia-alb-staging` | `sauvia-alb-staging-1537611357.us-east-1.elb.amazonaws.com` | ✅ Active | Application |
| `sauvia-alb` | `sauvia-alb-562871082.us-east-1.elb.amazonaws.com` | ✅ Active | Application |
| `guardia-alb` | `guardia-alb-1653604039.us-east-1.elb.amazonaws.com` | ✅ Active | Application |

### Target Groups

| Target Group | Protocol | Port | Purpose |
|--------------|----------|------|---------|
| `sauvia-web-tg-staging` | HTTP | 3000 | Next.js web app |
| `sauvia-backend-tg-staging` | HTTP | 8000 | FastAPI backend |
| `sauvia-nextjs` | HTTP | 3000 | Legacy Next.js |
| `sauvia-evolute` | HTTP | 8081 | Evolute WhatsApp |
| `sauvia-n8n` | HTTP | 5678 | N8N automation |
| `guardia-tg` | HTTP | 3000 | Guardia web |

---

## 🖥️ 5. Amazon VPC (Virtual Private Cloud)

**Purpose:** Isolated network for AWS resources

### Configuration
- **VPC ID:** `vpc-008dd58344144e978`
- **CIDR:** `172.31.0.0/16`
- **State:** Available

### Subnets (6 AZs)

| Subnet ID | Availability Zone | CIDR Block |
|-----------|-------------------|------------|
| `subnet-05ce334c00ff95efd` | us-east-1a | 172.31.0.0/20 |
| `subnet-0394953375b038f8f` | us-east-1d | 172.31.32.0/20 |
| `subnet-0d0be3ae1e996f0f9` | us-east-1f | 172.31.64.0/20 |
| `subnet-016ed53b0cc562c38` | us-east-1e | 172.31.48.0/20 |
| `subnet-0a2a69670b40359f7` | us-east-1c | 172.31.16.0/20 |
| `subnet-045c67ab2ad375c7b` | us-east-1b | 172.31.80.0/20 |

---

## 🗄️ 6. Amazon RDS (Relational Database Service)

**Purpose:** Managed PostgreSQL database

| Instance | Engine | Status |
|----------|--------|--------|
| `sauviadb` | PostgreSQL | ✅ Active |

**Details:**
- Engine: PostgreSQL
- Managed backups and updates
- Multi-AZ (if configured)
- Accessible via security group `sauvia-rds`

---

## 🔒 7. IAM (Identity and Access Management)

**Purpose:** Access control and permissions

### Roles

| Role | Purpose | Policies |
|------|---------|----------|
| `sauvia-ecs-execution-role-staging` | ECS task execution | ECSTaskExecutionRolePolicy, ECR ReadOnly |
| `codebuild-sauvia-role` | CodeBuild deployments | Build and push permissions |
| `codepipeline-sauvia-role` | CodePipeline orchestration | Pipeline execution permissions |

---

## 🔑 8. Secrets Manager

**Purpose:** Secure storage for sensitive credentials

| Secret | Description | Status |
|--------|-------------|--------|
| `sauvia/database/staging` | Database credentials for staging | ✅ Active |
| `sauvia/api-keys/staging` | API keys and secrets | ✅ Active |

**Stored in secrets:**
- Database username/password
- JWT secrets
- NextAuth secrets
- API keys

---

## 📝 9. SSM Parameter Store

**Purpose:** Configuration management

| Parameter | Type | Value |
|-----------|------|-------|
| `/sauvia/staging/NEXT_PUBLIC_API_URL` | String | `https://sauvia-alb-staging...` |

---

## 📊 10. CloudWatch

**Purpose:** Monitoring and logging

### Log Groups

| Log Group | Purpose |
|-----------|---------|
| `/ecs/sauvia-web-staging` | Web app container logs |
| `/ecs/sauvia-backend-staging` | Backend API container logs |

**Features:**
- Centralized logging
- Log retention (configurable)
- Integration with ECS

---

## 🚀 11. CodePipeline (Legacy)

**Purpose:** CI/CD pipeline (being replaced by GitHub Actions)

| Pipeline | Status |
|----------|--------|
| `sauvia-pipeline` | ⚠️ Consider migrating to GitHub Actions |

---

## 🔨 12. CodeBuild (Legacy)

**Purpose:** Build service (being replaced by GitHub Actions)

| Project | Status |
|---------|--------|
| `sauvia-build` | ⚠️ Consider migrating to GitHub Actions |

---

## 🛡️ 13. Security Groups

**Purpose:** Network security (firewall rules)

| Security Group | Description | Inbound Rules |
|----------------|-------------|---------------|
| `sauvia-alb-sg-staging` | ALB staging | HTTP (80), HTTPS (443) |
| `sauvia-web-sg-staging` | Web ECS staging | Port 3000 (from ALB) |
| `sauvia-backend-sg-staging` | Backend ECS staging | Port 8000 (from ALB) |
| `sauvia-rds` | RDS database | Port 5432 (from app SG) |
| `sauvia-ec2` | EC2 Docker | SSH, Docker ports |

---

## 🔌 External Integrations

### Cloudflare (Not AWS)
- **Zone:** `sauvia.qzz.io`
- **Zone ID:** `0e75bef8e8dab2a320711e525e4c8a01`
- **Purpose:** CDN, DNS, SSL/TLS, DDoS protection
- **Domains:**
  - `app.sauvia.qzz.io` → AWS ALB
  - `api.sauvia.qzz.io` → AWS ALB
  - `staging.sauvia.qzz.io` → AWS ALB

---

## 📊 Architecture Diagram

```
                    Cloudflare CDN
                         ↓
                ┌────────────────┐
                │   DNS/SSL/CDN  │
                │  app.sauvia    │
                │  api.sauvia    │
                │  staging.sauvia│
                └────────────────┘
                         ↓
                ┌────────────────┐
                │  AWS ALB       │
                │  (Load Balance)│
                └────────────────┘
                         ↓
        ┌────────────────────────────────┐
        │                                │
   ┌─────────┐                     ┌──────────┐
   │ Web ECS │                     │ Backend  │
   │ (Next.js│                     │  ECS     │
   │  :3000) │                     │ (:8000)  │
   └─────────┘                     └──────────┘
        │                                │
        └────────────┬───────────────────┘
                     ↓
              ┌────────────┐
              │  RDS       │
              │ PostgreSQL │
              └────────────┘
                     ↓
              ┌────────────┐
              │   S3       │
              │  (Media)   │
              └────────────┘
```

---

## 💰 Cost Optimization Recommendations

### Current Monthly Cost: ~$106-144

**Optimization Opportunities:**

1. **Use Fargate Spot** (Save 70% on compute)
   - Already configured as capacity provider
   - Update services to use Fargate Spot

2. **Consolidate Load Balancers**
   - Currently: 3 ALBs (~$50-60/month)
   - Recommendation: Use 1 ALB with path-based routing
   - Potential savings: ~$35/month

3. **Right-size ECS tasks**
   - Start with minimal CPU/memory
   - Scale based on actual usage

4. **Remove legacy resources**
   - CodePipeline and CodeBuild if using GitHub Actions
   - Unused ECR repositories
   - Potential savings: ~$6/month

5. **S3 Lifecycle Policies**
   - Auto-delete old versions
   - Move to Glacier for backups

### Optimized Cost (Potential): ~$50-70/month

---

## 🔧 Management Commands

### View All Resources
```bash
# ECR
aws ecr describe-repositories --region us-east-1

# ECS
aws ecs list-clusters --region us-east-1

# S3
aws s3 ls --region us-east-1

# ALB
aws elbv2 describe-load-balancers --region us-east-1

# RDS
aws rds describe-db-instances --region us-east-1

# Secrets
aws secretsmanager list-secrets --region us-east-1
```

### Monitor Costs
```bash
# View current billing
aws ce get-cost-and-usage \
  --time-period Start=$(date -d "1 month ago" +%Y-%m-01),End=$(date +%Y-%m-01) \
  --granularity MONTHLY \
  --metrics BlendedCost
```

---

## 📝 Notes

1. **Legacy Resources:** Some resources (`sauvia-app`, `guardia-*`, CodePipeline) may be from previous projects
2. **Migration Plan:** CodePipeline/CodeBuild being replaced with GitHub Actions
3. **Production Ready:** Staging environment is ready; production needs additional setup
4. **Cloudflare Integration:** External CDN handling DNS and SSL

---

**Document Maintained By:** DevOps Team  
**Next Review:** May 2026
