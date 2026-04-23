---
name: api-client-and-contracts
description: >
  Set up or extend the Axios API layer: client instance, DTO types, response adapters,
  domain service functions, and data-fetching hooks. Use when connecting any part of the
  UI to a backend API endpoint.
---

# Skill: API Client and Contracts

## What this skill is for
Building and maintaining the Axios-based API layer in ginsengfood-FE: the shared client
instance, typed DTOs, adapter/mapper functions, service functions, and the data-fetching
hooks that components consume.

---

## When to use this skill

- Setting up `src/api/client.ts` for the first time
- Adding a new API endpoint (new DTO + adapter + service function)
- Connecting a data-fetching hook to a new or changed endpoint
- Updating a DTO when the backend contract changes
- Adding request headers (auth tokens, content-type) to the Axios instance

---

## When NOT to use this skill

- You are only creating UI components that already have a working hook (use `screen-delivery`)
- You are only fixing visual inconsistencies (use `shared-ui-patterns`)
- You are running verification only (use `testing-and-verification`)

---

## Required inputs

- API endpoint: method + path (e.g., `GET /api/v1/products`)
- Response contract: exact field names and types as returned by the backend
  (if unknown, state explicitly — the agent will create placeholder DTOs)
- Auth requirements: none / Bearer token / session cookie
- Which component or hook will consume this data

---

## File reading order

1. `front-end/package.json` — confirm `axios` is installed
2. `front-end/src/api/client.ts` — current client configuration
3. `front-end/src/api/dto/` — existing DTO patterns
4. `front-end/src/api/adapters/` — existing adapter patterns
5. The feature's existing `api.ts` and `hooks/` if they exist
6. `.env` / `.env.local` — confirm `NEXT_PUBLIC_API_BASE_URL` is set

---

## Implementation checklist

### Axios client (`src/api/client.ts`)
- [ ] Created if not present
- [ ] Uses `process.env.NEXT_PUBLIC_API_BASE_URL` as `baseURL`
- [ ] No hardcoded URLs
- [ ] Auth interceptor added if authentication is required

```ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

// Add auth interceptor when needed:
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token');
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });
```

### DTO definition (`src/api/dto/<domain>.dto.ts`)
- [ ] Interface named `<Domain>Dto` with exact API field names (snake_case if that's the API convention)
- [ ] Marked with `// TODO: replace with real contract` if field names are not confirmed

```ts
// src/api/dto/product.dto.ts
export interface ProductDto {
  product_id: string;
  product_name: string;
  unit_price: number;
  is_active: boolean;
}
```

### Adapter (`src/api/adapters/<domain>.adapter.ts`)
- [ ] Function named `adapt<Domain>` mapping `<Domain>Dto → <Domain>`
- [ ] No business logic — pure field mapping only

```ts
import type { ProductDto } from '../dto/product.dto';
import type { Product } from '../../features/products/types';

export function adaptProduct(dto: ProductDto): Product {
  return {
    id: dto.product_id,
    name: dto.product_name,
    price: dto.unit_price,
    isActive: dto.is_active,
  };
}
```

### Service function (`src/api/<domain>.ts` or `src/features/<feature>/api.ts`)
- [ ] Uses `apiClient` — never bare `axios`
- [ ] Returns domain types (not DTOs) — adapter applied here
- [ ] Async function with typed return value

```ts
import { apiClient } from './client';
import { adaptProduct } from './adapters/product.adapter';
import type { Product } from '../features/products/types';

export async function fetchProducts(): Promise<Product[]> {
  const { data } = await apiClient.get<ProductDto[]>('/products');
  return data.map(adaptProduct);
}
```

### Data hook (`src/features/<feature>/hooks/use<Data>.ts`)
- [ ] Wraps the service function
- [ ] Manages `loading`, `error`, and `data` state
- [ ] Handles errors — sets `error` string, does not expose raw Axios errors

```ts
import { useState, useEffect } from 'react';
import { fetchProducts } from '../../../api/products';
import type { Product } from '../types';

export function useProducts() {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError(null);
    fetchProducts()
      .then(setData)
      .catch(() => setError('Failed to load products.'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  return { data, loading, error, retry: load };
}
```

---

## Verification checklist

- [ ] `npm run lint` passes — no TypeScript errors
- [ ] `npm run build` passes
- [ ] `apiClient` resolves to the correct base URL at runtime
- [ ] No `any` types in DTO, adapter, service function, or hook
- [ ] Component uses the hook return values: `{ data, loading, error, retry }`

---

## Common mistakes to avoid

- Never call `axios.get()` directly — always use `apiClient`.
- Never expose the raw Axios error object in component state — convert to a string.
- Never hardcode the base URL anywhere in source code.
- Never put the adapter logic inside the service function — keep them separate files.
- Never type response data as `any` — define the DTO even if it is a placeholder.

---

## Expected deliverables

```
front-end/src/api/
  client.ts                     # Axios instance (created or confirmed)
  dto/<domain>.dto.ts           # Raw API response types
  adapters/<domain>.adapter.ts  # DTO → domain type mapper

front-end/src/features/<feature>/
  api.ts                        # Service function(s)
  hooks/use<Data>.ts            # Data hook
```
