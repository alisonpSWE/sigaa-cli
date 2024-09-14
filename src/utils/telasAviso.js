import { confirm } from "@inquirer/prompts";
import { esperarCarregamentoTotalHtml } from "./utils.js";

export async function manuseiarTelaAvisoLogon(page) {
  if (await page.url().endsWith("telaAvisoLogon.jsf")) {
    await page.click('[value="Continuar >>"]');
    await esperarCarregamentoTotalHtml(page);

    if (await page.url().endsWith("telaAvisoLogon.jsf")) {
      await manuseiarTelaAvisoLogon(page);
    }
  }
}

async function mensagemConfirmacao(page) {
  console.log("Mensagem oficial de aviso em: " + page.url());
  const continuar = await confirm({ message: "Continuar a navegação?" });
  if (continuar) {
    return await await page.click('[value="Continuar >>"]');
  }
}
