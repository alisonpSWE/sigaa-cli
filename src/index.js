import { navigateLogin, navigateMainMenu } from "./web.js";
console.log("at index.js");
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
  headless: false,
  devtools: false,
  slowMo: 0,
  timeout: 30000,
  args: ["--enable-logging,", "--v=1"],
});
const page = await browser.newPage();

navigateLogin(page);
navigateMainMenu(page);
