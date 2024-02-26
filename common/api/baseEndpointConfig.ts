import { baseQueryWithReAuth } from './baseQueryWithReAuth';
import { extractRehydrationInfo, keepUnusedDataFor } from './helpers';

export const baseEndpointConfig = (baseUrl?: string) => ({
  keepUnusedDataFor,
  baseQuery: baseQueryWithReAuth(baseUrl),
  extractRehydrationInfo,
});
