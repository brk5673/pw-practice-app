import test, { expect } from '@playwright/test';

test.beforeEach('first test', async ({page}) => {
  await page.goto('http://localhost:4200/');
  await page.locator("[title='Forms']").click();
  await page.locator("[title='Form Layouts']").click();
});

test('locator syntax rules', async ({page}) => {
  // by TAG
  await page.locator('input');
  // by ID
  await page.locator('#input').click();
  // by CLASS
  await page.locator('.input');
  // by partial text match
  await page.locator(':text("Using")');
  // by exact text match
  await page.locator(':text-is("Using the Grid")');
})

test('locating child elements', async ({page}) => {
await page.locator('nb-card nb-radio :text-is("Option 1")').click(); // locator separated by space means child locator
await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click();
});

test('locating parents elements', async ({page}) => {
  await page.locator('nb-card', {hasText: 'Using the Grid'}).getByPlaceholder('Email').click();
  await page.locator('nb-card', {has: page.locator('#inputEmail1')}).getByPlaceholder('Password').click();

  await page.locator('nb-card').filter({has: page.locator('nb-checkbox')}).filter({hasText: 'Sign in'}).locator('[id*="Email"]').click(); //filter by child locator which has text 'Sign in' and checkbox
});

test('reuse locators', async ({page}) => {
  const basicCard = page.locator('nb-card', {hasText: 'Basic Form'});
  await basicCard.locator('[id*="Email"]').fill('email@test.com');
  await basicCard.locator('[id*="Password"]').fill('passwordHere');
  await basicCard.locator('button').click();

  await expect(basicCard.locator('[id*="Email"]')).toHaveValue('email@test.com')
});

test('extracting values', async ({page}) => {
  const blockCard = page.locator('nb-card', {hasText: 'Block Form'});
  await blockCard.locator('#inputFirstName').fill('Jose');
  const firstName = await blockCard.locator('#inputFirstName').inputValue();
  expect(firstName).toEqual('Jose');

  const allButtonValues = await blockCard.locator('button').allInnerTexts();
  console.log(allButtonValues);
  expect(allButtonValues).toEqual(['SUBMIT']);
})

test('assertions', async ({page}) => {
  //locator assertions
  await expect(page.locator('nb-card')).toHaveText('Using the Grid');

  //soft assertions => busca hacer la validacion pero sino continua de todas formas
  const blockCard = page.locator('nb-card', {hasText: 'Block Form'});
  await blockCard.locator('#inputFirstName').fill('Jose');


})