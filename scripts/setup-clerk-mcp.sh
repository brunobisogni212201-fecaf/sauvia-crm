#!/bin/bash

###############################################################################
#                                                                             #
#  SETUP AUTOMÁTICO - Clerk + MCP Integration                                #
#  Executa todas as fases do plano                                           #
#                                                                             #
###############################################################################

set -e  # Exit on error

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funções helpers
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
# FASE 1: Coleta de Informações
# ============================================================================

phase_1_info() {
    print_header "FASE 1: Coleta de Informações (5 min)"
    
    print_info "Você precisa das Clerk API Keys"
    print_info "Obtenha em: https://dashboard.clerk.com"
    echo ""
    
    # Perguntar pelas chaves
    read -p "Digite seu NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (pk_test_...): " pk_key
    read -p "Digite seu CLERK_SECRET_KEY (sk_test_...): " sk_key
    
    if [ -z "$pk_key" ] || [ -z "$sk_key" ]; then
        print_error "Chaves não preenchidas"
        exit 1
    fi
    
    print_success "Chaves coletadas"
    
    # Exportar para usar nas próximas fases
    export CLERK_PK=$pk_key
    export CLERK_SK=$sk_key
}

# ============================================================================
# FASE 2: Preparar Ambiente
# ============================================================================

phase_2_setup_env() {
    print_header "FASE 2: Preparar Ambiente (.env files)"
    
    # Web .env.local
    print_step "Criando apps/web/.env.local"
    cat > apps/web/.env.local << ENVFILE
# ===== CLERK CONFIGURATION =====
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${CLERK_PK}
CLERK_SECRET_KEY=${CLERK_SK}

# ===== API CONFIGURATION =====
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
ENVFILE
    print_success "apps/web/.env.local criado"
    
    # Backend .env
    print_step "Criando apps/backend/.env"
    cat > apps/backend/.env << ENVFILE
# ===== CLERK CONFIGURATION =====
CLERK_JWT_KEY=${CLERK_SK}
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${CLERK_PK}

# ===== LOGGING =====
LOG_LEVEL=INFO
ENVFILE
    print_success "apps/backend/.env criado"
    
    # Add to .gitignore
    print_step "Adicionando .env ao .gitignore"
    echo "apps/web/.env.local" >> apps/web/.gitignore 2>/dev/null || true
    echo "apps/backend/.env" >> apps/backend/.gitignore 2>/dev/null || true
    print_success ".gitignore atualizado"
}

# ============================================================================
# FASE 3: Instalar Dependências
# ============================================================================

phase_3_install_deps() {
    print_header "FASE 3: Instalar Dependências"
    
    # Backend
    print_step "Instalando dependências backend (Python)..."
    cd apps/backend
    
    # Limpar cache
    rm -rf __pycache__ .pytest_cache 2>/dev/null || true
    
    # Instalar
    pip install -q -r requirements.txt
    
    # Verificar
    python -c "import PyJWT; import cryptography; import httpx" 2>/dev/null
    if [ $? -eq 0 ]; then
        print_success "Backend dependencies instaladas"
    else
        print_error "Erro ao instalar backend dependencies"
        exit 1
    fi
    
    cd ../../
    
    # Frontend
    print_step "Instalando dependências frontend (Node)..."
    cd apps/web
    pnpm install -q 2>/dev/null || npm install -q
    print_success "Frontend dependencies instaladas"
    cd ../../
}

# ============================================================================
# FASE 4: Verificar Backend
# ============================================================================

phase_4_verify_backend() {
    print_header "FASE 4: Verificar Backend"
    
    print_step "Testando importação do módulo Clerk..."
    cd apps/backend
    
    python -c "from src.adapters.driven.security.clerk_auth import verify_clerk_token; print('OK')" 2>/dev/null
    if [ $? -eq 0 ]; then
        print_success "Módulo Clerk importado com sucesso"
    else
        print_error "Erro ao importar módulo Clerk"
        exit 1
    fi
    
    cd ../../
}

# ============================================================================
# FASE 5: Verificar Arquivos
# ============================================================================

phase_5_verify_files() {
    print_header "FASE 5: Verificar Arquivos Criados"
    
    print_step "Verificando estrutura de diretórios..."
    
    files_to_check=(
        "apps/backend/src/adapters/driven/security/__init__.py"
        "apps/backend/src/adapters/driven/security/clerk_auth.py"
        "apps/web/src/lib/mcp/types.ts"
        "apps/web/src/lib/mcp/backend-client.ts"
        "apps/web/src/app/mcp/\[transport\]/route.ts"
        "apps/web/src/app/.well-known/oauth-authorization-server/route.ts"
        "apps/web/src/app/.well-known/oauth-protected-resource/mcp/route.ts"
    )
    
    all_ok=true
    for file in "${files_to_check[@]}"; do
        # Remove brackets for file check
        file_check=$(echo "$file" | sed 's/\\//g')
        if [ -f "$file_check" ]; then
            print_success "✓ $file"
        else
            print_error "✗ $file (NÃO ENCONTRADO)"
            all_ok=false
        fi
    done
    
    if [ "$all_ok" = false ]; then
        print_error "Alguns arquivos não foram encontrados"
        exit 1
    fi
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
║        🚀 SETUP AUTOMÁTICO - CLERK + MCP INTEGRATION 🚀                  ║
║                                                                           ║
║                   Vamos colocar tudo em funcionamento!                    ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
LOGO
    echo -e "${NC}"
    
    print_info "Este script vai executar todas as fases de setup"
    print_info "Tempo total: ~20 minutos"
    echo ""
    
    # Executar fases
    phase_1_info
    phase_2_setup_env
    phase_3_install_deps
    phase_4_verify_backend
    phase_5_verify_files
    
    # Sucesso!
    print_header "✅ SETUP COMPLETO!"
    
    echo -e "${GREEN}"
    cat << "SUCCESS"
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                    🎉 TUDO PRONTO PARA TESTAR! 🎉                       ║
║                                                                           ║
║  Próximos passos:                                                         ║
║                                                                           ║
║  1. Terminal 1 - Iniciar Backend:                                        ║
║     cd apps/backend                                                       ║
║     python -m uvicorn src.main:app --reload --port 8000                  ║
║                                                                           ║
║  2. Terminal 2 - Iniciar Frontend:                                       ║
║     cd apps/web                                                          ║
║     pnpm dev                                                              ║
║                                                                           ║
║  3. Terminal 3 - Testar Endpoints:                                       ║
║     ./scripts/test-mcp.sh                                                ║
║                                                                           ║
║  4. Browser - Fazer Login:                                              ║
║     http://localhost:3000                                                ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
SUCCESS
    echo -e "${NC}"
}

# Run
main
