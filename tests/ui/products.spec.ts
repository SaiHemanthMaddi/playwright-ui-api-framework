import { test, expect } from "@playwright/test";
import { LoginPage } from "../../pages/LoginPage";
import { ProductsPage } from "../../pages/ProductsPage";
import { sortOptions, testProducts, testUsers } from "../../helpers/test-data";

test.describe("Products Page Tests", () => {
    test.beforeEach(async ({ page }) => {
        const login = new LoginPage(page);
        await login.navigate("/");
        await login.login(testUsers.valid.username, testUsers.valid.password);
    });

    test("Add single product to cart", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.addProductToCartByName(testProducts.backpack);

        const cartCount = await products.getCartItemCount();
        expect(cartCount).toBe("1");
    });

    test("Add multiple products to cart", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.addProductToCartByName(testProducts.backpack);
        await products.addProductToCartByName(testProducts.bikeLight);
        await products.addProductToCartByName(testProducts.boltTShirt);

        const cartCount = await products.getCartItemCount();
        expect(cartCount).toBe("3");
    });

    test("Sort products by name (A to Z)", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.sortProducts(sortOptions.nameAZ);
        const firstProduct = await products.getFirstProductName();

        expect(firstProduct).toBe(testProducts.backpack);
    });

    test("Sort products by name (Z to A)", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.sortProducts(sortOptions.nameZA);
        const firstProduct = await products.getFirstProductName();

        expect(firstProduct).toBe(testProducts.redTShirt);
    });

    test("Sort products by price (low to high)", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.sortProducts(sortOptions.priceLowHigh);
        const firstProduct = await products.getFirstProductName();

        expect(firstProduct).toBe(testProducts.onesie);
    });

    test("Sort products by price (high to low)", async ({ page }) => {
        const products = new ProductsPage(page);

        await products.sortProducts(sortOptions.priceHighLow);
        const firstProduct = await products.getFirstProductName();

        expect(firstProduct).toBe(testProducts.fleeceJacket);
    });

    test("Verify product price is displayed", async ({ page }) => {
        const products = new ProductsPage(page);

        const price = await products.getProductPrice(testProducts.backpack);

        expect(price).toContain("$");
        expect(price).toBeTruthy();
    });
});
