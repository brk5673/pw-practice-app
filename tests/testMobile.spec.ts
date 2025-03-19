import { test } from '@playwright/test';

test('Mobile test inputs fields', async ({ page }) => {
  await page.goto('/');
  const toggleBar = page.locator('.sidebar-toggle')
  await toggleBar.click();
  await page.click('text=Forms');
  await page.click('text=Form Layouts');
  await toggleBar.click();

  const usingGridEmail = page.locator('nb-card', {hasText: 'Using the Grid'}).locator('input[placeholder="Email"]');
  await usingGridEmail.fill('test@test.com');
  await usingGridEmail.clear();
  await usingGridEmail.fill('test2@2.com.ar');
  })