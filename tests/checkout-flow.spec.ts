import { test } from './fixtures/pages.fixture';

test('Add product to the cart and start the checkout process', async ({ loggedInInventoryPage: inventoryPage, cartPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
  await inventoryPage.addToCart('sauce-labs-backpack');
  await inventoryPage.expectCartBadge('1');
  await inventoryPage.goToCart();

  await cartPage.expectLoaded();
  await cartPage.proceedToCheckout();

  await checkoutStepOnePage.expectLoaded();
  await checkoutStepOnePage.fillInformation('John', 'Doe', '12345');
  await checkoutStepOnePage.clickContinue();

  await checkoutStepTwoPage.expectLoaded();
});
