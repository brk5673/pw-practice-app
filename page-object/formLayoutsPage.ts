import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {
  private element = {
    email: '#inputEmail1',
    password: '#inputPassword2',
    submitButton: 'button[type="submit"]'
  }
  constructor(page: Page) {
    super(page);
  }

  /**
   * 
   * @param email - valid email address
   * @param password - valid password
   * @param checkbox - option 1, option 2, option 3
   */
  async submitUsingCredentials(email: string, password: string, checkbox: string) {
    const usingGridCard = await this.page.locator('nb-card', {hasText: ' Using the Grid'});
    await usingGridCard.locator('[type="email"]').fill(email);
    await this.waitForNumberOfSeconds(2);
    await usingGridCard.locator('[type="password"]').fill(password);
    await usingGridCard.locator('nb-radio').locator(`:text-is('${checkbox}')`).check({force: true});
    await usingGridCard.locator(this.element.submitButton).click();
  }

}