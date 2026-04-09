# 🎉 AWS Infrastructure Created Successfully!

## 📋 Infrastructure Summary (Staging Environment)

### ✅ Created Resources

**ECR Repositories:**
- `sauvia-web`: `026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-web`
- `sauvia-backend`: `026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-backend`
- `sauvia-mobile`: `026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-mobile`

**ECS Clusters:**
- `sauvia-web-cluster-staging` (Fargate + Fargate Spot)
- `sauvia-backend-cluster-staging` (Fargate + Fargate Spot)

**Load Balancer:**
- **Name:** `sauvia-alb-staging`
- **DNS:** `sauvia-alb-staging-1537611357.us-east-1.elb.amazonaws.com`
- **ARN:** `arn:aws:elasticloadbalancing:us-east-1:026544697783:loadbalancer/app/sauvia-alb-staging/039315b947f26722`

**Security Groups:**
- **ALB SG:** `sg-0df0281ebba2e70b8` (HTTP/HTTPS)
- **Web ECS SG:** `sg-0d4d68b7869915e05` (Port 3000 from ALB)
- **Backend ECS SG:** `sg-0a65f61ce27f78bb2` (Port 8000 from ALB)

**Target Groups:**
- **Web:** `sauvia-web-tg-staging` (Port 3000, HTTP)
- **Backend:** `sauvia-backend-tg-staging` (Port 8000, HTTP)

**S3 Buckets:**
- `sauvia-media-staging-us-east-1` (Media uploads)
- `sauvia-static-staging-us-east-1` (Static assets)

**IAM Roles:**
- **Role:** `sauvia-ecs-execution-role-staging`
- **ARN:** `arn:aws:iam::026544697783:role/sauvia-ecs-execution-role-staging`

**Secrets Manager:**
- `sauvia/database/staging` - Database credentials
- `sauvia/api-keys/staging` - API keys and secrets

**SSM Parameters:**
- `/sauvia/staging/NEXT_PUBLIC_API_URL` → `https://sauvia-alb-staging-1537611357.us-east-1.elb.amazonaws.com`

**CloudWatch Logs:**
- `/ecs/sauvia-web-staging`
- `/ecs/sauvia-backend-staging`

## 🔐 GitHub Secrets Required

Add these to your GitHub repository → Settings → Secrets → Actions:

```
AWS_ACCESS_KEY_ID=AKIAQMLRP6G3SHI2AOFI
AWS_SECRET_ACCESS_KEY=<your_secret_key>
AWS_REGION=us-east-1
AWS_ACCOUNT_ID=026544697783
EXPO_TOKEN=<get from expo.dev>
```

## 📝 Next Steps

### 1. **Create RDS Database** (Optional - Currently using external DB)

Run this if you want AWS-managed PostgreSQL:

```bash
# Create RDS security group
aws ec2 create-security-group \
  --group-name sauvia-rds-sg-staging \
  --description "RDS security group" \
  --vpc-id vpc-008dd58344144e978

# Allow PostgreSQL access from backend SG
aws ec2 authorize-security-group-ingress \
  --group-id <RDS_SG_ID> \
  --protocol tcp --port 5432 \
  --source-group sg-0a65f61ce27f78bb2

# Create RDS instance (takes ~10 mins)
aws rds create-db-instance \
  --db-instance-identifier sauvia-db-staging \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --master-username sauvia_admin \
  --master-user-password 'Sauvia2026!Staging' \
  --allocated-storage 20 \
  --vpc-security-group-ids <RDS_SG_ID> \
  --region us-east-1
```

### 2. **Update ECS Task Definitions**

Update `infra/ecs-web-task-definition.json` and `infra/ecs-backend-task-definition.json` with:
- Replace `ACCOUNT_ID` with `026544697783`
- Replace `REGION` with `us-east-1`
- Update secret ARNs from Secrets Manager

### 3. **Register ECS Task Definitions**

```bash
# Web
aws ecs register-task-definition \
  --cli-input-json file://infra/ecs-web-task-definition.json \
  --region us-east-1

# Backend
aws ecs register-task-definition \
  --cli-input-json file://infra/ecs-backend-task-definition.json \
  --region us-east-1
```

### 4. **Create ECS Services**

```bash
# Web Service
aws ecs create-service \
  --cluster sauvia-web-cluster-staging \
  --service-name sauvia-web-service \
  --task-definition sauvia-web-staging \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-05ce334c00ff95efd,subnet-0394953375b038f8f],securityGroups=[sg-0d4d68b7869915e05],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:026544697783:targetgroup/sauvia-web-tg-staging/379d5964caca77a2,containerName=sauvia-web,containerPort=3000" \
  --region us-east-1

# Backend Service
aws ecs create-service \
  --cluster sauvia-backend-cluster-staging \
  --service-name sauvia-backend-service \
  --task-definition sauvia-backend-staging \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-05ce334c00ff95efd,subnet-0394953375b038f8f],securityGroups=[sg-0a65f61ce27f78bb2],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:us-east-1:026544697783:targetgroup/sauvia-backend-tg-staging/099a41f346d38bfa,containerName=sauvia-backend,containerPort=8000" \
  --region us-east-1
```

### 5. **Add ALB Listener Rules**

```bash
# HTTP Listener for Web (Port 80 → 3000)
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:us-east-1:026544697783:loadbalancer/app/sauvia-alb-staging/039315b947f26722 \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:us-east-1:026544697783:targetgroup/sauvia-web-tg-staging/379d5964caca77a2

# API Listener (Port 8000 → Backend)
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:us-east-1:026544697783:loadbalancer/app/sauvia-alb-staging/039315b947f26722 \
  --protocol HTTP \
  --port 8000 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:us-east-1:026544697783:targetgroup/sauvia-backend-tg-staging/099a41f346d38bfa
```

### 6. **Build and Push Docker Images**

```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 026544697783.dkr.ecr.us-east-1.amazonaws.com

# Build Web
docker build -t 026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-web:latest -f Dockerfile.web .
docker push 026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-web:latest

# Build Backend
cd apps/backend
docker build -t 026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-backend:latest .
docker push 026544697783.dkr.ecr.us-east-1.amazonaws.com/sauvia-backend:latest
```

### 7. **Test Deployment**

Once services are running:
- **Web:** http://sauvia-alb-staging-1537611357.us-east-1.elb.amazonaws.com
- **Backend API:** http://sauvia-alb-staging-1537611357.us-east-1.elb.amazonaws.com:8000

## 💰 Cost Estimate (Staging)

- **ECS Fargate:** ~$0.04/hour per service (~$30/month)
- **ALB:** ~$0.0225/hour (~$16/month)
- **S3:** ~$0.023/GB/month
- **ECR:** $0.10/GB stored
- **Total:** ~$50-80/month for staging

## 🚀 CI/CD Pipeline

Your GitHub Actions will now:
1. ✅ On push to `main` → Deploy to staging
2. ✅ On push to `production` → Deploy to production
3. ✅ Build Next.js, FastAPI, and Expo automatically
4. ✅ Push Docker images to ECR
5. ✅ Update ECS services automatically

## ⚠️ Important Notes

1. **Rotate exposed credentials immediately**
2. Update Secrets Manager with real database credentials when RDS is created
3. Configure custom domain and SSL certificate for production
4. Set up Route53 DNS to point ALB to your domain

---

**Account ID:** 026544697783
**Region:** us-east-1
**VPC:** vpc-008dd58344144e978
