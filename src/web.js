import { select } from "@inquirer/prompts";
import { URL, usuario, senha } from "./user.js";

export async function navigateLogin(page) {
  console.log("started here");

  await page.goto(URL);
  await page.setViewport({ width: 1080, height: 1024 });

  await page.type('[name="user.login"]', usuario);
  await page.type('[name="user.senha"]', senha);

  await page.click('[name="entrar"]');

  console.log(URL);
  console.log(usuario);
  console.log(senha);

  //await browser.close();
}

export async function navigateMainMenu(page) {
  await page.waitForSelector("#modulos");
  await page.waitForSelector("#portais");
  const el = await page.$("#portais");
  if (!el) {
    throw new Error("Element #portais not found");
  }

  const portaisTxt = await el.evaluate((e) => e.innerHTML);
  const JsonLinksMainMenu = await extractMainMenuLinks(portaisTxt);

  const answer = await select({
    message: "Selecione o módulo",
    choices: JsonLinksMainMenu.map((item) => ({
      name: item.name,
      value: item.value,
      description: `Ir para ${item.name}`,
    })),
  });
  console.log(answer);
}

function extractMainMenuLinks(evalHTML) {
  // Define the array to hold the result
  let result = [];

  // Define a regex pattern to match list items with class 'on'
  let pattern =
    /<li class="([^"]+) on">.*?<a href="([^"]+)">.*?<span class="texto">(.*?)<\/span>/g;

  // Use the pattern to extract matches from the HTML string
  let match;
  while ((match = pattern.exec(evalHTML)) !== null) {
    let name = match[3].replace(/\s+/g, " ").trim(); // Clean up the name
    let value = match[2];
    result.push({ name, value });
  }

  return result;
}
