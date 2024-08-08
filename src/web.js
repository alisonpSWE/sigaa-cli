import { select, confirm } from "@inquirer/prompts";
import { URLsigaa, usuario, senha } from "./user.js";
import { navigatePortalDiscente } from "./menus/portalDiscente.js";
import { navigateToPage } from "./utils/utils.js";

export async function navigateLogin(page) {
  console.log("started here");

  await navigateToPage(page, URLsigaa + "/verTelaLogin.do");

  await page.setViewport({ width: 1080, height: 1024 });

  await page.type('[name="user.login"]', usuario);
  await page.type('[name="user.senha"]', senha);

  await page.click('[name="entrar"]');

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

  switch (answer) {
    case "discente":
      console.log("Indo para Área do Discente");
      navigatePortalDiscente(page);
      break;
    case "portal_avaliacao":
      console.log("Indo para Portal de Avaliação");
      break;
    default:
      console.log(
        `Módulo/portal indisponível no momento. Erro na escolha do módulo/portal - ${answer}.`
      );
  }
}

function extractMainMenuLinks(evalHTML) {
  const onClassPattern =
    /<li class="([^"]*?\bon\b[^"]*?)">.*?<span class="texto">(.*?)<\/span>.*?<\/li>/gs;
  const result = [];

  let match;
  while ((match = onClassPattern.exec(evalHTML)) !== null) {
    const value = match[1].replace(/\s*\bon\b\s*/g, "");
    const name = match[2].replace(/<br>/g, " ").trim();
    result.push({ name, value });
  }

  return result;
}
