import { test, expect } from "@playwright/test";
import { apiClient } from "../../helpers/apiClient";

test.describe("Posts API Tests", () => {
  test("Create Post API", async () => {
    const api = await apiClient();

    const response = await api.post("/posts", {
      data: {
        title: "Test Post",
        body: "This is a test post",
        userId: 1
      }
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.id).toBeDefined();
    expect(body.title).toBe("Test Post");
  });

  test("Get single post", async () => {
    const api = await apiClient();

    const response = await api.get("/posts/1");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.userId).toBeDefined();
    expect(body.title).toBeDefined();
    expect(body.body).toBeDefined();
  });

  test("Get all posts", async () => {
    const api = await apiClient();

    const response = await api.get("/posts");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThan(0);
  });

  test("Update post with PUT", async () => {
    const api = await apiClient();

    const response = await api.put("/posts/1", {
      data: {
        id: 1,
        title: "Updated Title",
        body: "Updated body content",
        userId: 1
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe("Updated Title");
    expect(body.body).toBe("Updated body content");
  });

  test("Partial update post with PATCH", async () => {
    const api = await apiClient();

    const response = await api.patch("/posts/1", {
      data: {
        title: "Patched Title"
      }
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe("Patched Title");
  });

  test("Delete post", async () => {
    const api = await apiClient();

    const response = await api.delete("/posts/1");
    expect(response.status()).toBe(200);
  });

  test("Get non-existent post - 404 error", async () => {
    const api = await apiClient();

    const response = await api.get("/posts/999999");
    expect(response.status()).toBe(404);
  });

  test("Filter posts by userId", async () => {
    const api = await apiClient();

    const response = await api.get("/posts?userId=1");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    body.forEach((post: any) => {
      expect(post.userId).toBe(1);
    });
  });
});
