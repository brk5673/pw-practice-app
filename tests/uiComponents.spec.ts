import { test, expect } from '@playwright/test';

test.beforeEach( async ({page}) => {
  await page.goto('http://localhost:4200/');
});

test.describe('form layout page', () => {
  test.describe.configure({ retries: 2 });
  
  test.beforeEach( async ({page}) => {
    await page.locator("[title='Forms']").click();
    await page.locator("[title='Form Layouts']").click();
  });

  test('inputs fields', async ({page}) => {
    const emailOnGridCard = page.locator('nb-card', {hasText: 'Using the Grid'}).locator('[id*="Email"]');
    await emailOnGridCard.fill('jose@test.com');
    await emailOnGridCard.clear();
    await emailOnGridCard.pressSequentially('jose2@testing.com', {delay: 100});

    //generic assertions
    const inputsValue = await emailOnGridCard.inputValue();
    expect(inputsValue).toEqual('jose2@testing.com');

    //locator assertions
    await expect(emailOnGridCard).toHaveValue('jose2@testing.com');
  });

  test('radio buttons', async ({page}) => {
    const gridCard = page.locator('nb-card', {hasText: 'Using the Grid'})
    await gridCard.locator(':text-is("Option 1")').check({force: true});

    const radioStatus = await gridCard.locator(':text-is("Option 1")').isChecked();
    expect(radioStatus).toBeTruthy();

    await gridCard.locator(':text-is("Option 2")').check({force: true});
    const radioStatus2 = await gridCard.locator(':text-is("Option 2")').isChecked();
    expect(radioStatus2).toBeTruthy();

  });

  test('checkboxes', async ({page}) => {
    await page.locator('[title="Modal & Overlays"]').click()
    await page.locator('[title="Toastr"]').click()
    await page.getByRole('checkbox', {name: 'Hide on click'}).uncheck({force: true});
    await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).check({force: true});
    expect(await page.getByRole('checkbox', {name: 'Prevent arising of duplicate toast'}).isChecked()).toBeTruthy();

    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) {
      await box.check({force: true});
      expect(await box.isChecked()).toBeTruthy();
    }
  })

  test('lists and dd', async ({page}) => {
    const ddElement = page.locator('ngx-header nb-select')
    await ddElement.click();

    // page.getByRole('list') //when list has ul tag
    // page.getByRole('listitem') //when list has li tag

    const optionList = page.locator('nb-option-list nb-option');
    await expect(optionList).toHaveText(['Light', 'Dark', 'Cosmic', 'Corporate']);
    await optionList.filter({hasText: 'Cosmic'}).click();

    const header = page.locator('nb-layout-header');
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)');

    const colors = {
      'Light': 'rgb(255, 255, 255)',
      'Dark': 'rgb(34, 43, 69)',
      'Cosmic': 'rgb(50, 50, 89)',
      'Corporate': 'rgb(255, 255, 255)'
    }

    await ddElement.click();
    for (const color in colors) {
      await optionList.filter({hasText: color}).click();
      await expect(header).toHaveCSS('background-color', colors[color]);
      await ddElement.click();
      if(color === 'Corporate') break;
    }
  })
});

test('tooltip', async ({page}) => {
  await page.locator('[title="Modal & Overlays"]').click()
  await page.locator('[title="Tooltip"]').click()
  const placementCard = await page.locator('nb-card', {hasText: 'Tooltip Placements'});
  await placementCard.locator('button', {hasText: 'top'}).hover();

  // page.getByRole('tooltip') // when tooltip has a role created
  const tooltip = await page.locator('nb-tooltip').textContent();
  expect(tooltip).toEqual('This is a tooltip');
})

test('dialog box', async ({page}) => {
  await page.locator('[title="Tables & Data"]').click();
  await page.locator('[title="Smart Table"]').click();

  const rowMark = page.locator('tbody tr', {hasText: 'mdo@gmail.com'});

  page.on('dialog', dialog => {
    expect(dialog.message()).toEqual('Are you sure you want to delete?');
    dialog.accept();
  })
  await rowMark.locator('.nb-trash').click();
  expect(await rowMark.count()).toEqual(0);
})

test('tables', async ({page}) => {
  await page.locator('[title="Tables & Data"]').click();
  await page.locator('[title="Smart Table"]').click();

  const twRow = page.locator('tr', {hasText: 'twitter@outlook.com'});
  await twRow.locator('.nb-edit').click();
  await page.locator('input-editor [placeholder="E-mail"]').clear()
  await page.locator('input-editor [placeholder="E-mail"]').fill('jose@test.com');
  await page.locator('.nb-checkmark').click();

  await page.locator('.ng2-smart-page-link', {hasText: '2'}).click();
  const targetRowByID = page.locator('tbody tr', {hasText: '11'}).filter({has: page.locator('td').nth(1).getByText('11')});
  await targetRowByID.locator('.nb-edit').click();
  await page.locator('input-editor [placeholder="E-mail"]').clear()
  await page.locator('input-editor [placeholder="E-mail"]').fill('testing@inProduc.com');
  await page.locator('.nb-checkmark').click();


  const ages = ['20', '30', '40', '200'];
  for ( let age of ages) {
    await page.locator('input-filter [placeholder="Age"]').clear()
    await page.locator('input-filter [placeholder="Age"]').fill(age);
    await page.waitForTimeout(500);
    const ageRows = page.locator('tbody tr')

    for(let row of await ageRows.all()) {
      const cellValue = await row.locator('td').last().textContent();

      if (age === '200') {
        const notFound = await page.locator('tbody', {hasText: 'No data found'})
        expect(notFound).toBeTruthy
      } else {
        expect(cellValue).toEqual(age);
      }
    }
  }
})

test('datepicker', async ({page}) => {
  await page.locator('[title="Forms"]').click();
  await page.locator('[title="Datepicker"]').click();

  const datepicker = page.locator('[placeholder="Form Picker"]');
  await datepicker.click();

  let date = new Date();
  date.setDate(date.getDate() + 300);
  const expectedDate = date.getDate().toString()
  const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
  const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

  let calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
  while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
    await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
    calendarMonthAndYear = await page.locator('nb-calendar-view-mode').textContent();
  }
  await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate, {exact: true}).click();
  await expect(datepicker).toHaveValue(dateToAssert);
})

test('sliders', async ({page}) => {
  const tempSlider = page.locator('[tabtitle="Temperature"] circle');
  await tempSlider.evaluate( node => {
    node.setAttribute('cx', '232.630')
    node.setAttribute('cy', '232.630')
  })
  await tempSlider.click();

  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger');
  await tempBox.scrollIntoViewIfNeeded();

  const box = await tempBox.boundingBox();
  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y +100);
  await page.mouse.up();
  await expect(tempBox).toContainText('30');
})
