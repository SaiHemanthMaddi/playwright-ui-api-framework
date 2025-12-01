import { test, expect } from "@playwright/test";
import { apiClient } from "../../helpers/apiClient";

test.describe("Users API Tests", () => {
  test("GET all users", async () => {
    const api = await apiClient();

    const response = await api.get("/users");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body.length).toBe(10);
  });

  test("GET single user by ID", async () => {
    const api = await apiClient();

    const response = await api.get("/users/1");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(1);
    expect(body.name).toBeDefined();
    expect(body.email).toBeDefined();
    expect(body.username).toBeDefined();
  });

  test("Validate user data structure", async () => {
    const api = await apiClient();

    const response = await api.get("/users/1");
    const user = await response.json();

    // Validate user has required fields
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("address");
    expect(user).toHaveProperty("phone");
    expect(user).toHaveProperty("website");
    expect(user).toHaveProperty("company");
  });

  test("Create new user", async () => {
    const api = await apiClient();

    const newUser = {
      name: "John Doe",
      username: "johndoe",
      email: "john@example.com"
    };

    const response = await api.post("/users", {
      data: newUser
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.name).toBe(newUser.name);
    expect(body.email).toBe(newUser.email);
  });

  test("Get user posts", async () => {
    const api = await apiClient();

    const response = await api.get("/users/1/posts");
    expect(response.status()).toBe(200);

    const posts = await response.json();
    expect(Array.isArray(posts)).toBeTruthy();
    expect(posts.length).toBeGreaterThan(0);

    // Verify all posts belong to user 1
    posts.forEach((post: any) => {
      expect(post.userId).toBe(1);
    });
  });
});
