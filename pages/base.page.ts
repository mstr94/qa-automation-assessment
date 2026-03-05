import { Page, expect } from '@playwright/test';

export abstract class BasePage {
  constructor(protected page: Page, protected urlPattern: RegExp | string) {}

  async expectLoaded() {
    await expect(this.page).toHaveURL(this.urlPattern);
  }
}