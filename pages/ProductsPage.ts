import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class ProductsPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  productsTitle = this.page.locator('.title');
  sortDropdown = this.page.locator('[data-test="product-sort-container"]');
  inventoryItems = this.page.locator('.inventory_item');
  shoppingCartBadge = this.page.locator('.shopping_cart_badge');
  shoppingCartLink = this.page.locator('.shopping_cart_link');

  async isProductsPageVisible() {
    return this.productsTitle.isVisible();
  }

  async addProductToCartByName(productName: string) {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    await product.locator('button').click();
  }

  async addProductToCartByIndex(index: number) {
    await this.inventoryItems.nth(index).locator('button').click();
  }

  async getCartItemCount(): Promise<string> {
    if (await this.shoppingCartBadge.isVisible()) {
      const count = await this.shoppingCartBadge.innerText();
      return count.trim();
    }
    return "0";
  }

  async sortProducts(option: string) {
    await this.sortDropdown.selectOption(option);
  }

  async getFirstProductName(): Promise<string> {
    const name = await this.inventoryItems
      .first()
      .locator('.inventory_item_name')
      .innerText();
    return name.trim();
  }

  async getProductPrice(productName: string): Promise<string> {
    const product = this.page.locator('.inventory_item', { hasText: productName });
    const price = await product.locator('.inventory_item_price').innerText();
    return price.trim();
  }

  async goToCart() {
    await this.shoppingCartLink.click();
  }
}
