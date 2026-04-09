#!/bin/bash
# AWS Infrastructure Setup Script
# This script sets up the complete AWS infrastructure for Sauvia App

set -e

echo "🚀 Setting up AWS Infrastructure for Sauvia App..."

# Configuration
AWS_REGION="${AWS_REGION:-us-east-1}"
PROJECT_NAME="sauvia"
ENVIRONMENT="${1:-staging}" # staging or production

echo "📍 Region: $AWS_REGION"
echo "🌍 Environment: $ENVIRONMENT"

# ==================== 1. ECR Repositories ====================
echo "📦 Creating ECR repositories..."

for repo in sauvia-web sauvia-backend sauvia-mobile; do
  aws ecr create-repository \
    --repository-name "$repo" \
    --region "$AWS_REGION" \
    --image-scanning-configuration scanOnPush=true \
    --query 'repository.repositoryUri' \
    --output text || echo "Repository $repo already exists"
done

# ==================== 2. ECS Clusters ====================
echo "🐳 Creating ECS clusters..."

for cluster in sauvia-web sauvia-backend; do
  aws ecs create-cluster \
    --cluster-name "${cluster}-cluster-${ENVIRONMENT}" \
    --capacity-providers FARGATE FARGATE_SPOT \
    --region "$AWS_REGION" \
    --query 'cluster.clusterName' \
    --output text || echo "Cluster ${cluster}-cluster-${ENVIRONMENT} already exists"
done

# ==================== 3. RDS Database (PostgreSQL) ====================
echo "🗄️ Setting up RDS database..."

# Create security group for RDS
RDS_SG=$(aws ec2 create-security-group \
  --group-name "${PROJECT_NAME}-rds-sg-${ENVIRONMENT}" \
  --description "Security group for RDS ${ENVIRONMENT}" \
  --vpc-id "$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)" \
  --region "$AWS_REGION" \
  --query 'GroupId' \
  --output text)

echo "RDS Security Group: $RDS_SG"

# Create RDS subnet group
aws rds create-db-subnet-group \
  --db-subnet-group-name "${PROJECT_NAME}-subnet-group-${ENVIRONMENT}" \
  --db-subnet-group-description "Subnet group for ${PROJECT_NAME} ${ENVIRONMENT}" \
  --subnet-ids "$(aws ec2 describe-subnets --filters "Name=default-for-az,Values=true" --query 'Subnets[*].SubnetId' --output text)" \
  --region "$AWS_REGION" || echo "DB subnet group already exists"

# Create RDS instance (commented out - uncomment to provision)
# aws rds create-db-instance \
#   --db-instance-identifier "${PROJECT_NAME}-db-${ENVIRONMENT}" \
#   --db-instance-class db.t3.micro \
#   --engine postgres \
#   --master-username sauvia_admin \
#   --master-user-password "$(aws secretsmanager get-random-password --password-length 32 --query 'RandomPassword' --output text)" \
#   --allocated-storage 20 \
#   --db-subnet-group-name "${PROJECT_NAME}-subnet-group-${ENVIRONMENT}" \
#   --vpc-security-group-ids "$RDS_SG" \
#   --region "$AWS_REGION"

# ==================== 4. ElastiCache (Redis) ====================
echo "🔴 Setting up ElastiCache (Redis)..."

# Create security group for Redis
REDIS_SG=$(aws ec2 create-security-group \
  --group-name "${PROJECT_NAME}-redis-sg-${ENVIRONMENT}" \
  --description "Security group for ElastiCache ${ENVIRONMENT}" \
  --vpc-id "$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)" \
  --region "$AWS_REGION" \
  --query 'GroupId' \
  --output text)

echo "Redis Security Group: $REDIS_SG"

# Create Redis cluster (commented out - uncomment to provision)
# aws elasticache create-cache-cluster \
#   --cache-cluster-id "${PROJECT_NAME}-redis-${ENVIRONMENT}" \
#   --engine redis \
#   --cache-node-type cache.t3.micro \
#   --num-cache-nodes 1 \
#   --security-group-ids "$REDIS_SG" \
#   --region "$AWS_REGION"

# ==================== 5. S3 Buckets ====================
echo "📁 Creating S3 buckets..."

# Media storage bucket
MEDIA_BUCKET="${PROJECT_NAME}-media-${ENVIRONMENT}-${AWS_REGION}"
aws s3api create-bucket \
  --bucket "$MEDIA_BUCKET" \
  --region "$AWS_REGION" \
  --create-bucket-configuration LocationConstraint="$AWS_REGION" || echo "Bucket $MEDIA_BUCKET already exists"

# Static assets bucket
STATIC_BUCKET="${PROJECT_NAME}-static-${ENVIRONMENT}-${AWS_REGION}"
aws s3api create-bucket \
  --bucket "$STATIC_BUCKET" \
  --region "$AWS_REGION" \
  --create-bucket-configuration LocationConstraint="$AWS_REGION" || echo "Bucket $STATIC_BUCKET already exists"

# Enable versioning
aws s3api put-bucket-versioning \
  --bucket "$MEDIA_BUCKET" \
  --versioning-configuration Status=Enabled

aws s3api put-bucket-versioning \
  --bucket "$STATIC_BUCKET" \
  --versioning-configuration Status=Enabled

# ==================== 6. CloudWatch Log Groups ====================
echo "📊 Setting up CloudWatch logging..."

for service in web backend mobile; do
  aws logs create-log-group \
    --log-group-name "/ecs/${PROJECT_NAME}-${service}-${ENVIRONMENT}" \
    --region "$AWS_REGION" || echo "Log group for ${service} already exists"
done

# ==================== 7. IAM Roles ====================
echo "🔐 Setting up IAM roles..."

# Create ECS execution role
ECS_EXEC_ROLE_ARN=$(aws iam create-role \
  --role-name "${PROJECT_NAME}-ecs-execution-role-${ENVIRONMENT}" \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "ecs-tasks.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }' \
  --query 'Role.Arn' \
  --output text 2>/dev/null || aws iam get-role \
    --role-name "${PROJECT_NAME}-ecs-execution-role-${ENVIRONMENT}" \
    --query 'Role.Arn' \
    --output text)

echo "ECS Execution Role: $ECS_EXEC_ROLE_ARN"

# Attach policies
aws iam attach-role-policy \
  --role-name "${PROJECT_NAME}-ecs-execution-role-${ENVIRONMENT}" \
  --policy-arn "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"

aws iam attach-role-policy \
  --role-name "${PROJECT_NAME}-ecs-execution-role-${ENVIRONMENT}" \
  --policy-arn "arn:aws:iam::aws:policy/AmazonEC2ContainerRegistryReadOnly"

# ==================== 8. Application Load Balancer ====================
echo "⚖️ Setting up Application Load Balancer..."

# Create ALB
ALB_ARN=$(aws elbv2 create-load-balancer \
  --name "${PROJECT_NAME}-alb-${ENVIRONMENT}" \
  --subnets $(aws ec2 describe-subnets --filters "Name=default-for-az,Values=true" --query 'Subnets[*].SubnetId' --output text) \
  --security-groups $(aws ec2 create-security-group \
    --group-name "${PROJECT_NAME}-alb-sg-${ENVIRONMENT}" \
    --description "Security group for ALB ${ENVIRONMENT}" \
    --vpc-id "$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)" \
    --region "$AWS_REGION" \
    --query 'GroupId' \
    --output text) \
  --scheme internet-facing \
  --type application \
  --region "$AWS_REGION" \
  --query 'LoadBalancers[0].LoadBalancerArn' \
  --output text 2>/dev/null || echo "ALB already exists")

echo "ALB ARN: $ALB_ARN"

# Create target groups
aws elbv2 create-target-group \
  --name "${PROJECT_NAME}-web-tg-${ENVIRONMENT}" \
  --protocol HTTP \
  --port 3000 \
  --vpc-id "$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)" \
  --region "$AWS_REGION" || echo "Web target group already exists"

aws elbv2 create-target-group \
  --name "${PROJECT_NAME}-backend-tg-${ENVIRONMENT}" \
  --protocol HTTP \
  --port 8000 \
  --vpc-id "$(aws ec2 describe-vpcs --filters "Name=isDefault,Values=true" --query 'Vpcs[0].VpcId' --output text)" \
  --region "$AWS_REGION" || echo "Backend target group already exists"

# ==================== 9. Secrets Manager ====================
echo "🔑 Setting up Secrets Manager..."

# Create secrets for database credentials
aws secretsmanager create-secret \
  --name "${PROJECT_NAME}/database/${ENVIRONMENT}" \
  --description "Database credentials for ${ENVIRONMENT}" \
  --secret-string "{\"username\":\"sauvia_admin\",\"password\":\"CHANGE_ME\"}" \
  --region "$AWS_REGION" || echo "Database secret already exists"

# Create secrets for API keys
aws secretsmanager create-secret \
  --name "${PROJECT_NAME}/api-keys/${ENVIRONMENT}" \
  --description "API keys for ${ENVIRONMENT}" \
  --secret-string "{}" \
  --region "$AWS_REGION" || echo "API keys secret already exists"

# ==================== 10. SSM Parameters ====================
echo "📝 Setting up SSM Parameters..."

aws ssm put-parameter \
  --name "/${PROJECT_NAME}/${ENVIRONMENT}/NEXT_PUBLIC_API_URL" \
  --value "https://${PROJECT_NAME}-backend-${ENVIRONMENT}.example.com" \
  --type String \
  --overwrite \
  --region "$AWS_REGION"

aws ssm put-parameter \
  --name "/${PROJECT_NAME}/${ENVIRONMENT}/DATABASE_URL" \
  --value "postgresql://sauvia_admin:CHANGE_ME@${PROJECT_NAME}-db-${ENVIRONMENT}.xxxxx.${AWS_REGION}.rds.amazonaws.com:5432/sauvia" \
  --type SecureString \
  --overwrite \
  --region "$AWS_REGION"

echo ""
echo "✅ AWS Infrastructure setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Update the CHANGE_ME values in Secrets Manager"
echo "2. Configure your CI/CD pipeline with the created resources"
echo "3. Run database migrations"
echo "4. Deploy your applications"
echo ""
echo "🔗 Important ARNs and IDs have been printed above - save them for your deployment scripts"
