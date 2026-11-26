import { test as base, expect } from '@playwright/test';
import { ShopPage } from '../pages/shop.page';
import { ProductsClient } from '../api/products.client';
export const test = base.extend<{ shop: ShopPage; productsApi: ProductsClient }>({
  shop: async ({ page }, use) => { await use(new ShopPage(page)); },
  productsApi: async ({ request }, use) => { await use(new ProductsClient(request)); },
});
export { expect };
