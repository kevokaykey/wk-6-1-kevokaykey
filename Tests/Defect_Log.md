# Defect Log Report
Date: November 9, 2025

## Summary
This document is a technical defect log derived from automated test runs (Cypress) and targeted unit tests. Each defect entry includes: severity, priority, status, classification (functional / non-functional / structural), execution type (automated / manual), technical reproduction steps, expected vs actual behavior, root-cause analysis, workaround, and suggested fix. Evidence (screenshots / test traces) is linked where available.

---

## Defects (structured)

| ID | Title | Severity | Priority | Status | Classification | Execution Type | Evidence |
|----|-------|----------|----------|--------|----------------|----------------|----------|
| D-001 | Application bootstrap failure | Critical | High | Open | Functional, Structural | Automated (Cypress) | cypress/screenshots/spec.cy.js/Basic Test -- should load the app (failed).png |
| D-002 | Homepage (Catalog) not rendering | Critical | High | Open | Functional, Structural | Automated (Cypress) | cypress/screenshots/bookstore.cy.js/Book Store E2E Tests -- should load the homepage (failed).png |
| D-003 | Add to cart operation fails / loading state stuck | High | High | Open | Functional, Execution (async) | Automated (Cypress) | cypress/screenshots/bookstore.cy.js/Book Store E2E Tests -- should add book to cart (failed).png |
| D-004 | Navigation to Cart page does not update URL | High | Medium | Open | Functional, Structural | Automated (Cypress) | cypress/screenshots/bookstore.cy.js/Book Store E2E Tests -- should navigate to cart page (failed).png |

---

### D-001 — Application bootstrap failure
- Severity: Critical
- Priority: High
- Status: Open
- Classification: Functional, Structural
- Execution Type: Automated (Cypress smoke test)
- Component(s): `src/index.js`, root app component (`App.js`), static assets in `public/`
- Test location: `cypress/e2e/spec.cy.js`

Technical reproduction steps (developer-focused):
1. Start local development server (or run tests that mount the app in an isolated environment).
2. Run the Cypress test that visits `/` (see `cypress/e2e/spec.cy.js`).
3. Observe network and console errors captured in test runner.

Repro (Cypress) snippet:

```javascript
// cypress/e2e/spec.cy.js
describe('Basic Test', () => {
  it('should load the app', () => {
    cy.visit('/');
    cy.get('#root', { timeout: 10000 }).should('exist');
    cy.contains('Book Store').should('be.visible');
  });
});
```

Expected behavior:
- App mounts, root element present, top-level UI renders (header, nav, or Book Store title).

Actual behavior:
- App fails to mount; Cypress screenshot and browser console show errors (stack trace). Typical symptoms: Uncaught exceptions during render, missing public assets 404, or unhandled promise rejections during initialization.

Initial triage / likely root causes:
- React mount failure due to incorrect `ReactDOM.render` / `createRoot` usage or missing target element.
- Missing environment variables (e.g. runtime config) causing thrown exceptions in initialization logic.
- Synchronous code in module initialization that throws (e.g., accessing window.* in SSR-like context).
- Static asset path misconfiguration causing 404s that break script loading.

Workaround:
- Start the app with verbose logs and run a debug session to capture console stack traces. If blocking, rollback to known good commit where bootstrap passes.

Suggested fix:
1. Add defensive guards in `src/index.js` to fail gracefully and log errors.
2. Wrap initialization code in try/catch and surface errors in console with complete stack traces.
3. Add a unit test that mounts `App` with React Testing Library to catch mount-time errors early.

Unit test example (Jest + React Testing Library):

```javascript
// src/__tests__/app.mount.test.js
import React from 'react';
import { render } from '@testing-library/react';
import App from '../../src/App';

test('App mounts without crashing', () => {
  const { container } = render(<App />);
  expect(container).toBeTruthy();
});
```

---

### D-002 — Homepage (Catalog) not rendering
- Severity: Critical
- Priority: High
- Status: Open
- Classification: Functional, Structural
- Execution Type: Automated (Cypress E2E)
- Component(s): `src/pages/CatalogPage.js`, `src/components/BookList.js`, `src/components/BookCard.js`, data in `src/data/books.js`
- Test location: `cypress/e2e/bookstore.cy.js`

Technical reproduction steps:
1. Run the E2E suite or the single spec that opens the homepage.
2. Inspect network calls for the books data (if fetched) and console for component lifecycle errors.

Cypress repro snippet:

```javascript
// cypress/e2e/bookstore.cy.js (relevant part)
it('should load the homepage', () => {
  cy.visit('/');
  cy.get('[data-testid="catalog-title"]').should('contain.text', 'Book Store');
  cy.get('[data-testid="book-list"]').should('exist');
});
```

Expected behavior:
- Catalog title visible, BookList mounts, and one or more BookCard items rendered.

Actual behavior:
- Title not visible and BookList not mounted. CSS alone can hide elements, so verify DOM and computed styles.

Root-cause candidates:
- Data binding issue: `books.js` not imported or exported correctly; default vs named export mismatch.
- Component mount error: exception thrown inside `BookList` render due to undefined props.
- CSS visibility or z-index causing text to be invisible.
- Asynchronous data fetching not stubbed in Cypress leading to timing/race conditions.

Suggested fixes/tests:
1. Add unit tests for `BookList` with mocked props to ensure render is robust to empty arrays.
2. In Cypress, stub network responses to isolate UI rendering from backend.

Example mock for Cypress (network stub):

```javascript
cy.intercept('GET', '/api/books', { fixture: 'books.json' }).as('getBooks');
cy.visit('/');
cy.wait('@getBooks');
cy.get('[data-testid="book-list"]').children().should('have.length.greaterThan', 0);
```

---

### D-003 — Add-to-cart operation fails / loading state stuck
- Severity: High
- Priority: High
- Status: Open
- Classification: Functional, Execution (async)
- Execution Type: Automated (Cypress) and Unit
- Component(s): `src/components/BookCard.js`, `src/store/StoreProvider.js`, `src/services/CheckoutService.js`
- Test location: `cypress/e2e/bookstore.cy.js`

Reproduction steps (dev):
1. With an instrumented environment, trigger the `onPurchase` code path in `BookCard`.
2. Observe state transitions in the StoreProvider and check for unhandled promise rejections or missing dispatches.

Relevant code (excerpt in repo):

```javascript
const handlePurchase = async () => {
  setLoading(true);
  try {
    await onPurchase(book);
  } finally {
    setLoading(false);
  }
};
```

Failure modes:
- `onPurchase` may be a fire-and-forget that doesn't resolve (promise never settles) due to missing await in caller or long external call.
- State update dispatched to provider but not consumed due to stale closures or incorrect context wiring (e.g., multiple provider instances).

Debug steps:
1. Add console logs or use React DevTools to verify the provider instance identity.
2. Add timeouts to the purchase flow to avoid indefinite loading states.
3. Add unit tests to assert that `handlePurchase` toggles loading state reliably using jest fake timers.

Unit test idea (Jest):

```javascript
import { renderHook, act } from '@testing-library/react-hooks';
// pseudo: test hook or isolate handlePurchase behavior using mocks
```

Suggested fix:
1. Ensure `onPurchase` returns a resolved/rejected promise in all code paths.
2. Add centralized error handling for checkout operations.
3. Add telemetry/logging around async operations to detect long-running requests.

---

### D-004 — Navigation to Cart page does not update URL
- Severity: High
- Priority: Medium
- Status: Open
- Classification: Functional, Structural
- Execution Type: Automated (Cypress)
- Component(s): `src/components/Navbar.js`, routing config (react-router)

Repro steps (Cypress):

```javascript
it('should navigate to cart page', () => {
  cy.visit('/');
  cy.contains('Cart').click();
  cy.url().should('include', '/cart');
});
```

Observed behavior:
- Click event fires but the URL does not update, or the URL updates but the CartPage fails to mount.

Root-cause candidates:
- Link element is not an anchor or `Link` from react-router, so event might be prevented or handled incorrectly.
- Application uses client-side routing but tests mount a different router context (MemoryRouter vs BrowserRouter mismatch).

Fix suggestions:
1. Use `Link`/`NavLink` components for navigation and validate that `to` props are correct.
2. Ensure tests mount the same router context as the app (e.g., BrowserRouter) or adapt tests to use MemoryRouter with initial entries.

---

## Severity and Priority Definitions (technical)
- Severity (impact to system):
  - Critical: Core system functionality unavailable (data loss, bootstrap failure, revenue-impacting). Immediate stop-the-line.
  - High: Major feature impairment or severe regression without a practical workaround.
  - Medium: Functional degradation; workaround exists.
  - Low: Cosmetic or non-impacting defects (UI misalignment, text errors).
- Priority (work scheduling):
  - High: Fix in next hotfix or sprint; blocking other work.
  - Medium: Schedule for current sprint backlog.
  - Low: Backlog grooming; non-urgent.

## Test Coverage Matrix (applies to each defect)
- Functional: E2E (Cypress) + unit tests (Jest) to validate feature behavior.
- Non-functional: Performance (page load time), Accessibility (a11y checks), Security (input validation), Reliability (stability under load).
- Structural: Component-tree integrity, bundle size, module resolution, router topology.
- Execution type: Automated (CI, scheduled), Manual (exploratory, UX validation).

Example non-functional test snippet (Page load performance via Lighthouse CLI -- optional):

```powershell
# Run from repo root (PowerShell)
npm install -g lighthouse
lighthouse http://localhost:3000 --output html --output-path ./reports/lighthouse-homepage.html
```

## Evidence and artifacts
- Screenshots captured by Cypress are in `cypress/screenshots/*`.
- Example screenshot embedded below (if viewing in a renderer that supports images):

![Homepage failure screenshot](../cypress/screenshots/bookstore.cy.js/Book Store E2E Tests -- should load the homepage (failed).png)

## How to reproduce locally (developer checklist)
1. Clone the repo and install dependencies:

```powershell
cd "c:\\Users\\SHADRACK NANDWA\\Final\\wk-6-1-kevokaykey"
npm install
```

2. Run unit tests (Jest):

```powershell
$env:CI='true'; npm test --silent
```

3. Run Cypress locally (open GUI):

```powershell
npx cypress open
# or run headless
npx cypress run --spec "cypress/e2e/bookstore.cy.js"
```

4. Re-run failing spec with network logs enabled and capture console errors.

## Actions taken / next steps
1. Documented defects with expanded technical details, reproducible steps, test classification, and suggested fixes.
2. Added unit test example to catch bootstrap failures.
3. Recommended stubbing network calls in E2E to isolate UI failures.

## Follow-ups (recommended)
- Add a CI job to run the unit test that mounts `App` to catch bootstrap regressions early.
- Add a Cypress job in CI with network stubs for deterministic E2E runs.
- Implement basic telemetry for checkout operations to detect stuck promises.

---

If you want, I can:
- add the unit test file to `src/__tests__` and run the test suite now, or
- add a small Cypress stub to the existing spec to isolate the homepage rendering failure.

-- End of report