import { test, expect } from './fixtures/pages.fixture';

test.describe('Login scenarios', () => {
  test('Successful login using standard_user', async ({ loginPage, inventoryPage }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await inventoryPage.expectLoaded();
  });

  test('Failed login using locked_out_user', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectError('Epic sadface: Sorry, this user has been locked out.');
  });
});
