import { request } from "@playwright/test";

export async function apiClient() {
  const baseURL =
    process.env.API_BASE_URL ?? "https://jsonplaceholder.typicode.com";

  return await request.newContext({
    baseURL,
    extraHTTPHeaders: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  });
}
