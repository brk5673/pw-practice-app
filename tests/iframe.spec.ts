import { expect } from '@playwright/test';
import { test } from '../test-options';

test('drag and drop with iframe', async ({page, globalsQAURL}) => {
  page.goto(globalsQAURL);
  const iframe = page.frameLocator('[rel-title="Photo Manager"] iframe'); // frame locator for iframe
  await iframe.locator('li', {hasText: 'High Tatras 2'}).dragTo(iframe.locator('#trash'));

  await iframe.locator('li', {hasText: 'High Tatras 3'}).hover();
  page.mouse.down(); //simula accion de hacer click y mantener
  await iframe.locator('#trash').hover(); //hover se posa con el mouse sobre...
  page.mouse.up(); //simula accion de soltar click

  await expect(iframe.locator('#trash li h5')).toHaveText(['High Tatras 2', 'High Tatras 3']);
})