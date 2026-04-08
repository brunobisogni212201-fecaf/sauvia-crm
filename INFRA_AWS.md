# AWS Infrastructure Setup - Sauvia CRM

## Visão Geral
Este documento contém os passos para criar a infraestrutura AWS necessária para o Sauvia CRM.

## Pré-requisitos
- AWS CLI configurado (`aws configure`)
- Domínio registrado (dev.sauvia.com.br)

---

## 1. Criar VPC e Recursos de Rede

```bash
# Criar VPC
aws ec2 create-vpc --cidr-block 10.0.0.0/16 --tag-specifications "ResourceType=vpc,Tags=[{Key=Name,Value=sauvia-vpc}]"

# Anote o VpcId retornado (ex: vpc-xxxxx)

# Criar subnets
aws ec2 create-subnet --vpc-id vpc-xxxxx --cidr-block 10.0.1.0/24 --availability-zone us-east-1a --tag-specifications "ResourceType=subnet,Tags=[{Key=Name,Value=sauvia-subnet-public-1a}]"
aws ec2 create-subnet --vpc-id vpc-xxxxx --cidr-block 10.0.2.0/24 --availability-zone us-east-1b --tag-specifications "ResourceType=subnet,Tags=[{Key=Name,Value=sauvia-subnet-public-1b}]"
aws ec2 create-subnet --vpc-id vpc-xxxxx --cidr-block 10.0.10.0/24 --availability-zone us-east-1a --tag-specifications "ResourceType=subnet,Tags=[{Key=Name,Value=sauvia-subnet-private-1a}]"
aws ec2 create-subnet --vpc-id vpc-xxxxx --cidr-block 10.0.20.0/24 --availability-zone us-east-1b --tag-specifications "ResourceType=subnet,Tags=[{Key=Name,Value=sauvia-subnet-private-1b}]"

# Criar Internet Gateway
aws ec2 create-internet-gateway --tag-specifications "ResourceType=internet-gateway,Tags=[{Key=Name,Value=sauvia-igw}]"
aws ec2 attach-internet-gateway --vpc-id vpc-xxxxx --internet-gateway-id igw-xxxxx

# Criar Route Table para públicas
aws ec2 create-route-table --vpc-id vpc-xxxxx --tag-specifications "ResourceType=route-table,Tags=[{Key=Name,Value=sauvia-rt-public}]"
aws ec2 create-route --route-table-id rtb-xxxxx --destination-cidr-block 0.0.0.0/0 --gateway-id igw-xxxxx

# Associar subnets públicas
aws ec2 associate-route-table --subnet-id subnet-xxxxx-1a --route-table-id rtb-xxxxx
aws ec2 associate-route-table --subnet-id subnet-xxxxx-1b --route-table-id rtb-xxxxx
```

---

## 2. Criar Security Groups

```bash
# SG para EC2 (HTTP, HTTPS, SSH, Docker)
aws ec2 create-security-group --group-name sau via-ec2 --description "Security group for EC2" --vpc-id vpc-xxxxx

# Adicionar regras
aws ec2 authorize-security-group-ingress --group-id sg-xxxxx --protocol tcp --port 22 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-xxxxx --protocol tcp --port 80 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-xxxxx --protocol tcp --port 443 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-xxxxx --protocol tcp --port 8080 --cidr 0.0.0.0/0
aws ec2 authorize-security-group-ingress --group-id sg-xxxxx --protocol tcp --port 5678 --cidr 0.0.0.0/0

# SG para RDS
aws ec2 create-security-group --group-name sau via-rds --description "Security group for RDS" --vpc-id vpc-xxxxx
aws ec2 authorize-security-group-ingress --group-id sg-rds --protocol tcp --port 5432 --source-group sg-ec2
```

---

## 3. Criar RDS PostgreSQL

```bash
# Criar subnet group para RDS
aws rds create-db-subnet-group --db-subnet-group-name sau via-rds-subnet-group \
  --subnet-ids "subnet-xxxxx-private-1a subnet-xxxxx-private-1b" \
  --tags "Key=Name,Value=sauvia-rds-subnet-group"

# Criar RDS Instance
aws rds create-db-instance \
  --db-instance-identifier sau via-db \
  --db-instance-class db.t3.micro \
  --engine postgres \
  --engine-version "16.1" \
  --allocated-storage 20 \
  --storage-type gp3 \
  --master-username sau viauser \
  --master-user-password "SuaSenhaForte123!" \
  --db-name sau via \
  --vpc-security-group-ids sg-rds \
  --db-subnet-group-name sau via-rds-subnet-group \
  --backup-retention-period 7 \
  --delete-protected false \
  --publicly-accessible false \
  --tags "Key=Name,Value=sauvia-db"
```

---

## 4. Criar Cognito User Pool

```bash
# Criar User Pool
aws cognito-idp create-user-pool \
  --pool-name sau via-user-pool \
  --auto-verified-attributes email \
  --mfa-configuration OFF \
  --email-configuration EmailSendingAccount=DEVELOPER \
  --admin-create-user-config-unused-account-days-validity 7

# Anote o UserPoolId (ex: us-east-1_xxxxx)

# Criar App Client
aws cognito-idp create-user-pool-client \
  --user-pool-id us-east-1_xxxxx \
  --client-name sau via-web \
  --generate-secret \
  --allowed-o-auth-flows code \
  --allowed-o-auth-scopes email openid \
  --callback-urls "https://dev.sauvia.com.br/api/auth/callback/cognito" \
  --logout-urls "https://dev.sauvia.com.br"

# Anote o ClientId e ClientSecret
```

---

## 5. Configurar Route 53 (DNS)

```bash
# Criar hosted zone
aws route53 create-hosted-zone --name dev.sauvia.com.br --caller-reference "sauvia-$(date +%s)"

# Criar registros (substitua o HostedZoneId)
# A Record para负载均衡
aws route53 change-resource-record-sets --hosted-zone-id ZXXXXX --change-batch '{
  "Changes": [
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "dev.sauvia.com.br",
        "Type": "A",
        "TTL": 300,
        "ResourceRecords": [{"Value": "ec2-ip-publico"}]
      }
    },
    {
      "Action": "CREATE",
      "ResourceRecordSet": {
        "Name": "n8n.dev.sauvia.com.br",
        "Type": "CNAME",
        "TTL": 300,
        "ResourceRecords": [{"Value": "dev.sauvia.com.br"}]
      }
    }
  ]
}'
```

---

## 6. Criar EC2 Instance

```bash
# Criar key pair (se não tiver)
aws ec2 create-key-pair --key-name sau via-key --key-type rsa

# Buscar AMI Amazon Linux 2023
aws ec2 describe-images --owners amazon \
  --filters "Name=name,Values=al2023-ami-2023*" \
  --query 'Images[0].ImageId'

# Criar instância
aws ec2 run-instances \
  --image-id ami-xxxxx \
  --instance-type t3.small \
  --key-name sau via-key \
  --security-group-ids sg-ec2 \
  --subnet-id subnet-xxxxx-public-1a \
  --user-data file://user-data.sh \
  --tag-specifications "ResourceType=instance,Tags=[{Key=Name,Value=sauvia-server}]"

# Anote o InstanceId e o PublicIP
```

Crie o arquivo `user-data.sh`:

```bash
#!/bin/bash
yum update -y
yum install -y docker docker-compose git

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.24.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Start Docker
systemctl start docker
systemctl enable docker

# Clone repository
cd /opt
git clone https://github.com/brunobisogni212201-fecaf/sauvia-crm.git
cd sau via-crm

# Create .env file
cat > .env << EOF
DATABASE_URL=postgresql://sauviauser:SenhaForte123@db-endpoint.rds.amazonaws.com:5432/sauvia
NEXTAUTH_SECRET=sua-chave-secreta-aqui
NEXTAUTH_URL=https://dev.sauvia.com.br
COGNITO_CLIENT_ID=seu-client-id
COGNITO_CLIENT_SECRET=seu-client-secret
COGNITO_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_xxxxx
AWS_REGION=us-east-1
N8N_USER=admin
N8N_PASSWORD=sua-senha-n8n
WEBHOOK_URL=https://dev.sauvia.com.br/webhook
EOF

# Create directory for app
mkdir -p /opt/sauvia
cp -r /opt/sauvia-crm/docker/* /opt/sauvia/
```

---

## 7. Configurar SES (Email)

```bash
# Verificar identidade
aws ses verify-email-identity --email-address noreply@dev.sauvia.com.br

# Você receberá um email de verificação

# Para produção, solicitar saída de sandbox
aws ses create-configuration-set --configuration-set-name sau via-config

# Criar rule para deliveries
aws ses create-receipt-rule-set --rule-set-name sau via-rules
```

---

## 8. Configurar Secrets no Systems Manager

```bash
# Criar parameter store para secrets
aws ssm put-parameter --name "/sauvia/prod/DATABASE_URL" \
  --value "postgresql://sauviauser:SenhaForte123@db-endpoint.rds.amazonaws.com:5432/sauvia" \
  --type SecureString

aws ssm put-parameter --name "/sauvia/prod/NEXTAUTH_SECRET" \
  --value "sua-chave-secreta-aqui" \
  --type SecureString
```

---

## Variáveis de Ambiente

Crie um arquivo `.env` no diretório do projeto:

```bash
# Database
DATABASE_URL=postgresql://sauviauser:SenhaForte123@db-endpoint.rds.amazonaws.com:5432/sauvia

# NextAuth
NEXTAUTH_SECRET=sua-chave-secreta-aqui-gerar-com-openssl-rand-base64-32
NEXTAUTH_URL=https://dev.sauvia.com.br

# AWS Cognito
COGNITO_CLIENT_ID=xxxxx
COGNITO_CLIENT_SECRET=xxxxx
COGNITO_REGION=us-east-1
COGNITO_USER_POOL_ID=us-east-1_xxxxx

# AWS SES
AWS_REGION=us-east-1
FROM_EMAIL=noreply@dev.sauvia.com.br

# n8n
N8N_USER=admin
N8N_PASSWORD=sua-senha-n8n
WEBHOOK_URL=https://dev.sauvia.com.br/webhook
N8N_HOST=n8n.dev.sauvia.com.br
```

---

## Próximos Passos

1. ✅ Criar VPC e subnets
2. ✅ Criar RDS PostgreSQL
3. ✅ Criar Cognito User Pool
4. ⏳ Configurar EC2 e deploy
5. ⏳ Configurar DNS e SSL
6. ⏳ Configurar n8n workflows

---

## Comandos Úteis

```bash
# Conectar ao EC2 via Session Manager
aws ssm start-session --target i-xxxxx

# Ver logs do Docker
docker logs sau via-app -f

# Ver status dos containers
docker ps

# Reiniciar aplicação
cd /opt/sauvia && docker-compose restart app
```