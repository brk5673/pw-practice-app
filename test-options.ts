import { test as base } from '@playwright/test';

export type TestOptions = {
  globalsQAURL: string;
}

export const test = base.extend<TestOptions>({
  globalsQAURL: ['', { option: true }]
})