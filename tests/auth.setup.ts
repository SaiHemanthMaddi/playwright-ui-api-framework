import path from 'path';
import fs from 'fs';
import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { testUsers } from '../helpers/test-data';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  const login = new LoginPage(page);
  fs.mkdirSync(path.dirname(authFile), { recursive: true });

  await login.navigate('/');
  await login.login(testUsers.valid.username, testUsers.valid.password);

  await page.context().storageState({ path: authFile });
});
