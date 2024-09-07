import { navigateLogin, navigateMainMenu } from "./web.js";
import puppeteer from "puppeteer-extra";
import userPreferencesPlugin from "puppeteer-extra-plugin-user-preferences";

let launchOptions = {};

if (process.env.NODE_ENV === "development") {
  launchOptions = {
    headless: false,
    devtools: false,
    slowMo: 0,
    timeout: 30000,
    args: ["--enable-logging", "--v=1"],
  };
}

const browser = await puppeteer.launch(launchOptions);

const page = await browser.newPage();

navigateLogin(page);
navigateMainMenu(page);
