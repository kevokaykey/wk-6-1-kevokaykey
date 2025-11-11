# Test Run Checklist

## Before Starting Tests

### Environment Setup
- [ ✅] Node.js version 16+ installed
- [✅ ] Dependencies installed: `npm install`
- [✅ ] Environment variables set in `.env`
- [ ✅] Development server runs: `npm start`

### Test Setup
- [✅ ] Test dependencies installed
- [ ✅] Cypress configured
- [ ✅] Test data available

## Daily Test Run

### Quick Smoke Test (2 minutes)
- [✅ ] Run: `npm run test:quick`
- [ ✅] All early validation tests pass
- [✅ ] Core functionality tests pass
- [ ✅] E2E smoke tests pass
- [ ✅] No console errors

### Manual Spot Check (3 minutes)
- [ ✅] App loads at http://localhost:3000
- [ ✅] Navigation works
- [ ✅] Books display correctly
- [ ✅] Add to cart functions
- [✅ ] No JavaScript errors in console

## Weekly Full Test

### Automated Tests (10 minutes)
- [ ✅] Run: `npm run test:all`
- [ ✅] All unit tests pass
- [ ✅] All integration tests pass
- [✅] All E2E tests pass
- [ ✅] Coverage > 70%

### Manual Verification (15 minutes)
- [ ✅] Complete shopping flow
- [ ✅] Test checkout process
- [ ✅] Verify payment integration
- [ ✅] Check mobile responsiveness
- [ ✅] Test error scenarios

## Pre-Release Testing

### Comprehensive Check (30 minutes)
- [✅ ] Full automated test suite
- [✅ ] Complete manual test suite
- [ ✅] Cross-browser testing
- [ ✅] Performance testing
- [ ✅] Security scanning

### Documentation
- [✅ ] Test results documented
- [✅ ] Issues logged and prioritized
- [ ] Release notes updated

## Troubleshooting Checklist

### Tests Failing?
- [ ] Check test output for specific errors
- [ ] Verify all dependencies installed
- [ ] Check environment variables
- [ ] Run `npm run test:early` to verify setup

### E2E Tests Flaky?
- [ ] Add explicit timeouts
- [ ] Use data-testid selectors
- [ ] Mock external services
- [ ] Run in headed mode for debugging

### Coverage Low?
- [ ] Add tests for error states
- [ ] Test edge cases
- [ ] Cover utility functions
- [ ] Test loading states
