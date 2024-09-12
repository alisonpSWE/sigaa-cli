#!/usr/bin/env node

import { navigateLogin, navigateMainMenu } from "./web.js";
import puppeteer from "puppeteer-extra";
import userPreferencesPlugin from "puppeteer-extra-plugin-user-preferences";
import { utilizarArgumentosCli } from "./utils/argumentosCliUtil.js";
import { solicitarCredenciais } from "./utils/credenciaisUtil.js";

await utilizarArgumentosCli();
let launchOptions = {};

let usuario = process.env.USER_NAME;
let senha = process.env.USER_PASSWORD;

if (!usuario || !senha) {
  console.log("Usuário e senha não definidos");
  await solicitarCredenciais();
}

if (process.env.NODE_ENV === "development") {
  launchOptions = {
    headless: false,
    devtools: false,
    slowMo: 0,
    timeout: 30000,
    args: ["--enable-logging", "--v=1"],
  };
}

puppeteer.use(
  userPreferencesPlugin({
    userPrefs: {
      download: {
        prompt_for_download: false,
        open_pdf_in_system_reader: false,
      },
      plugins: {
        always_open_pdf_externally: true,
      },
    },
  })
);

const browser = await puppeteer.launch(launchOptions);

const page = await browser.newPage();

navigateLogin(page);
navigateMainMenu(page);
