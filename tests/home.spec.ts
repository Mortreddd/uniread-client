import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:5173";
test.describe("Homepage", () => {
  test("has title", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle(/Uniread/);
  });

  test("can redirect in /books", async ({ page }) => {
    await page.goto(BASE_URL);
    await page.getByRole("button").click();
    await expect(page).toHaveURL(`${BASE_URL}/books`);
  });
});
