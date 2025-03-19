import { defineConfig, devices } from '@playwright/test';
import type { TestOptions } from './test-options';

require('dotenv').config();

export default defineConfig<TestOptions>({
  timeout: 40000,
  globalTimeout: 60000,
  retries: 1,
  reporter: [
    ['html'],
    ['list'],
    ['json', { outputFile: 'test-results/jsonReport.json' }],
    ['allure-playwright'],
  ],
  use: {
    baseURL: 'http://localhost:4200/',
    globalsQAURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    trace: 'on-first-retry',
    navigationTimeout: 5000,
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 },
    }
  },

  projects: [
    {
      name: 'dev',
      use: { ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:4200/',
      },
    },
    {
      name: 'chromium',
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
      }
    },
    {
      name: 'mobile',
      testMatch: 'testMobile.spec.ts',
      use: {
        ...devices['iPhone 15 Pro'],
        headless: false,
      }
    },
  ]
});
