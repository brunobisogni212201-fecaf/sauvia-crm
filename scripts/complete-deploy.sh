#!/bin/bash
# Complete ECS Deployment Script
# This script registers task definitions and creates ECS services

set -e

AWS_REGION="us-east-1"
ACCOUNT_ID="026544697783"
ENVIRONMENT="staging"
VPC_ID="vpc-008dd58344144e978"
SUBNETS="subnet-05ce334c00ff95efd,subnet-0394953375b038f8f,subnet-0d0be3ae1e996f0f9"
ALB_ARN="arn:aws:elasticloadbalancing:us-east-1:026544697783:loadbalancer/app/sauvia-alb-staging/039315b947f26722"
WEB_TG_ARN="arn:aws:elasticloadbalancing:us-east-1:026544697783:targetgroup/sauvia-web-tg-staging/379d5964caca77a2"
BACKEND_TG_ARN="arn:aws:elasticloadbalancing:us-east-1:026544697783:targetgroup/sauvia-backend-tg-staging/099a41f346d38bfa"
WEB_SG="sg-0d4d68b7869915e05"
BACKEND_SG="sg-0a65f61ce27f78bb2"

echo "🚀 Deploying ECS Services ($ENVIRONMENT)..."

# ==================== 1. Login to ECR ====================
echo "🔑 Logging into ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com

# ==================== 2. Build and Push Docker Images ====================
echo "📦 Building Web App Docker image..."
docker build -t $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/sauvia-web:latest -f Dockerfile.web .
docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/sauvia-web:latest

echo "📦 Building Backend Docker image..."
cd apps/backend
docker build -t $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/sauvia-backend:latest .
docker push $ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/sauvia-backend:latest
cd ../..

# ==================== 3. Register Task Definitions ====================
echo "📝 Registering Web Task Definition..."
aws ecs register-task-definition \
  --cli-input-json file://infra/ecs-web-task-definition.json \
  --region $AWS_REGION

echo "📝 Registering Backend Task Definition..."
aws ecs register-task-definition \
  --cli-input-json file://infra/ecs-backend-task-definition.json \
  --region $AWS_REGION

# ==================== 4. Create ALB Listeners ====================
echo "⚖️ Creating ALB Listeners..."

# Web listener (port 80)
aws elbv2 create-listener \
  --load-balancer-arn $ALB_ARN \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=$WEB_TG_ARN \
  --region $AWS_REGION 2>/dev/null || echo "Web listener already exists"

# Backend listener (port 8000)
aws elbv2 create-listener \
  --load-balancer-arn $ALB_ARN \
  --protocol HTTP \
  --port 8000 \
  --default-actions Type=forward,TargetGroupArn=$BACKEND_TG_ARN \
  --region $AWS_REGION 2>/dev/null || echo "Backend listener already exists"

# ==================== 5. Create ECS Services ====================
echo "🐳 Creating Web ECS Service..."

aws ecs create-service \
  --cluster sauvia-web-cluster-$ENVIRONMENT \
  --service-name sauvia-web-service \
  --task-definition sauvia-web-staging \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNETS],securityGroups=[$WEB_SG],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=$WEB_TG_ARN,containerName=sauvia-web,containerPort=3000" \
  --region $AWS_REGION 2>/dev/null || echo "Web service already exists"

echo "🐳 Creating Backend ECS Service..."

aws ecs create-service \
  --cluster sauvia-backend-cluster-$ENVIRONMENT \
  --service-name sauvia-backend-service \
  --task-definition sauvia-backend-staging \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[$SUBNETS],securityGroups=[$BACKEND_SG],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=$BACKEND_TG_ARN,containerName=sauvia-backend,containerPort=8000" \
  --region $AWS_REGION 2>/dev/null || echo "Backend service already exists"

# ==================== 6. Wait for Services to Stabilize ====================
echo "⏳ Waiting for services to stabilize..."
sleep 30

# ==================== 7. Check Service Status ====================
echo "📊 Service Status:"

echo ""
echo "Web Service:"
aws ecs describe-services \
  --cluster sauvia-web-cluster-$ENVIRONMENT \
  --services sauvia-web-service \
  --query 'services[0].[serviceName,status,runningCount,desiredCount]' \
  --output table \
  --region $AWS_REGION

echo ""
echo "Backend Service:"
aws ecs describe-services \
  --cluster sauvia-backend-cluster-$ENVIRONMENT \
  --services sauvia-backend-service \
  --query 'services[0].[serviceName,status,runningCount,desiredCount]' \
  --output table \
  --region $AWS_REGION

# ==================== 8. Get ALB DNS ====================
echo ""
echo "✅ Deployment Complete!"
echo ""
echo "🌐 Access your applications:"
echo "   Web App: http://sauvia-alb-staging-1537611357.us-east-1.elb.amazonaws.com"
echo "   Backend API: http://sauvia-alb-staging-1537611357.us-east-1.elb.amazonaws.com:8000/docs"
echo ""
echo "📊 View logs:"
echo "   aws logs tail /ecs/sauvia-web-staging --follow"
echo "   aws logs tail /ecs/sauvia-backend-staging --follow"
