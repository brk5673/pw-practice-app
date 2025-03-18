import { test as base } from '@playwright/test';
import { format } from 'path';
import { PageManager } from '../pw-practice-app/page-object/pageManager';

export type TestOptions = {
  globalsQAURL: string;
  formLayouts: string;
  pageManager: PageManager;
}

export const test = base.extend<TestOptions>({
  globalsQAURL: ['', { option: true }],

  formLayouts: [async({ page }, use) => {
    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
    await use(''); // This is the value that will be passed to the test
  }, {auto: true}],

  pageManager: async({ page }, use) => {
    const pm = new PageManager(page);
    await use(pm);
  }
})