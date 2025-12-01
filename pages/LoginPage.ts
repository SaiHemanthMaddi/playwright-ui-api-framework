import { BasePage } from "./BasePage";
import { Page } from "@playwright/test";

export class LoginPage extends BasePage {
  username = this.page.locator('#user-name');
  password = this.page.locator('#password');
  loginBtn = this.page.locator('#login-button');
  errorMessage = this.page.locator('[data-test="error"]');

  constructor(page: Page) {
    super(page);
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }
}
