#!/bin/bash
# Deploy script for AWS ECS
# Usage: ./scripts/deploy-to-aws.sh [staging|production]

set -e

ENVIRONMENT="${1:-staging}"
AWS_REGION="${AWS_REGION:-us-east-1}"
PROJECT_NAME="sauvia"
ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
IMAGE_TAG="${GITHUB_SHA:-$(git rev-parse HEAD)}"

echo "🚀 Deploying to AWS ($ENVIRONMENT)..."
echo "📍 Region: $AWS_REGION"
echo "🏷️  Image Tag: $IMAGE_TAG"

# ==================== 1. Configure AWS ====================
echo "🔧 Configuring AWS credentials..."
aws configure set region "$AWS_REGION"

# ==================== 2. Login to ECR ====================
echo "🔑 Logging into ECR..."
aws ecr get-login-password --region "$AWS_REGION" | docker login --username AWS --password-stdin "$ECR_REGISTRY"

# ==================== 3. Build and Push Web App ====================
echo "📦 Building and pushing Web App..."
docker build -t "${ECR_REGISTRY}/${PROJECT_NAME}-web:${IMAGE_TAG}" -f Dockerfile.web .
docker tag "${ECR_REGISTRY}/${PROJECT_NAME}-web:${IMAGE_TAG}" "${ECR_REGISTRY}/${PROJECT_NAME}-web:latest"
docker push "${ECR_REGISTRY}/${PROJECT_NAME}-web:${IMAGE_TAG}"
docker push "${ECR_REGISTRY}/${PROJECT_NAME}-web:latest"

# ==================== 4. Build and Push Backend ====================
echo "📦 Building and pushing Backend..."
docker build -t "${ECR_REGISTRY}/${PROJECT_NAME}-backend:${IMAGE_TAG}" -f apps/backend/Dockerfile apps/backend/
docker tag "${ECR_REGISTRY}/${PROJECT_NAME}-backend:${IMAGE_TAG}" "${ECR_REGISTRY}/${PROJECT_NAME}-backend:latest"
docker push "${ECR_REGISTRY}/${PROJECT_NAME}-backend:${IMAGE_TAG}"
docker push "${ECR_REGISTRY}/${PROJECT_NAME}-backend:latest"

# ==================== 5. Update ECS Services ====================
echo "🔄 Updating ECS services..."

# Update Web service
aws ecs update-service \
  --cluster "${PROJECT_NAME}-web-cluster-${ENVIRONMENT}" \
  --service "${PROJECT_NAME}-web-service" \
  --force-new-deployment \
  --region "$AWS_REGION"

# Update Backend service
aws ecs update-service \
  --cluster "${PROJECT_NAME}-backend-cluster-${ENVIRONMENT}" \
  --service "${PROJECT_NAME}-backend-service" \
  --force-new-deployment \
  --region "$AWS_REGION"

# ==================== 6. Wait for Deployment ====================
echo "⏳ Waiting for services to stabilize..."
aws ecs wait services-stable \
  --cluster "${PROJECT_NAME}-web-cluster-${ENVIRONMENT}" \
  --services "${PROJECT_NAME}-web-service" \
  --region "$AWS_REGION"

aws ecs wait services-stable \
  --cluster "${PROJECT_NAME}-backend-cluster-${ENVIRONMENT}" \
  --services "${PROJECT_NAME}-backend-service" \
  --region "$AWS_REGION"

# ==================== 7. Run Database Migrations ====================
echo "🗄️ Running database migrations..."
aws ecs run-task \
  --cluster "${PROJECT_NAME}-backend-cluster-${ENVIRONMENT}" \
  --task-definition "${PROJECT_NAME}-db-migrations" \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[${SUBNET_IDS}],securityGroups=[${SG_IDS}]}" \
  --region "$AWS_REGION" || echo "Migration task not configured yet"

# ==================== 8. Verify Deployment ====================
echo "✅ Deployment complete!"
echo ""
echo "📊 Service Status:"
aws ecs describe-services \
  --cluster "${PROJECT_NAME}-web-cluster-${ENVIRONMENT}" \
  --services "${PROJECT_NAME}-web-service" \
  --query 'services[0].[serviceName,status,runningCount,desiredCount]' \
  --output table \
  --region "$AWS_REGION"

aws ecs describe-services \
  --cluster "${PROJECT_NAME}-backend-cluster-${ENVIRONMENT}" \
  --services "${PROJECT_NAME}-backend-service" \
  --query 'services[0].[serviceName,status,runningCount,desiredCount]' \
  --output table \
  --region "$AWS_REGION"

echo ""
echo "🎉 Deployment to $ENVIRONMENT completed successfully!"
