import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";

test.describe("Products Page Tests", () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigate("/");
        await login.login("standard_user", "secret_sauce");
    });

    test("Add single product to cart", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.addProductToCartByName("Sauce Labs Backpack");

        const cartCount = await products.getCartItemCount();
        expect(cartCount).toBe("1");
    });

    test("Add multiple products to cart", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.addProductToCartByName("Sauce Labs Backpack");
        await products.addProductToCartByName("Sauce Labs Bike Light");
        await products.addProductToCartByName("Sauce Labs Bolt T-Shirt");

        const cartCount = await products.getCartItemCount();
        expect(cartCount).toBe("3");
    });

    test("Sort products by name (A to Z)", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.sortProducts("az");
        const firstProduct = await products.getFirstProductName();

        expect(firstProduct).toBe("Sauce Labs Backpack");
    });

    test("Sort products by name (Z to A)", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.sortProducts("za");
        const firstProduct = await products.getFirstProductName();

        expect(firstProduct).toBe("Test.allTheThings() T-Shirt (Red)");
    });

    test("Sort products by price (low to high)", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.sortProducts("lohi");
        const firstProduct = await products.getFirstProductName();

        expect(firstProduct).toBe("Sauce Labs Onesie");
    });

    test("Sort products by price (high to low)", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.sortProducts("hilo");
        const firstProduct = await products.getFirstProductName();

        expect(firstProduct).toBe("Sauce Labs Fleece Jacket");
    });

    test("Verify product price is displayed", async ({ page }) => {
        const products = new ProductsPage(page);

        const price = await products.getProductPrice("Sauce Labs Backpack");

        expect(price).toContain("$");
        expect(price).toBeTruthy();
    });
});
