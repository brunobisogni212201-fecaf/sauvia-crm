#!/bin/bash

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKEND_DIR="$PROJECT_ROOT/apps/backend"
WEB_DIR="$PROJECT_ROOT/apps/web"
MOBILE_DIR="$PROJECT_ROOT/apps/mobile"

# Functions
print_header() {
    echo -e "\n${BLUE}═══════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}═══════════════════════════════════════════════════════${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# Phase 1: Verify Files
phase_verify_files() {
    print_header "Phase 1: Verifying Implementation Files"

    local all_good=true

    # Check backend auth module
    if [ -f "$BACKEND_DIR/src/adapters/driven/security/clerk_auth.py" ]; then
        print_success "Backend Clerk auth module exists"
    else
        print_error "Backend Clerk auth module MISSING"
        all_good=false
    fi

    # Check frontend MCP route
    if [ -f "$WEB_DIR/src/app/mcp/\[transport\]/route.ts" ]; then
        print_success "Frontend MCP route handler exists"
    else
        print_error "Frontend MCP route handler MISSING"
        all_good=false
    fi

    # Check OAuth endpoints
    if [ -f "$WEB_DIR/src/app/.well-known/oauth-protected-resource/mcp/route.ts" ]; then
        print_success "OAuth protected resource endpoint exists"
    else
        print_error "OAuth protected resource endpoint MISSING"
        all_good=false
    fi

    if [ -f "$WEB_DIR/src/app/.well-known/oauth-authorization-server/route.ts" ]; then
        print_success "OAuth authorization server endpoint exists"
    else
        print_error "OAuth authorization server endpoint MISSING"
        all_good=false
    fi

    # Check MCP libraries
    if [ -f "$WEB_DIR/src/lib/mcp/types.ts" ]; then
        print_success "MCP types file exists"
    else
        print_error "MCP types file MISSING"
        all_good=false
    fi

    if [ -f "$WEB_DIR/src/lib/mcp/backend-client.ts" ]; then
        print_success "MCP backend client exists"
    else
        print_error "MCP backend client MISSING"
        all_good=false
    fi

    if [ "$all_good" = false ]; then
        print_error "Some implementation files are missing. Please run the implementation first."
        exit 1
    fi
}

# Phase 2: Get Clerk Keys
phase_get_clerk_keys() {
    print_header "Phase 2: Clerk Configuration"

    print_info "Opening Clerk Dashboard..."
    echo -e "\n${YELLOW}Please go to: https://dashboard.clerk.com${NC}"
    echo -e "${YELLOW}Navigate to: Settings → API Keys${NC}"
    echo -e "${YELLOW}Copy the following keys:${NC}\n"

    read -p "Enter NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (pk_test_...): " CLERK_PUBLISHABLE_KEY
    if [ -z "$CLERK_PUBLISHABLE_KEY" ]; then
        print_error "Publishable key is required"
        exit 1
    fi

    read -sp "Enter CLERK_SECRET_KEY (sk_test_...): " CLERK_SECRET_KEY
    echo
    if [ -z "$CLERK_SECRET_KEY" ]; then
        print_error "Secret key is required"
        exit 1
    fi

    print_success "Clerk keys obtained"
}

# Phase 3: Setup Environment Files
phase_setup_env() {
    print_header "Phase 3: Setting Up Environment Variables"

    # Backend .env
    print_info "Creating $BACKEND_DIR/.env"
    cat > "$BACKEND_DIR/.env" << EOF
# Clerk Authentication
CLERK_JWT_KEY=$CLERK_SECRET_KEY
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY
CLERK_AUDIENCE=

# API Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/sauvia
REDIS_URL=redis://localhost:6379/0
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Environment
ENV=development
DEBUG=true
EOF
    print_success "Backend .env created"

    # Web .env.local
    print_info "Creating $WEB_DIR/.env.local"
    cat > "$WEB_DIR/.env.local" << EOF
# Clerk Configuration
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY=$CLERK_SECRET_KEY

# API
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Node Environment
NODE_ENV=development
EOF
    print_success "Web .env.local created"

    # Mobile .env
    print_info "Creating $MOBILE_DIR/.env"
    cat > "$MOBILE_DIR/.env" << EOF
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=$CLERK_PUBLISHABLE_KEY
EXPO_PUBLIC_API_URL=http://localhost:8000/api/v1
EOF
    print_success "Mobile .env created"
}

# Phase 4: Install Dependencies
phase_install_deps() {
    print_header "Phase 4: Installing Dependencies"

    # Backend
    print_info "Installing backend dependencies..."
    cd "$BACKEND_DIR"
    pip install --upgrade pip > /dev/null 2>&1
    pip install -r requirements.txt > /dev/null 2>&1
    print_success "Backend dependencies installed"

    # Web
    print_info "Installing web dependencies..."
    cd "$WEB_DIR"
    pnpm install > /dev/null 2>&1
    print_success "Web dependencies installed"

    # Mobile
    print_info "Installing mobile dependencies..."
    cd "$MOBILE_DIR"
    pnpm install > /dev/null 2>&1
    print_success "Mobile dependencies installed"
}

# Phase 5: Verify Installation
phase_verify_installation() {
    print_header "Phase 5: Verifying Installation"

    # Check Python dependencies
    print_info "Checking backend imports..."
    cd "$BACKEND_DIR"
    if python -c "from src.adapters.driven.security.clerk_auth import verify_clerk_token" 2>/dev/null; then
        print_success "Clerk auth module imports correctly"
    else
        print_error "Failed to import Clerk auth module"
        exit 1
    fi

    # Check cryptography
    if python -c "from cryptography.hazmat.primitives import serialization" 2>/dev/null; then
        print_success "Cryptography installed (RS256 support)"
    else
        print_error "Cryptography not installed"
        exit 1
    fi

    # Check web build
    print_info "Testing web build..."
    cd "$WEB_DIR"
    if pnpm build > /dev/null 2>&1; then
        print_success "Web build successful"
    else
        print_warning "Web build failed - check for TypeScript errors"
    fi
}

# Phase 6: Summary
phase_summary() {
    print_header "Phase 6: Setup Complete! 🎉"

    echo -e "${GREEN}All systems ready for Clerk + MCP integration!${NC}\n"

    echo -e "${BLUE}Environment Files Created:${NC}"
    echo -e "  • $BACKEND_DIR/.env"
    echo -e "  • $WEB_DIR/.env.local"
    echo -e "  • $MOBILE_DIR/.env\n"

    echo -e "${BLUE}Next Steps:${NC}"
    echo -e "  1. Start Backend:"
    echo -e "     ${YELLOW}cd $BACKEND_DIR${NC}"
    echo -e "     ${YELLOW}python -m uvicorn src.main:app --reload --port 8000${NC}\n"

    echo -e "  2. Start Web App (new terminal):"
    echo -e "     ${YELLOW}cd $WEB_DIR${NC}"
    echo -e "     ${YELLOW}pnpm dev${NC}\n"

    echo -e "  3. Test Endpoints (new terminal):"
    echo -e "     ${YELLOW}curl http://localhost:3000/.well-known/oauth-protected-resource/mcp${NC}\n"

    echo -e "  4. Login and Test:"
    echo -e "     ${YELLOW}Open http://localhost:3000 in browser${NC}"
    echo -e "     ${YELLOW}Click Sign In and complete Clerk auth${NC}\n"

    echo -e "${BLUE}Documentation:${NC}"
    echo -e "  • Full setup guide: $PROJECT_ROOT/CLERK_MCP_COMPLETE_SETUP.md"
    echo -e "  • Implementation details: $PROJECT_ROOT/IMPLEMENTATION_COMPLETE.md\n"

    echo -e "${BLUE}For Production Deployment:${NC}"
    echo -e "  • Update Clerk keys to production (pk_live_/sk_live_)"
    echo -e "  • Set NEXT_PUBLIC_API_URL to your backend URL"
    echo -e "  • Deploy web to Vercel: ${YELLOW}vercel deploy --prod${NC}"
    echo -e "  • Deploy backend to Docker/ECS\n"
}

# Main execution
main() {
    echo -e "${BLUE}"
    cat << 'EOF'
  ╔═══════════════════════════════════════════════════╗
  ║                                                   ║
  ║    🔐 Clerk + MCP Automated Setup Script 🔐     ║
  ║                                                   ║
  ║          Sauvia CRM - Authentication &            ║
  ║         Model Context Protocol Integration        ║
  ║                                                   ║
  ╚═══════════════════════════════════════════════════╝
EOF
    echo -e "${NC}\n"

    # Check if running from project root
    if [ ! -f "$PROJECT_ROOT/pnpm-workspace.yaml" ]; then
        print_error "Please run this script from the sauvia-app root directory"
        exit 1
    fi

    # Run phases
    phase_verify_files
    phase_get_clerk_keys
    phase_setup_env
    phase_install_deps
    phase_verify_installation
    phase_summary
}

# Run main function
main
