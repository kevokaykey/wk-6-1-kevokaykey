#!/bin/bash

echo "🚀 Starting Early Stage Test Suite"
echo "==================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to run tests with error handling
run_test() {
    echo -e "\n${YELLOW}Running: $1${NC}"
    if $1; then
        echo -e "${GREEN}✅ $1 passed${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 failed${NC}"
        return 1
    fi
}

# Run test suites
echo -e "\n${YELLOW}Phase 1: Early Validation Tests${NC}"
run_test "npm run test:early"

echo -e "\n${YELLOW}Phase 2: Core Functionality Tests${NC}" 
run_test "npm run test:core"

echo -e "\n${YELLOW}Phase 3: E2E Smoke Tests${NC}"
echo "Note: Make sure the app is running on http://localhost:3000"
run_test "npm run test:e2e:smoke"

echo -e "\n${YELLOW}===================================${NC}"
echo -e "${GREEN}Early Stage Test Suite Complete${NC}"
echo -e "${YELLOW}Next: Run manual tests from docs/testing/manual-test-scripts.md${NC}"
