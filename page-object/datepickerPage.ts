import { Page, expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatepickerPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async selectDateFromToday(numbersOfDay: number) {
    const datepicker = this.page.locator('[placeholder="Form Picker"]');
    await datepicker.click();
    const assertDate = await this.selectDateCalendar(numbersOfDay);
    await expect(datepicker).toHaveValue(assertDate);

  }

  async selectDatepickerWithRange(startDayFromToday: number, endDayFromToday: number) {
    const datepicker = this.page.locator('[placeholder="Range Picker"]');
    await datepicker.click();
    const startDate = await this.selectDateCalendar(startDayFromToday);
    const endDate = await this.selectDateCalendar(endDayFromToday);
    const dateToAssert = `${startDate} - ${endDate}`;
    await expect(datepicker).toHaveValue(dateToAssert);
  }
  

  private async selectDateCalendar(numbersOfDay: number) {
    let date = new Date();
    date.setDate(date.getDate() + numbersOfDay);
    const expectedDate = date.getDate().toString()
    const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
    const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
  
    let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
    const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
    while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
      await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
      calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
    }
    await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).click();
    return dateToAssert;
  }
}