import {test, expect} from '@playwright/test';
import { PageManager } from '../page-object/pageManager';
import { faker } from '@faker-js/faker';

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200/');
});

test('navigate to pages', async ({page}) => {
  const pm = new PageManager(page);
  await pm.navigateTo().goToFormsPage();
  await pm.navigateTo().goToDatepickerPage();
  await pm.navigateTo().goToTablePage();
  await pm.navigateTo().goToToasterPage();
  await pm.navigateTo().goToTooltipPage()

});
/**
 * This test is using the page-object model to interact with the form layout page
 */
test('parametrized methods', async ({page}) => {
  const pm = new PageManager(page);
  const randomEmail = faker.internet.email();
  console.log(randomEmail);
   
  await pm.navigateTo().goToFormsPage();
  await page.screenshot({ path: `screenshots/${randomEmail}.png` });
  await pm.formLayouts().submitUsingCredentials(randomEmail, '123456', 'Option 1');
  await pm.navigateTo().goToDatepickerPage()
  await pm.datepicker().selectDateFromToday(2);
  await pm.datepicker().selectDatepickerWithRange(3, 4);

})