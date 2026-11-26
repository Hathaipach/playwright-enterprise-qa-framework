import type { Page } from '@playwright/test';
export class ShopPage {
  constructor(private readonly page: Page) {}
  readonly cart = () => this.page.getByRole('status');
  async open() { await this.page.goto('/'); }
  async addCoffee() { await this.page.getByRole('button', { name: 'Add Coffee' }).click(); }
}
