import { extrairConteudoTurmas } from "../utils/stringManipulationUtil.js";
import { select, Separator } from "@inquirer/prompts";
import chalk from "chalk";

export async function navegarMenuDeTurmas(page) {
  const opcaoDeNavegacao = await mostrarMenuPrincipal();

  if (opcaoDeNavegacao === "escolherMaterial") {
    await escolhaMaterial(page);
  }
}

async function mostrarMenuPrincipal() {
  return await select({
    pageSize: 10,
    loop: false,
    message: "O que deseja fazer?",
    choices: [{ name: "Escolher Material", value: "escolherMaterial" }],
  });
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

  const choices = turmasConteudo.reduce((conteudos, turma) => {
    conteudos.push(new Separator(chalk.yellowBright(turma.titulo)));
    turma.itens.forEach((item) => {
      conteudos.push({ name: item.nome, value: item.nome });
    });
    return conteudos;
  }, []);

  const selecionarMaterial = await select({
    pageSize: 15,
    loop: false,
    message: "Selecione o material",
    choices,
  });

  return selecionarMaterial;
}
