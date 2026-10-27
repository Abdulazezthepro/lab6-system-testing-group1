import { test, expect } from '@playwright/test';

/**
 * INFS4202 - Lab 6 - OPTIONAL E2E automation (not graded in Lab 6)
 *
 * System under test: Swag Labs - https://www.saucedemo.com
 *
 * The kit ships configured for practice.qabrains.com, but that host was unreachable from our
 * network throughout the lab (browser error page on every attempt). The lab instructions name
 * saucedemo.com as the target application, so these tests run against it. Set
 * `baseURL: 'https://www.saucedemo.com'` in playwright.config.ts (see the copy in this repo).
 *
 * Rules followed:
 *   - user-facing locators only (getByRole / getByLabel / getByPlaceholder / getByText)
 *   - web-first assertions (await expect(...))
 *   - no page.waitForTimeout(...)
 */

const USER = { name: 'standard_user', password: 'secret_sauce' };

/** Log in through the real form, the way a user would. */
async function login(page, username: string, password: string) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(username);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();
}

test('E2E-1: a user can log in with valid credentials', async ({ page }) => {
  await login(page, USER.name, USER.password);

  // ASSERT: the user lands on the products page
  await expect(page).toHaveURL(/inventory\.html/);
  await expect(page.getByText('Products', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add to cart' }).first()).toBeVisible();
});

test('E2E-2: login with a wrong password shows an error message', async ({ page }) => {
  await login(page, USER.name, 'wrong_password');

  // ASSERT: the error is shown and the user stays on the login page
  await expect(
    page.getByText('Epic sadface: Username and password do not match any user in this service'),
  ).toBeVisible();
  await expect(page).not.toHaveURL(/inventory\.html/);
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('E2E-3: adding a product updates the cart', async ({ page }) => {
  // ARRANGE
  await login(page, USER.name, USER.password);
  await expect(page).toHaveURL(/inventory\.html/);

  // ACT: add one specific product to the cart
  const backpack = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' });
  await expect(backpack.getByText('$29.99')).toBeVisible();
  await backpack.getByRole('button', { name: 'Add to cart' }).click();

  // ASSERT: the badge counts it, and the button flips to Remove
  await expect(page.getByRole('button', { name: 'Cart, 1 items' })).toBeVisible();
  await expect(backpack.getByRole('button', { name: 'Remove' })).toBeVisible();

  // ASSERT: the cart lists the product with the correct price
  await page.getByRole('button', { name: 'Cart, 1 items' }).click();
  await expect(page).toHaveURL(/cart\.html/);
  const cartLine = page.locator('.cart_item').filter({ hasText: 'Sauce Labs Backpack' });
  await expect(cartLine).toBeVisible();
  await expect(cartLine.getByText('$29.99')).toBeVisible();
});

/**
 * E2E-4: one bug from our GitHub Issues, written as an automated test.
 *
 * Issue: "Checkout accepts a Postal Code made only of spaces".
 * The assertion below describes the CORRECT behaviour: a required field must reject whitespace.
 * test.fail() means Playwright reports this as "expected to fail" while the bug exists, and
 * warns us with "unexpectedly passed" on the day it is fixed -> time to retest the Issue.
 */
test('E2E-4 (Issue: whitespace postal code): checkout must reject a blank-but-spaces Postal Code', async ({
  page,
}) => {
  test.fail(true, 'Known bug - whitespace satisfies the required Postal Code field');

  await login(page, USER.name, USER.password);
  await page
    .locator('.inventory_item')
    .filter({ hasText: 'Sauce Labs Backpack' })
    .getByRole('button', { name: 'Add to cart' })
    .click();

  await page.getByRole('button', { name: 'Cart, 1 items' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();

  await page.getByPlaceholder('First Name').fill('Monir');
  await page.getByPlaceholder('Last Name').fill('Skik');
  await page.getByPlaceholder('Zip/Postal Code').fill('   '); // three spaces
  await page.getByRole('button', { name: 'Continue' }).click();

  // EXPECTED: validation rejects it and we stay on the information step.
  // ACTUAL: the app accepts it and moves on to Checkout: Overview.
  await expect(page.getByText(/Postal Code is required/i)).toBeVisible();
  await expect(page).toHaveURL(/checkout-step-one\.html/);
});
