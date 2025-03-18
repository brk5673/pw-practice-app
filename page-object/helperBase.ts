import { Page } from "@playwright/test";

export class HelperBase {
  constructor(page: Page) {
    this.page = page;
  }
  readonly page: Page;

  async waitForNumberOfSeconds(seconds: number) {
    const milliseconds = seconds * 1000;
    await this.page.waitForTimeout(milliseconds);
  }
}