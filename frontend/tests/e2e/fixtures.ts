import { test as base } from '@playwright/test';
import { setupClerkTestingToken } from '@clerk/testing/playwright';

export const test = base.extend({
  page: async ({ page }, use) => {
    // Inject the Clerk testing token automatically into every page
    await setupClerkTestingToken({ page });

    // Mock legacy token for Angular AuthGuard which hasn't been migrated to Clerk yet
    await page.goto('/auth/login');
    await page.evaluate(() => {
      window.localStorage.setItem('autocheck_token', 'fake-jwt-token');
      window.localStorage.setItem('autocheck_user', JSON.stringify({ id: 'u1', name: 'Test User', email: 'test@test.com' }));
    });

    await use(page);
  },
});

export { expect } from '@playwright/test';
