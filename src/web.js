import { select, confirm } from "@inquirer/prompts";
import { URLsigaa, usuario, senha } from "./user.js";
import { navegarPortalDiscente } from "./menus/portalDiscente.js";
import { navigateToPage, esperarCarregamentoTotalHtml } from "./utils/utils.js";
import { manuseiarTelaAvisoLogon } from "./utils/telasAviso.js";

export async function navigateLogin(page) {
  await navigateToPage(page, URLsigaa + "/verTelaLogin.do");

  await page.setViewport({ width: 1080, height: 1024 });

  await page.type('[name="user.login"]', usuario);
  await page.type('[name="user.senha"]', senha);

  await page.click('[name="entrar"]');
}

async function tratarTelasAviso(page) {
  console.clear();
  await esperarCarregamentoTotalHtml(page);
  if (await page.url().endsWith("telaAvisoLogon.jsf")) {
    await manuseiarTelaAvisoLogon(page);
  }
}

export async function navigateMainMenu(page) {
  tratarTelasAviso(page);
  console.clear();
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
      navegarPortalDiscente(page);
      break;
    case "portal_avaliacao":
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
