import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { testUsers } from "../../helpers/test-data";

test.describe("Login Tests", () => {
  test("Valid login with standard user", async ({ page }) => {
    const login = new LoginPage(page);
    const products = new ProductsPage(page);

    await login.navigate("/");
    await login.login(testUsers.valid.username, testUsers.valid.password);

    await expect(products.productsTitle).toBeVisible();
    await expect(page).toHaveURL(/.*inventory\.html/);
  });

  test("Invalid login - wrong password", async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate("/");
    await login.login(testUsers.valid.username, "wrong_password");

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText("Username and password do not match");
  });

  test("Invalid login - wrong username", async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate("/");
    await login.login("invalid_user", testUsers.valid.password);

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText("Username and password do not match");
  });

  test("Invalid login - empty credentials", async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate("/");
    await login.loginBtn.click();

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText("Username is required");
  });

  test("Locked out user", async ({ page }) => {
    const login = new LoginPage(page);

    await login.navigate("/");
    await login.login(testUsers.locked.username, testUsers.locked.password);

    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toContainText("Sorry, this user has been locked out");
  });
});
