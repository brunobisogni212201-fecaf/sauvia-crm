#!/bin/bash

###############################################################################
#                                                                             #
#  DEPLOY PARA PRODUÇÃO - Clerk + MCP Integration                            #
#  Realiza deploy da web (Vercel) e backend (Docker)                         #
#                                                                             #
###############################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_header() {
    echo -e "\n${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║ $1${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}\n"
}

print_step() {
    echo -e "${YELLOW}→ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# ============================================================================
# ETAPA 1: Git Commit
# ============================================================================

stage_git_commit() {
    print_header "ETAPA 1: Git Commit"
    
    print_step "Revisando mudanças com git status..."
    git status --short | head -20
    echo ""
    
    read -p "Continuar com commit? (s/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        print_error "Deploy cancelado"
        exit 1
    fi
    
    print_step "Adicionando arquivos..."
    git add -A
    
    print_step "Criando commit..."
    git commit -m "feat: integrate Clerk auth and MCP server, remove Cognito"
    
    print_step "Push para repository..."
    git push origin main
    
    print_success "Git commit e push completados"
}

# ============================================================================
# ETAPA 2: Deploy Web (Vercel)
# ============================================================================

stage_deploy_web() {
    print_header "ETAPA 2: Deploy Web (Vercel)"
    
    print_info "Você precisa ter Vercel CLI instalado"
    print_info "Instale com: npm i -g vercel"
    echo ""
    
    # Verificar se vercel está instalado
    if ! command -v vercel &> /dev/null; then
        print_error "Vercel CLI não encontrado"
        print_info "Instale com: npm i -g vercel"
        return
    fi
    
    print_step "Acessando diretório web..."
    cd apps/web
    
    print_step "Adicionando variáveis de ambiente no Vercel..."
    print_info "Complete cada uma quando solicitado:"
    
    vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || true
    vercel env add CLERK_SECRET_KEY || true
    vercel env add NEXT_PUBLIC_API_URL || true
    
    print_step "Deployando para produção..."
    vercel deploy --prod
    
    print_success "Web deployada com sucesso!"
    
    cd ../../
}

# ============================================================================
# ETAPA 3: Deploy Backend (Docker)
# ============================================================================

stage_deploy_backend() {
    print_header "ETAPA 3: Deploy Backend (Docker)"
    
    print_info "Você precisa de:"
    print_info "  1. Docker instalado"
    print_info "  2. ECR/Docker Registry configurado"
    print_info "  3. AWS CLI ou Docker credentials"
    echo ""
    
    # Verificar Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker não encontrado"
        print_info "Instale Docker em: https://docker.com/products/docker-desktop"
        return
    fi
    
    print_step "Acessando diretório backend..."
    cd apps/backend
    
    print_step "Buildando Docker image..."
    docker build -t sauvia-backend:latest .
    
    print_success "Docker image construída"
    
    print_info "Próximos passos manuais:"
    echo ""
    echo "1. Fazer tag da imagem:"
    echo "   docker tag sauvia-backend:latest YOUR_REGISTRY/sauvia-backend:latest"
    echo ""
    echo "2. Push para registry:"
    echo "   docker push YOUR_REGISTRY/sauvia-backend:latest"
    echo ""
    echo "3. Deploy no seu container service (ECS/Kubernetes/etc)"
    echo ""
    
    read -p "Você quer fazer push agora? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        read -p "Digite seu REGISTRY (ex: 123456789.dkr.ecr.us-east-1.amazonaws.com): " REGISTRY
        
        if [ -z "$REGISTRY" ]; then
            print_error "Registry não fornecido"
            cd ../../
            return
        fi
        
        print_step "Fazendo tag..."
        docker tag sauvia-backend:latest $REGISTRY/sauvia-backend:latest
        
        print_step "Push para registry..."
        docker push $REGISTRY/sauvia-backend:latest
        
        print_success "Backend image enviada com sucesso"
    fi
    
    cd ../../
}

# ============================================================================
# ETAPA 4: Limpeza
# ============================================================================

stage_cleanup() {
    print_header "ETAPA 4: Limpeza Pós-Deploy"
    
    print_step "Removendo arquivo .env local (segurança)..."
    rm -f apps/web/.env.local apps/backend/.env
    print_success ".env files removidos"
    
    print_info "Variáveis de ambiente devem estar em:"
    echo "  • Web: Vercel Environment Variables"
    echo "  • Backend: Container secrets / ECS / etc"
}

# ============================================================================
# RESUMO
# ============================================================================

print_summary() {
    print_header "✅ DEPLOY COMPLETO!"
    
    echo -e "${GREEN}"
    cat << "SUCCESS"
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                   🎉 DEPLOYMENT FINALIZADO 🎉                           ║
║                                                                           ║
║  Próximos passos:                                                         ║
║                                                                           ║
║  1. Aguardar 5-10 minutos para propagação DNS                           ║
║  2. Testar em produção:                                                  ║
║     curl https://api.sauvia.com.br/.well-known/oauth-*/               ║
║  3. Fazer login em https://app.sauvia.com.br                           ║
║  4. Conectar Claude Desktop ao MCP server                               ║
║     URL: https://app.sauvia.com.br/mcp/http                            ║
║                                                                           ║
║  Monitorar logs em:                                                      ║
║     • Vercel: https://vercel.com/dashboard                              ║
║     • Backend: CloudWatch / Docker logs / seu host                      ║
║                                                                           ║
║  Deletar Cognito (economize $50-100/mês):                               ║
║     AWS Console → Cognito → Delete User Pool                            ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
SUCCESS
    echo -e "${NC}"
}

# ============================================================================
# MAIN
# ============================================================================

main() {
    clear
    
    echo -e "${BLUE}"
    cat << "LOGO"
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║            🚀 DEPLOY PARA PRODUÇÃO - CLERK + MCP 🚀                     ║
║                                                                           ║
║                Realizando Deploy Automatizado                             ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
LOGO
    echo -e "${NC}"
    
    print_info "Este script vai fazer deploy para produção"
    print_info "Etapas:"
    echo "  1. Git commit & push"
    echo "  2. Deploy web (Vercel)"
    echo "  3. Deploy backend (Docker)"
    echo "  4. Limpeza e orientações finais"
    echo ""
    
    read -p "Continuar? (s/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Ss]$ ]]; then
        print_error "Deploy cancelado"
        exit 1
    fi
    
    # Executar estágios
    stage_git_commit
    stage_deploy_web
    stage_deploy_backend
    stage_cleanup
    
    # Resumo
    print_summary
}

# Run
main
