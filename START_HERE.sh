#!/bin/bash

###############################################################################
#                                                                             #
#  🚀 COMECE AQUI - Interactive Setup Guide                                  #
#  Guia passo-a-passo para implementar Clerk + MCP                          #
#                                                                             #
###############################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

# Contadores
STEP=0
TOTAL_STEPS=9

print_logo() {
    clear
    echo -e "${CYAN}"
    cat << "LOGO"
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║           🎉 BEM-VINDO AO SETUP CLERK + MCP 🎉                          ║
║                                                                           ║
║              Vamos implementar tudo em ~60 minutos                        ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
LOGO
    echo -e "${NC}"
}

print_step_header() {
    ((STEP++))
    echo -e "\n${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║ PASSO $STEP de $TOTAL_STEPS: $1${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}\n"
}

print_info() {
    echo -e "${CYAN}ℹ $1${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

press_continue() {
    echo ""
    read -p "Pressione ENTER para continuar..."
}

# ============================================================================
# PASSOS
# ============================================================================

step_1_check_prerequisites() {
    print_step_header "Verificar Pré-Requisitos"
    
    print_info "Verificando se você tem tudo que precisa..."
    echo ""
    
    # Check Node
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node -v)
        print_success "Node.js instalado ($NODE_VERSION)"
    else
        print_warning "Node.js não encontrado - instale em nodejs.org"
    fi
    
    # Check Python
    if command -v python3 &> /dev/null; then
        PY_VERSION=$(python3 --version)
        print_success "Python instalado ($PY_VERSION)"
    else
        print_warning "Python não encontrado - instale python.org"
    fi
    
    # Check pnpm
    if command -v pnpm &> /dev/null; then
        PNPM_VERSION=$(pnpm -v)
        print_success "pnpm instalado ($PNPM_VERSION)"
    else
        print_warning "pnpm não encontrado - rodando: npm i -g pnpm"
        npm i -g pnpm
    fi
    
    # Check Git
    if command -v git &> /dev/null; then
        print_success "Git instalado"
    else
        print_warning "Git não encontrado"
    fi
    
    echo ""
    print_info "Todos os pré-requisitos verificados!"
    press_continue
}

step_2_clerk_keys() {
    print_step_header "Obter Chaves Clerk"
    
    print_info "Você precisa buscar as chaves no Clerk Dashboard"
    echo ""
    echo "1. Abra: https://dashboard.clerk.com"
    echo "2. Verifique se está na organização 'sauvia'"
    echo "3. Vá para: Settings → API Keys"
    echo "4. Copie as duas chaves abaixo:"
    echo ""
    
    read -p "Cole NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (pk_test_...): " PK_KEY
    read -p "Cole CLERK_SECRET_KEY (sk_test_...): " SK_KEY
    
    if [ -z "$PK_KEY" ] || [ -z "$SK_KEY" ]; then
        print_warning "Chaves não podem estar vazias"
        step_2_clerk_keys
        return
    fi
    
    print_success "Chaves coletadas!"
    
    # Exportar para próximos passos
    export CLERK_PK=$PK_KEY
    export CLERK_SK=$SK_KEY
    
    press_continue
}

step_3_setup_env() {
    print_step_header "Preparar Arquivos de Ambiente"
    
    print_info "Criando arquivos .env com suas chaves..."
    echo ""
    
    # Web .env.local
    print_info "Criando apps/web/.env.local"
    cat > apps/web/.env.local << ENVFILE
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${CLERK_PK}
CLERK_SECRET_KEY=${CLERK_SK}
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
ENVFILE
    print_success "✓ apps/web/.env.local criado"
    
    # Backend .env
    print_info "Criando apps/backend/.env"
    cat > apps/backend/.env << ENVFILE
CLERK_JWT_KEY=${CLERK_SK}
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=${CLERK_PK}
LOG_LEVEL=INFO
ENVFILE
    print_success "✓ apps/backend/.env criado"
    
    # Add to .gitignore
    echo "apps/web/.env.local" >> apps/web/.gitignore 2>/dev/null || true
    echo "apps/backend/.env" >> apps/backend/.gitignore 2>/dev/null || true
    print_success "✓ .gitignore atualizado"
    
    press_continue
}

step_4_install_backend() {
    print_step_header "Instalar Dependências Backend (Python)"
    
    print_info "Instalando dependências Python..."
    echo ""
    
    cd apps/backend
    
    # Remove pycache
    rm -rf __pycache__ .pytest_cache 2>/dev/null || true
    
    # Install
    echo "Rodando: pip install -r requirements.txt"
    pip install -q -r requirements.txt
    
    # Verify
    python -c "import PyJWT; import cryptography; import httpx" 2>/dev/null
    if [ $? -eq 0 ]; then
        print_success "✓ Dependências Python instaladas"
    else
        print_warning "Erro ao instalar - rodando novamente com mais detalhes"
        pip install -r requirements.txt
    fi
    
    cd ../../
    
    press_continue
}

step_5_install_frontend() {
    print_step_header "Instalar Dependências Frontend (Node)"
    
    print_info "Instalando dependências Node..."
    echo ""
    
    cd apps/web
    
    echo "Rodando: pnpm install"
    pnpm install -q 2>/dev/null || npm install -q
    
    print_success "✓ Dependências Node instaladas"
    
    cd ../../
    
    press_continue
}

step_6_verify_files() {
    print_step_header "Verificar Arquivos Criados"
    
    print_info "Conferindo se todos os arquivos foram criados..."
    echo ""
    
    files=(
        "apps/backend/src/adapters/driven/security/clerk_auth.py"
        "apps/web/src/lib/mcp/types.ts"
        "apps/web/src/lib/mcp/backend-client.ts"
    )
    
    all_ok=true
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            print_success "✓ $file"
        else
            print_warning "✗ $file (não encontrado)"
            all_ok=false
        fi
    done
    
    if [ "$all_ok" = true ]; then
        echo ""
        print_success "Todos os arquivos estão no lugar!"
    else
        print_warning "Alguns arquivos não encontrados - verifique o repo"
    fi
    
    press_continue
}

step_7_start_backend() {
    print_step_header "Iniciar Backend (Primeiro Terminal)"
    
    print_info "Agora você precisa abrir um novo terminal para iniciar o backend"
    echo ""
    echo "Instruções:"
    echo "1. Abra um novo terminal"
    echo "2. Execute:"
    echo ""
    echo "   cd apps/backend"
    echo "   python -m uvicorn src.main:app --reload --port 8000"
    echo ""
    print_warning "Você deve ver: 'INFO: Uvicorn running on http://0.0.0.0:8000'"
    echo ""
    
    read -p "Digite 'ok' quando o backend estiver rodando: " backend_status
    if [ "$backend_status" != "ok" ]; then
        print_warning "Verifique se o backend iniciou corretamente"
    fi
    
    press_continue
}

step_8_start_frontend() {
    print_step_header "Iniciar Frontend (Segundo Terminal)"
    
    print_info "Agora vamos iniciar o frontend"
    echo ""
    echo "Instruções:"
    echo "1. Abra outro novo terminal"
    echo "2. Execute:"
    echo ""
    echo "   cd apps/web"
    echo "   pnpm dev"
    echo ""
    print_warning "Você deve ver: '▲ Next.js' e 'Local: http://localhost:3000'"
    echo ""
    
    read -p "Digite 'ok' quando o frontend estiver rodando: " frontend_status
    if [ "$frontend_status" != "ok" ]; then
        print_warning "Verifique se o frontend iniciou corretamente"
    fi
    
    press_continue
}

step_9_run_tests() {
    print_step_header "Executar Testes"
    
    print_info "Vamos testar se tudo está funcionando"
    echo ""
    
    read -p "Você quer rodar os testes agora? (s/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Ss]$ ]]; then
        ./scripts/test-mcp.sh
    else
        print_info "Você pode rodar os testes depois com:"
        echo "  ./scripts/test-mcp.sh"
    fi
    
    press_continue
}

step_final_summary() {
    clear
    
    echo -e "${GREEN}"
    cat << "SUCCESS"
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                    🎉 PARABÉNS! TUDO PRONTO! 🎉                         ║
║                                                                           ║
║            Seu MCP Server está rodando e pronto para usar!               ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
SUCCESS
    
    echo -e "${CYAN}"
    cat << "NEXT"

📋 Próximos Passos:

1️⃣  TESTAR LOCALMENTE
   • Abra http://localhost:3000 no navegador
   • Faça login com Clerk
   • Execute ./scripts/test-mcp.sh

2️⃣  CONECTAR COM CLAUDE DESKTOP
   • Instale Claude Desktop
   • Configure MCP server apontando para:
     URL: http://localhost:3000/mcp/http
     Transport: HTTP with Streaming

3️⃣  IR PARA PRODUÇÃO (quando estiver satisfeito)
   • Execute: ./scripts/deploy-production.sh
   • Detalhe: vercel deploy --prod (web)
   • Detalhe: docker build & push (backend)

4️⃣  ECONOMIZAR DINHEIRO
   • Delete o Cognito do AWS (economize $50-100/mês!)
   • AWS Console → Cognito → Delete User Pool

📚 DOCUMENTAÇÃO:
   • EXECUTION_PLAN.md - Guia completo de execução
   • IMPLEMENTATION_CHECKLIST.md - Checklist detalhado
   • MCP_QUICK_REFERENCE.txt - Referência rápida

⚠️  IMPORTANTE:
   • NÃO COMMITA os arquivos .env
   • Guarde suas Clerk keys em segurança
   • Use secrets manager em produção

NEXT

    echo -e "${NC}"
    
    echo "Precisa de ajuda? Consulte os arquivos de documentação!"
    echo ""
}

# ============================================================================
# MAIN
# ============================================================================

main() {
    print_logo
    
    echo -e "${YELLOW}"
    cat << "INTRO"
Este é um guia interativo que vai:

✓ Verificar seus pré-requisitos
✓ Coletar suas chaves Clerk
✓ Preparar arquivos de ambiente
✓ Instalar todas as dependências
✓ Guiar você através dos testes
✓ Explicar os próximos passos

Tempo estimado: 30-60 minutos

Vamos começar? 🚀
INTRO
    echo -e "${NC}"
    
    press_continue
    
    # Executar passos
    step_1_check_prerequisites
    step_2_clerk_keys
    step_3_setup_env
    step_4_install_backend
    step_5_install_frontend
    step_6_verify_files
    step_7_start_backend
    step_8_start_frontend
    step_9_run_tests
    step_final_summary
}

# Run
main
