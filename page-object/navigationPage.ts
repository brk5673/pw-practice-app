import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {
  private element = {
    forms: '[title="Form Layouts"]',
    toaster: '[title="Toastr"]',
    tooltip: '[title="Tooltip"]',
    table: '[title="Smart Table"]',
    datepicker: '[title="Datepicker"]'
  }
  constructor(page: Page) {
    super(page);
  }

  async goToFormsPage() {
    await this.groupMenu('Forms');
    await this.page.locator(this.element.forms).click();
  }

  async goToToasterPage() {
    await this.groupMenu('Modal & Overlays')
    await this.page.locator(this.element.toaster).click()
  }

  async goToTooltipPage() {
    await this.groupMenu('Modal & Overlays')
    await this.page.locator(this.element.tooltip).click()
  }

  async goToTablePage() {
    await this.groupMenu('Tables & Data')
    await this.page.locator(this.element.table).click();
  }

  async goToDatepickerPage() {
    await this.groupMenu('Forms')
    await this.page.locator(this.element.datepicker).click();
    await this.page.locator(this.element.datepicker).screenshot({ path: `screenshots/datepicker.png` });
  }

  private async groupMenu(group: string) {
    const groupMenu = this.page.locator(`[title="${group}"]`);
    const expandedState = await groupMenu.getAttribute('aria-expanded');
    if (expandedState == 'false') 
      await groupMenu.click();
    
  }

}  