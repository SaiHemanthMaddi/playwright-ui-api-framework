# Playwright UI & API Testing Framework

A comprehensive test automation framework built with Playwright and TypeScript, featuring both UI and API testing with Allure reporting.

## Features

- UI testing using Page Object Model (POM)
- API testing for REST endpoints
- TypeScript for type-safe tests
- Allure reports for detailed results
- Cross-browser support (Chromium, Firefox, WebKit)
- Parallel execution

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd playwright-ui-api-framework
```

2. Install dependencies:

```bash
npm install
```

3. Install Playwright browsers:

```bash
npx playwright install
```

## Project Structure

```
playwright-ui-api-framework/
|-- pages/                      # Page Object Models
|   |-- BasePage.ts             # Base page with common methods
|   |-- LoginPage.ts            # Login page objects
|   `-- ProductsPage.ts         # Products page objects
|-- tests/                      # Test specifications
|   |-- ui/                     # UI tests
|   |   |-- login.spec.ts       # Login test scenarios
|   |   `-- products.spec.ts    # Product page tests
|   `-- api/                    # API tests
|       |-- auth.api.spec.ts    # Posts API CRUD tests
|       `-- users.api.spec.ts   # Users API tests
|-- helpers/                    # Helper functions
|   |-- apiClient.ts            # API client configuration
|   `-- test-data.ts            # Test data constants
|-- utils/                      # Utility functions
|   `-- logger.ts               # Logging utility
|-- allure-results/             # Allure test results
|-- test-results/               # Playwright test results
|-- playwright.config.ts        # Playwright configuration
|-- tsconfig.json               # TypeScript configuration
`-- package.json                # Project dependencies
```

## Running Tests

### Run All Tests

```bash
npm test
```

### Run UI Tests Only

```bash
npm run test:ui
```

### Run API Tests Only

```bash
npm run test:api
```

### Run Tests in Headed Mode

```bash
npm run test:headed
```

### Run Specific Test File

```bash
npx playwright test tests/ui/login.spec.ts
```

### Run Tests in Debug Mode

```bash
npx playwright test --debug
```

### Typecheck

```bash
npm run typecheck
```

## Test Reports

### Generate Allure Report

```bash
npm run allure:generate
```

### Open Allure Report

```bash
npm run allure:open
```

## Scheduled Runs

- Jenkins: Nightly at 9:00 PM Africa/Johannesburg.
- GitHub Actions: Nightly at 9:00 PM Africa/Johannesburg (19:00 UTC).

## Test Coverage

### UI Tests (SauceDemo)

- Login tests (5 scenarios)
- Products tests (7 scenarios)

### API Tests (JSONPlaceholder)

- Posts API tests (8 scenarios)
- Users API tests (5 scenarios)

## Configuration

### Playwright Config (playwright.config.ts)

- Test directory: ./tests
- Timeout: 30 seconds
- Base URL: https://www.saucedemo.com
- Headless mode: enabled by default
- Screenshots: captured on failure
- Videos: recorded on failure
- Trace: retained on failure
- Reporters: list, Allure, HTML

### API Base URL

- JSONPlaceholder: https://jsonplaceholder.typicode.com
- Override with API_BASE_URL environment variable

## Writing Tests

### UI Test Example

```typescript
import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";

test("Valid login", async ({ page }) => {
  const login = new LoginPage(page);
  await login.navigate("/");
  await login.login("standard_user", "secret_sauce");
  await expect(page).toHaveURL(/.*inventory.html/);
});
```

### API Test Example

```typescript
import { test, expect } from "@playwright/test";
import { apiClient } from "../../helpers/apiClient";

test("Get users", async () => {
  const api = await apiClient();
  const response = await api.get("/users");
  expect(response.status()).toBe(200);
  await api.dispose();
});
```

## Page Object Model

The framework uses the Page Object Model pattern for better maintainability:

```typescript
export class LoginPage extends BasePage {
  username = this.page.locator('#user-name');
  password = this.page.locator('#password');
  loginBtn = this.page.locator('#login-button');

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Resources

- Playwright Documentation: https://playwright.dev/
- TypeScript Documentation: https://www.typescriptlang.org/
- Allure Report: https://docs.qameta.io/allure/
- SauceDemo Test Site: https://www.saucedemo.com/
- JSONPlaceholder API: https://jsonplaceholder.typicode.com/

## Author

Created with care using Playwright and TypeScript.
