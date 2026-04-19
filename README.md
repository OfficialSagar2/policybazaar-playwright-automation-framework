# policybazaar-playwright-automation-framework
Overview : 
End-to-end automation framework built using Playwright for PolicyBazaar insurance journey.
This framework covers UI + API validation, follows Page Object Model (POM), and supports data-driven testing.

Tech Stack : 
1) Playwright
2) JavaScript (Node.js)
3) REST API Testing
4) dotenv (Environment variables)
5) Jenkins (CI/CD)

Project Structure : 
POM/                 → Page Object classes  
tests/               → Test files (API, Functional, E2E)  
Utils/               → API helpers, payload builder, test data  
fixtures/            → Base test setup  
playwright.config.js → Configurations  
.env                 → Environment variables (ignored in repo)

Features :
Page Object Model (POM) design pattern
UI + API integrated testing
Token-based authentication handling
Data-driven testing using JSON
Environment-based configuration using .env
Reusable utilities (API helper, payload builder)
CI execution using Jenkins

Test Coverage :
API Testing (Auth token + Quote API validation)
Functional Testing (Home Page, Quote Page)
End-to-End Flow (Insurance journey)

Execution Limitation :
Tests are executed only during UAT availability window (Mon–Fri, 9 AM – 7 PM),
as the test environment is not accessible after working hours or on weekends.

## ⚠️ Note on Execution
This project integrated with secure UAT APIs which require internal credentials (Accessible only to authorized users) 
Due to security reasons, API keys and secrets are not included in the repository.
The project can not be executed externally without valid access

Author :
Sagar Pawar
