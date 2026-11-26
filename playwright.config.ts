import { defineConfig, devices } from '@playwright/test';
import { env } from './config/env';
export default defineConfig({
  testDir: './tests', fullyParallel: true, forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0, workers: process.env.CI ? 2 : undefined,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: { baseURL: env.baseURL, trace: 'retain-on-failure', screenshot: 'only-on-failure' },
  webServer: env.name === 'local' ? { command: 'node demo/server.cjs', url: 'http://127.0.0.1:4173/health', reuseExistingServer: !process.env.CI } : undefined,
  projects: [
    { name: 'desktop-chromium', testMatch: '**/ui/*.spec.ts', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chrome', testMatch: '**/ui/*.spec.ts', use: { ...devices['Pixel 7'] } },
    { name: 'mobile-webkit', testMatch: '**/ui/*.spec.ts', use: { ...devices['iPhone 13'] } },
    { name: 'api', testMatch: '**/api/*.spec.ts', use: { baseURL: env.apiURL, extraHTTPHeaders: env.token ? { Authorization: `Bearer ${env.token}` } : {} , trace: 'off' } },
  ],
});
