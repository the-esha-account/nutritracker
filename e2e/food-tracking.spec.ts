import { test, expect } from '@playwright/test';

test.describe('Food Tracking', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173');
    // Clear localStorage before each test
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('full user flow - add and delete food', async ({ page }) => {
    // Verify page loaded
    await expect(page.locator('h1')).toContainText('NutriTracker');
    
    // Add first food item
    await page.getByLabel('Food Name').fill('Banana');
    await page.getByLabel('Calories').fill('105');
    await page.getByRole('button', { name: /add food/i }).click();
    
    // Verify it appears in the list
    await expect(page.getByText('Banana')).toBeVisible();
    await expect(page.getByText('- 105 cal')).toBeVisible();
    await expect(page.getByText('Total: 105 cal')).toBeVisible();
    
    // Add second food item
    await page.getByLabel('Food Name').fill('Apple');
    await page.getByLabel('Calories').fill('95');
    await page.getByRole('button', { name: /add food/i }).click();
    
    // Verify total updates
    await expect(page.getByText('Apple')).toBeVisible();
    await expect(page.getByText('- 95 cal')).toBeVisible();
    await expect(page.getByText('Total: 200 cal')).toBeVisible();
    
    // Delete first item
    await page.getByRole('button', { name: /delete/i }).first().click();
    
    // Verify it's removed and total updates
    await expect(page.getByText('Banana')).not.toBeVisible();
    await expect(page.getByText('Total: 95 cal')).toBeVisible();
  });

  test('validates empty form submission', async ({ page }) => {
    await page.getByRole('button', { name: /add food/i }).click();
    
    await expect(page.getByText(/please enter a valid food name/i)).toBeVisible();
  });

  test('data persists after page reload', async ({ page }) => {
    // Add food
    await page.getByLabel('Food Name').fill('Orange');
    await page.getByLabel('Calories').fill('62');
    await page.getByRole('button', { name: /add food/i }).click();
    
    // Verify it was added
    await expect(page.getByText('Orange')).toBeVisible();
    
    // Reload page
    await page.reload();
    
    // Verify food is still there after reload
    await expect(page.getByText('Orange')).toBeVisible();
    await expect(page.getByText('- 62 cal')).toBeVisible();
  });
});
