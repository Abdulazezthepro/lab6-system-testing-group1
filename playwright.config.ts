import { defineConfig, devices } from '@playwright/test';

/**
 * INFS4202 - Lab 6 - Playwright configuration (Group 1)
 * Same as the kit's config, with baseURL pointed at the system under test named in the
 * lab instructions. Drop this next to the kit's own config, or copy the baseURL line into it.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: { timeout: 5_000 },
  fullyParallel: true,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'], channel: process.env.PW_CHANNEL || 'msedge' },
    },
  ],
});
