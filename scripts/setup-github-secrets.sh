#!/bin/bash
# GitHub Secrets Setup Script
# Run this to configure GitHub Actions secrets via CLI

set -e

echo "🔐 Setting up GitHub Actions Secrets..."
echo ""
echo "⚠️  This requires GitHub CLI (gh) to be installed."
echo "    Install: brew install gh"
echo "    Login: gh auth login"
echo ""

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) not found."
    echo "Install with: brew install gh"
    echo "Then run: gh auth login"
    exit 1
fi

# GitHub CLI secrets setup
echo "📝 Adding AWS credentials to GitHub Secrets..."

gh secret set AWS_ACCESS_KEY_ID --body "AKIAQMLRP6G3SHI2AOFI"
gh secret set AWS_SECRET_ACCESS_KEY --body "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"
gh secret set AWS_REGION --body "us-east-1"
gh secret set AWS_ACCOUNT_ID --body "026544697783"

echo ""
echo "✅ GitHub Secrets configured!"
echo ""
echo "🚀 Your CI/CD pipeline is now ready!"
echo "   Push to 'main' branch to trigger staging deployment"
echo "   Push to 'production' branch to trigger production deployment"
