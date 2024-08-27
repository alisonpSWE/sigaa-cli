import { confirm } from "@inquirer/prompts";

const isDevMode = process.env.NODE_ENV === "development";

export async function manuseiarTelaAvisoLogon(page) {
  if (isDevMode) {
    page.click('[value="Continuar >>"]');
  }

  console.log("Mensagem oficial de aviso em: " + page.url());
  const continuar = await confirm({ message: "Continuar a navegação?" });
  if (continuar) {
    return await await page.click('[value="Continuar >>"]');
  }
}
