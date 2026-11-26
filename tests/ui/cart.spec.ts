import { test, expect } from '../../fixtures/test';
import { products } from '../../data/products';
test('adds coffee to cart @smoke', async ({ shop }) => {
  // Arrange
  await shop.open();
  // Act
  await shop.addCoffee();
  // Assert
  await expect(shop.cart()).toHaveText(`1 item(s) | THB ${products.coffee.price}`);
});
test('starts with an empty cart', async ({ shop }) => {
  // Arrange
  await shop.open();
  // Act: read initial cart state
  const cart = shop.cart();
  // Assert
  await expect(cart).toHaveText('0 item(s) | THB 0');
});
