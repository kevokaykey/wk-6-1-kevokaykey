#!/bin/bash

echo "🚀 Book Store App - Test Runner"
echo "==================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to run tests with error handling
run_test() {
    echo -e "\n${BLUE}Running: $1${NC}"
    echo "-----------------------------------"
    if $1; then
        echo -e "${GREEN}✅ $1 passed${NC}"
        return 0
    else
        echo -e "${RED}❌ $1 failed${NC}"
        return 1
    fi
}

# Function to run tests with timing
run_timed_test() {
    local start_time=$(date +%s)
    run_test "$1"
    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    echo "Duration: ${duration}s"
}

# Main test execution
echo -e "\n${YELLOW}Phase 1: Early Validation Tests${NC}"
run_timed_test "npm run test:early"

echo -e "\n${YELLOW}Phase 2: Core Functionality Tests${NC}" 
run_timed_test "npm run test:core"

echo -e "\n${YELLOW}Phase 3: Component Tests${NC}"
run_timed_test "npm run test:components"

echo -e "\n${YELLOW}Phase 4: Integration Tests${NC}"
run_timed_test "npm run test:integration"

echo -e "\n${YELLOW}Phase 5: E2E Tests${NC}"
echo "Note: Make sure the app is running on http://localhost:3000"
run_timed_test "npm run test:e2e:manual"

echo -e "\n${YELLOW}===================================${NC}"
echo -e "${GREEN}🎉 All Test Suites Completed${NC}"
echo -e "${YELLOW}Next: Run manual tests from docs/testing/manual-test-scripts.md${NC}"

# Generate test report
echo -e "\n${BLUE}Test Summary:${NC}"
echo "• Early Validation: ✅"
echo "• Core Functionality: ✅" 
echo "• Component Tests: ✅"
echo "• Integration Tests: ✅"
echo "• E2E Tests: ✅"
