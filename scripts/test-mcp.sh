#!/bin/bash

###############################################################################
#                                                                             #
#  TESTES AUTOMÁTICOS - Clerk + MCP Integration                              #
#  Valida todos os endpoints e funcionalidades                               #
#                                                                             #
###############################################################################

set -e

# Cores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# Variáveis
BACKEND_URL="http://localhost:8000"
FRONTEND_URL="http://localhost:3000"
TESTS_PASSED=0
TESTS_FAILED=0

# Helpers
print_header() {
    echo -e "\n${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${BLUE}║ $1${NC}"
    echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}\n"
}

print_test() {
    echo -e "${YELLOW}▶ $1${NC}"
}

print_pass() {
    echo -e "${GREEN}✓ $1${NC}"
    ((TESTS_PASSED++))
}

print_fail() {
    echo -e "${RED}✗ $1${NC}"
    ((TESTS_FAILED++))
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# ============================================================================
# TESTES DE CONECTIVIDADE
# ============================================================================

test_backend_connectivity() {
    print_header "TESTE 1: Conectividade Backend"
    
    print_test "Backend respondendo na porta 8000?"
    if curl -s "$BACKEND_URL/health" > /dev/null 2>&1 || curl -s "$BACKEND_URL/docs" > /dev/null 2>&1; then
        print_pass "Backend está respondendo"
    else
        print_fail "Backend não está respondendo em $BACKEND_URL"
        print_info "Inicie o backend com: cd apps/backend && python -m uvicorn src.main:app --reload"
        return 1
    fi
}

test_frontend_connectivity() {
    print_header "TESTE 2: Conectividade Frontend"
    
    print_test "Frontend respondendo na porta 3000?"
    response=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL")
    if [ "$response" == "200" ] || [ "$response" == "307" ]; then
        print_pass "Frontend está respondendo (HTTP $response)"
    else
        print_fail "Frontend não está respondendo em $FRONTEND_URL (HTTP $response)"
        print_info "Inicie o frontend com: cd apps/web && pnpm dev"
        return 1
    fi
}

# ============================================================================
# TESTES DE OAUTH METADATA
# ============================================================================

test_oauth_metadata() {
    print_header "TESTE 3: OAuth Metadata Endpoints"
    
    # Teste 1: Protected Resource Metadata
    print_test "Endpoint /.well-known/oauth-protected-resource/mcp?"
    response=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL/.well-known/oauth-protected-resource/mcp")
    if [ "$response" == "200" ]; then
        print_pass "OAuth Protected Resource metadata retorna 200"
        
        # Verificar conteúdo
        content=$(curl -s "$FRONTEND_URL/.well-known/oauth-protected-resource/mcp")
        if echo "$content" | grep -q "scopes_supported"; then
            print_pass "Metadata contém scopes_supported"
        else
            print_fail "Metadata não contém scopes_supported"
        fi
    else
        print_fail "OAuth Protected Resource metadata retorna HTTP $response"
    fi
    
    # Teste 2: Authorization Server Metadata
    print_test "Endpoint /.well-known/oauth-authorization-server?"
    response=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL/.well-known/oauth-authorization-server")
    if [ "$response" == "200" ]; then
        print_pass "OAuth Authorization Server metadata retorna 200"
    else
        print_fail "OAuth Authorization Server metadata retorna HTTP $response"
    fi
}

# ============================================================================
# TESTES DE MCP ENDPOINT
# ============================================================================

test_mcp_endpoint() {
    print_header "TESTE 4: MCP Endpoint"
    
    # Teste sem token (deve falhar)
    print_test "MCP endpoint sem token (deve retornar 401)?"
    response=$(curl -s -X POST "$FRONTEND_URL/mcp/http" \
        -H "Content-Type: application/json" \
        -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' \
        -o /dev/null -w "%{http_code}")
    
    if [ "$response" == "401" ]; then
        print_pass "MCP endpoint retorna 401 sem token (esperado)"
    else
        print_fail "MCP endpoint retorna HTTP $response (esperava 401)"
    fi
}

# ============================================================================
# TESTES COM TOKEN
# ============================================================================

test_with_token() {
    print_header "TESTE 5: Testes com Token Clerk"
    
    print_info "Para testar com token, siga os passos:"
    echo ""
    echo "1. Faça login em http://localhost:3000"
    echo "2. Abra DevTools (F12)"
    echo "3. Vá para aba Network"
    echo "4. Procure por requisição a api.clerk.com"
    echo "5. Copie o token do header Authorization"
    echo ""
    
    read -p "Cole seu token Clerk (ou deixe em branco para pular): " CLERK_TOKEN
    
    if [ -z "$CLERK_TOKEN" ]; then
        print_info "Teste com token pulado"
        return
    fi
    
    # Teste MCP tools
    print_test "Listar MCP tools com token?"
    response=$(curl -s -X POST "$FRONTEND_URL/mcp/http" \
        -H "Authorization: Bearer $CLERK_TOKEN" \
        -H "Content-Type: application/json" \
        -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}')
    
    if echo "$response" | grep -q "get-sauvia-user"; then
        print_pass "MCP tools listadas com sucesso"
        print_info "Tools disponíveis: get-sauvia-user, list-patients, get-patient-details, etc"
    else
        print_fail "Erro ao listar MCP tools"
        print_info "Resposta: $response"
    fi
}

# ============================================================================
# RESUMO
# ============================================================================

print_summary() {
    print_header "RESUMO DOS TESTES"
    
    echo -e "${GREEN}Testes passados: $TESTS_PASSED${NC}"
    echo -e "${RED}Testes falhados: $TESTS_FAILED${NC}"
    echo ""
    
    if [ $TESTS_FAILED -eq 0 ]; then
        echo -e "${GREEN}"
        cat << "SUCCESS"
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                    ✅ TODOS OS TESTES PASSARAM! ✅                      ║
║                                                                           ║
║  Seu MCP server está pronto para usar com Claude/ChatGPT!                ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
SUCCESS
        echo -e "${NC}"
    else
        echo -e "${RED}"
        cat << "FAIL"
╔═══════════════════════════════════════════════════════════════════════════╗
║                                                                           ║
║                  ⚠️ ALGUNS TESTES FALHARAM ⚠️                           ║
║                                                                           ║
║  Verifique os erros acima e execute o script novamente                   ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
FAIL
        echo -e "${NC}"
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
║            🧪 TESTES AUTOMÁTICOS - CLERK + MCP INTEGRATION 🧪            ║
║                                                                           ║
║                       Validando Implementação                             ║
║                                                                           ║
╚═══════════════════════════════════════════════════════════════════════════╝
LOGO
    echo -e "${NC}"
    
    print_info "Executando testes de conectividade e funcionalidade..."
    echo ""
    
    # Executar testes
    test_backend_connectivity || exit 1
    test_frontend_connectivity || exit 1
    test_oauth_metadata
    test_mcp_endpoint
    test_with_token
    
    # Resumo
    print_summary
}

# Run
main
