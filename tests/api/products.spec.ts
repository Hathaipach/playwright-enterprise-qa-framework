import { test, expect } from '../../fixtures/test';
import { products } from '../../data/products';
test('gets existing product @smoke', async ({ productsApi }) => {
  // Arrange
  const expected = products.coffee;
  // Act
  const response = await productsApi.get(expected.id);
  // Assert
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual(expected);
});
test('returns 404 for unknown product', async ({ productsApi }) => {
  // Arrange
  const id = 'missing';
  // Act
  const response = await productsApi.get(id);
  // Assert
  expect(response.status()).toBe(404);
  expect(await response.json()).toEqual({ error: 'Not found' });
});
