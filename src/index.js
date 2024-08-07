import { navigateLogin, navigateMainMenu } from "./web.js";
console.log("at index.js");
import puppeteer from "puppeteer";

const browser = await puppeteer.launch({ headless: false });
const page = await browser.newPage();

import { select, Separator } from "@inquirer/prompts";

navigateLogin(page);
navigateMainMenu(page);
