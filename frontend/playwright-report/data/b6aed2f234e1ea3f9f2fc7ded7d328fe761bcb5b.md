# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication >> deve renderizar a tela de login
- Location: tests\e2e\auth.spec.ts:4:7

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
Call log:
  - navigating to "http://localhost:3000/login", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication', () => {
  4  |   test('deve renderizar a tela de login', async ({ page }) => {
  5  |     // Navigate to the login page (assuming the route is /login)
> 6  |     await page.goto('/login');
     |                ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:3000/login
  7  |     
  8  |     // Check if the login form is present
  9  |     await expect(page.locator('form')).toBeVisible();
  10 |     await expect(page.locator('input[type="email"]')).toBeVisible();
  11 |     await expect(page.locator('input[type="password"]')).toBeVisible();
  12 |     await expect(page.locator('button[type="submit"]')).toBeVisible();
  13 |   });
  14 |   
  15 |   test('deve renderizar a tela de cadastro', async ({ page }) => {
  16 |     // Navigate to the register page (assuming the route is /register)
  17 |     await page.goto('/register');
  18 |     
  19 |     // Check if the register form is present
  20 |     await expect(page.locator('form')).toBeVisible();
  21 |     await expect(page.locator('input[formControlName="name"]')).toBeVisible();
  22 |     await expect(page.locator('input[type="email"]')).toBeVisible();
  23 |     await expect(page.locator('input[type="password"]')).toBeVisible();
  24 |     await expect(page.locator('button[type="submit"]')).toBeVisible();
  25 |   });
  26 | });
  27 | 
```