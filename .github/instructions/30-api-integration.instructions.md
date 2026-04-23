---
applyTo: "front-end/src/**/*.{ts,tsx}"
---

# 30 — API Integration

## Purpose
Define how all backend API calls must be structured, typed, and connected to the UI.

---

## When this rule applies
Any time you write, modify, or review code that makes HTTP requests or handles API responses.

---

## HTTP client: Axios only

- **Use Axios.** No raw `fetch`. No other HTTP libraries.
- If Axios is not yet installed: `npm install axios` from the `front-end/` directory.
- All Axios usage goes through the shared client instance, not through direct `axios.get()` calls in component files.

---

## API layer structure

```
src/api/
  client.ts         # Axios instance — base URL, interceptors, default headers
  dto/              # Raw response types exactly matching what the API returns
  adapters/         # Functions that transform DTO → domain type
  <domain>.ts       # Service functions: one file per API domain (products, orders, etc.)
```

### client.ts minimum pattern

```ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
```

Add auth token interceptors in `client.ts` when authentication is implemented.

### DTO pattern

```ts
// src/api/dto/product.dto.ts
// TODO: replace with real API contract when available
export interface ProductDto {
  product_id: string;
  product_name: string;
  unit_price: number;
}
```

### Adapter pattern

```ts
// src/api/adapters/product.adapter.ts
import type { ProductDto } from '../dto/product.dto';
import type { Product } from '../../features/products/types';

export function adaptProduct(dto: ProductDto): Product {
  return {
    id: dto.product_id,
    name: dto.product_name,
    price: dto.unit_price,
  };
}
```

### Service function pattern

```ts
// src/api/products.ts
import { apiClient } from './client';
import { adaptProduct } from './adapters/product.adapter';
import type { Product } from '../features/products/types';

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<ProductDto[]>('/products');
  return data.map(adaptProduct);
}
```

---

## Hooks wrap service functions

API calls must not appear directly in component files. Wrap them in a custom hook inside
the feature's `hooks/` folder:

```ts
// src/features/products/hooks/useProducts.ts
import { useState, useEffect } from 'react';
import { fetchProducts } from '../../../api/products';
import type { Product } from '../types';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => setError('Failed to load products'))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
}
```

---

## Environment variables

- Base URL: `VITE_API_BASE_URL` — must be set in `.env` or `.env.local`.
- Never hardcode base URLs.
- All Vite env vars must be prefixed with `VITE_`.

---

## Error handling requirements

- Every async operation must handle errors — no silent failures.
- Surface errors to the UI with a user-readable message.
- Log errors to `console.error` as a minimum until a proper logging solution is in place.
- Do not expose raw Axios error objects directly in component state.

---

## Forbidden patterns

- No `fetch()` calls anywhere.
- No raw `axios.get()` / `axios.post()` calls in component or page files.
- No hardcoded API base URLs in source code.
- No `any` as a response type annotation.
- No guessing API response shapes — mark unknowns with `// TODO: replace with real contract`.
- No API logic in JSX return statements.

---

## Done criteria

- [ ] Axios client instance created in `src/api/client.ts`
- [ ] DTO type defined in `src/api/dto/`
- [ ] Adapter written in `src/api/adapters/`
- [ ] Service function written in `src/api/<domain>.ts`
- [ ] Hook wraps service function in `src/features/<feature>/hooks/`
- [ ] Component uses the hook, not the service function directly
- [ ] Base URL read from `import.meta.env.VITE_API_BASE_URL`
- [ ] Error state handled and surfaced in UI
