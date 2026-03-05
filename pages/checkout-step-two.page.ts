import { Page, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutStepTwoPage extends BasePage {
  constructor(protected page: Page) {
    super(page, /.*checkout-step-two.html/);
  }

  async expectLoaded() {
    await super.expectLoaded();
    await expect(this.page.locator('[data-test="finish"]')).toBeVisible();
  }
}
