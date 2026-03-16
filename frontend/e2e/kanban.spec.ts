import { test, expect } from '@playwright/test';

test.describe('Kanban board', () => {
  test('shows initial board', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Product Delivery')).toBeVisible();
    await expect(page.getByText('Define MVP scope')).toBeVisible();
  });
});

