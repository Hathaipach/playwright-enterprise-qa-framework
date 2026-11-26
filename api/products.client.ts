import type { APIRequestContext } from '@playwright/test';
export class ProductsClient {
  constructor(private readonly request: APIRequestContext) {}
  get(id: string) { return this.request.get(`/api/products/${encodeURIComponent(id)}`); }
}
