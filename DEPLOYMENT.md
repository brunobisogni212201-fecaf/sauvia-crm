# 🚀 Sauvia App - CI/CD & AWS Deployment Guide

This guide covers the complete CI/CD pipeline and AWS infrastructure setup for the Sauvia monorepo.

## 📁 Project Structure

```
sauvia-app/
├── apps/
│   ├── web/              # Next.js Frontend
│   ├── mobile/           # Expo Mobile App
│   └── backend/          # FastAPI Backend
├── packages/             # Shared packages
├── .github/workflows/    # CI/CD workflows
├── infra/                # Infrastructure configs
└── scripts/              # Deployment scripts
```

## 🌿 Branch Strategy

We use a **three-branch strategy**:

```
main (development)
  ↓ merge
staging (pre-production/testing)
  ↓ merge
production (live environment)
```

### Branch Purposes:

- **`main`**: Active development branch. Merges trigger staging deployments.
- **`staging`**: Pre-production environment. Used for final testing before release.
- **`production`**: Live production environment. Only stable, tested code.

### Workflow:

1. Developers create feature branches from `main`
2. PRs merge into `main` → triggers staging CI/CD
3. After testing, merge `main` → `staging` → triggers staging deployment
4. After staging validation, merge `staging` → `production` → triggers production deployment

## 🔄 CI/CD Pipelines

### 1. Staging Pipeline (`ci-staging.yml`)

**Triggers:** Push/PR to `staging` branch

**Jobs:**
- ✅ Test & lint all apps (web, backend, mobile)
- ✅ Build all applications
- ✅ Upload build artifacts

### 2. Production Pipeline (`ci-cd-production.yml`)

**Triggers:** Push to `production` or `main` branch

**Jobs:**
- ✅ Run comprehensive tests
- 🚀 Deploy Web (Next.js) to AWS ECS
- 🚀 Deploy Backend (FastAPI) to AWS ECS
- 📱 Build & Submit Mobile (Expo) via EAS
- 📊 Send deployment notifications

## ☁️ AWS Infrastructure Setup

### Prerequisites

```bash
# Install AWS CLI
brew install awscli

# Configure AWS credentials
aws configure
# Enter your:
# - AWS Access Key ID
# - AWS Secret Access Key
# - Region (e.g., us-east-1)
# - Output format (json)

# Verify configuration
aws sts get-caller-identity
```

### Step 1: Setup Infrastructure

Run the infrastructure setup script:

```bash
# For staging
chmod +x scripts/setup-aws-infra.sh
./scripts/setup-aws-infra.sh staging

# For production
./scripts/setup-aws-infra.sh production
```

**This creates:**
- 📦 ECR repositories (web, backend, mobile)
- 🐳 ECS clusters (Fargate)
- 🗄️ RDS PostgreSQL (optional)
- 🔴 ElastiCache Redis (optional)
- 📁 S3 buckets (media & static assets)
- 📊 CloudWatch log groups
- 🔐 IAM roles & policies
- ⚖️ Application Load Balancer
- 🔑 Secrets Manager entries
- 📝 SSM Parameter Store entries

### Step 2: Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions

**Add these secrets:**

```
# AWS Credentials
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-east-1
AWS_ACCOUNT_ID=123456789012

# Expo (for mobile deployment)
EXPO_TOKEN=your_expo_token
```

### Step 3: Deploy Applications

**Automated (via CI/CD):**
- Push to `main` → staging deployment
- Push to `production` → production deployment

**Manual deployment:**

```bash
# Make scripts executable
chmod +x scripts/*.sh

# Deploy to staging
./scripts/deploy-to-aws.sh staging

# Deploy to production
./scripts/deploy-to-aws.sh production
```

## 🐳 Docker Configuration

### Web App (Next.js)

```bash
# Build locally
docker build -t sauvia-web -f Dockerfile.web .

# Run locally
docker run -p 3000:3000 sauvia-web
```

### Backend (FastAPI)

```bash
# Build locally
docker build -t sauvia-backend apps/backend/

# Run locally
docker run -p 8000:8000 sauvia-backend
```

## 📱 Mobile App Deployment (Expo EAS)

### Setup EAS CLI

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS (run in apps/mobile)
cd apps/mobile
eas build:configure
```

### Build & Submit

```bash
# Build for Android & iOS
eas build --platform all

# Submit to app stores
eas submit --platform all

# Build & auto-submit
eas build --platform all --auto-submit
```

### CI/CD Integration

The production workflow automatically:
1. Builds the mobile app with EAS
2. Submits to Google Play & App Store
3. Requires `EXPO_TOKEN` secret in GitHub

## 🗄️ Database Management

### Run Migrations

```bash
# Connect to RDS instance
psql -h your-rds-endpoint.region.rds.amazonaws.com -U sauvia_admin -d sauvia

# Run Alembic migrations (backend)
cd apps/backend
alembic upgrade head

# Create new migration
alembic revision --autogenerate -m "description"
```

### Backup & Restore

```bash
# Backup database
pg_dump -h your-rds-endpoint.region.rds.amazonaws.com -U sauvia_admin sauvia > backup.sql

# Restore database
psql -h your-rds-endpoint.region.rds.amazonaws.com -U sauvia_admin sauvia < backup.sql
```

## 🔐 Security Best Practices

### Secrets Management

- All secrets stored in **AWS Secrets Manager**
- Database credentials rotated automatically
- API keys stored in SSM Parameter Store
- Never commit `.env` files

### IAM Policies

- Least privilege access for ECS tasks
- Separate roles for web and backend
- ECR read-only for task execution roles

### Network Security

- Security groups restrict access
- RDS only accessible from backend SG
- Redis only accessible from backend SG
- ALB handles SSL termination

## 📊 Monitoring & Logging

### CloudWatch Logs

```bash
# View web app logs
aws logs tail /ecs/sauvia-web-staging --follow

# View backend logs
aws logs tail /ecs/sauvia-backend-staging --follow
```

### CloudWatch Alarms

Set up alarms for:
- High CPU utilization (>80%)
- High memory utilization (>85%)
- Task failures
- High response times (>2s)

### Health Checks

- **Web:** `http://your-domain.com/health`
- **Backend:** `http://your-api-domain.com/health`

## 🚨 Troubleshooting

### Deployment Fails

1. Check GitHub Actions logs
2. Verify AWS credentials are valid
3. Ensure ECR repositories exist
4. Check ECS service events:
   ```bash
   aws ecs describe-services \
     --cluster sauvia-web-cluster-staging \
     --services sauvia-web-service
   ```

### Container Crashes

1. Check CloudWatch logs
2. Verify environment variables
3. Check task definition memory/CPU limits
4. Review health check configuration

### Database Connection Issues

1. Verify security group rules
2. Check RDS endpoint in environment variables
3. Ensure credentials are correct in Secrets Manager
4. Test connection from ECS task

## 🎯 Next Steps

1. ✅ Infrastructure setup complete
2. ⏳ Configure custom domain & SSL certificates
3. ⏳ Set up CDN (CloudFront) for static assets
4. ⏳ Configure auto-scaling policies
5. ⏳ Set up blue/green deployments
6. ⏳ Add comprehensive monitoring dashboards

## 📞 Support

For issues or questions:
- Check GitHub Actions logs
- Review CloudWatch logs
- Verify AWS resource configurations
- Contact dev team

---

**Last Updated:** April 2026
**Maintained by:** Sauvia Dev Team
