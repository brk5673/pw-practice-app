import {test} from '../test-options';
import { PageManager } from '../page-object/pageManager';
import { faker } from '@faker-js/faker';


test('parametrized methods', async ({ pageManager }) => {
  const randomEmail = faker.internet.email();

  await pageManager.formLayouts().submitUsingCredentials(process.env.USERNAME, process.env.PASSWORD, 'Option 1');
  await pageManager.navigateTo().goToDatepickerPage()
  await pageManager.datepicker().selectDateFromToday(2);
  await pageManager.datepicker().selectDatepickerWithRange(3, 4);

})