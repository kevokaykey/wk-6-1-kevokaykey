# 🧪 **Test Plan – Skill-Building Web App**

**Project:** Skill-Building Platform for Unemployed Youth  
**Version:** 1.0  
**Date:** November 4, 2025  
**Prepared by:** Kevin, Eunice, and Nandwa  

---

## 1. 🎯 Objective and Scope

The objective of this test plan is to ensure that the **Skill-Building Web App** functions as intended — enabling users to register, log in, take lessons, and track their progress accurately and efficiently.  

The scope covers **functional**, **usability**, and **compatibility** testing of the **React frontend** and **FastAPI backend**, executed in a local environment before deployment.  

---

## 2. ✅ In-Scope Features (Mapped to Functional Requirement Codes)

| Feature | Description | FR Code |
|----------|--------------|---------|
| User Authentication | Sign up, login, logout using JWT tokens | FR-01 |
| Lessons Management | View, enroll in, and complete lessons | FR-02 |
| Progress Tracking | Track completed lessons and progress status | FR-03 |
| Dashboard | Display personalized progress overview | FR-04 |
| Admin Panel (optional) | Manage users and content | FR-05 |

---

## 3. 🚫 Out-of-Scope

- Integration with external payment APIs  
- Mobile responsiveness testing (desktop browsers only)  
- Production deployment configuration  
- Load testing for >50 concurrent users  

---

## 4. 🌐 Environments

| Environment Aspect | Details |
|--------------------|----------|
| **Operating Systems** | Windows 10, Ubuntu 22.04 |
| **Browsers (latest versions)** | Google Chrome, Mozilla Firefox |
| **Screen Sizes** | 1366x768, 1920x1080 |
| **Network Conditions** | Normal (Wi-Fi), Throttled 3G for performance tests |
| **Backend Environment** | FastAPI running locally on `localhost:8000` |
| **Frontend Environment** | React app running on `localhost:3000` |
| **Database** | SQLite (local dev setup) |

---

## 5. 🧰 Tools

| Tool | Purpose |
|------|----------|
| **Postman** | API endpoint validation |
| **PyTest / Selenium** | Automated test scripts |
| **Lighthouse** | Performance and accessibility audits |
| **Chrome DevTools** | Network throttling, console logs |
| **Axe DevTools (extension)** | Accessibility testing |
| **Screen Reader (NVDA/VoiceOver)** | Accessibility verification |
| **GitHub Issues** | Defect tracking and triage |
| **Google Docs / Sheets** | Test documentation and reporting |

---

## 6. ⚠️ Risks and Mitigations

| Risk | Impact | Mitigation |
|------|---------|-------------|
| Delayed feature implementation | High | Start test design in parallel with dev progress |
| Inconsistent environments across testers | Medium | Use shared `.env` and setup scripts |
| Unstable backend endpoints | Medium | Mock API responses for test continuity |
| Limited accessibility coverage | Low | Use Lighthouse + manual screen reader checks |

---

## 7. 🔍 Test Types

| Test Type | Description | Tools/Methods |
|------------|-------------|----------------|
| **Functional Testing** | Verify that all user stories meet expected outcomes | Manual + PyTest |
| **Accessibility (a11y)** | Validate compliance with WCAG 2.1 AA | Axe DevTools, Screen Reader |
| **Performance** | Assess page load time and API response | Lighthouse, DevTools |
| **Compatibility** | Cross-browser and device consistency | Chrome, Firefox |
| **Hygiene/Smoke** | Quick sanity check after each build | Manual execution checklist |

---

## 8. 🚪 Entry and Exit Criteria

### **Entry Criteria**
- All core features implemented in the development branch  
- Test environments configured and accessible  
- Test cases approved and ready for execution  
- API endpoints verified via Postman  

### **Exit Criteria**
- All functional test cases executed  
- Critical and high-severity bugs resolved or accepted with justification  
- Accessibility and performance tests completed  
- Test summary report submitted and approved  

---

✅ **End of Test Plan**  
**Next Step:** Begin *Phase 2 – Test Design & Early Execution (Due: Nov 11, 2025)*
