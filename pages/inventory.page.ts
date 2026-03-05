import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  private readonly cartBadge: Locator;
  private readonly cartLink: Locator;

  constructor(protected page: Page) {
    super(page, /.*inventory.html/);
    this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
    this.cartLink = page.locator('[data-test="shopping-cart-link"]');
  }

  async expectLoaded() {
    await super.expectLoaded();
    await expect(this.page.locator('.inventory_item')).toHaveCount(6);
  }

  async addToCart(productDataTest: string) {
    await this.page.locator(`[data-test="add-to-cart-${productDataTest}"]`).click();
  }

  async expectCartBadge(count: string) {
    await expect(this.cartBadge).toHaveText(count);
  }

  async goToCart() {
    await this.cartLink.click();
  }
}
