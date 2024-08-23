import { extrairConteudoTurmas } from "../utils/stringManipulationUtil.js";
import { select, Separator } from "@inquirer/prompts";
import chalk from "chalk";

export async function navegarMenuDeTurmas(page) {
  console.log(page.url());
  escolhaMaterial(page);
}

async function escolhaMaterial(page) {
  await page.waitForSelector("#conteudo");
  const elementoConteudo = await page.$("#conteudo");

  if (!elementoConteudo) {
    throw new Error("Elemento #conteudo não encontrado");
  }

  const conteudoHTML = await elementoConteudo.evaluate(
    (elemento) => elemento.innerHTML
  );
  const turmasConteudo = extrairConteudoTurmas(conteudoHTML);

  const selecionarMaterial = await select({
    pageSize: 15,
    loop: false,
    message: "Selecione o material",
    choices: turmasConteudo.flatMap((turma) => [
      new Separator(),
      new Separator(chalk.red(turma.titulo)),
      ...turma.itens.map((item) => ({
        name: item.nome,
        value: item.nome,
      })),
    ]),
  });

  return selecionarMaterial;
}
