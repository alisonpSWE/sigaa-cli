import {
  extrairConteudoParagrafos,
  extrairConteudoTurmas,
  tempoAtras,
} from "../utils/stringManipulationUtil.js";
import { select, Separator } from "@inquirer/prompts";
import chalk from "chalk";

let atualConteudosHTMLString;

export async function navegarMenuDeTurmas(page) {
  atualConteudosHTMLString = await ConteudosHTMLString(page);
  const opcaoDeNavegacao = await mostrarMenuPrincipal();

  if (opcaoDeNavegacao === "escolherMaterial") {
    await escolhaMaterial();
  }
}

async function ConteudosHTMLString(page) {
  await page.waitForSelector("#conteudo");
  const elementoConteudo = await page.$("#conteudo");

  if (!elementoConteudo) {
    throw new Error("Elemento #conteudo não encontrado");
  }

  return await elementoConteudo.evaluate((elemento) => elemento.innerHTML);
}

async function mostrarMenuPrincipal() {
  return await select({
    pageSize: 10,
    loop: false,
    message: "O que deseja fazer?",
    choices: [{ name: "Escolher Material", value: "escolherMaterial" }],
  });
}

async function escolhaMaterial() {
  const turmasConteudo = extrairConteudoTurmas(atualConteudosHTMLString);
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
