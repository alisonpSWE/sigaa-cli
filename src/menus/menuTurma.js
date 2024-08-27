import {
  extrairConteudoParagrafos,
  extrairConteudoTurmas,
  tempoAtras,
} from "../utils/stringManipulationUtil.js";
import { select, Separator } from "@inquirer/prompts";
import chalk from "chalk";

let atualConteudosHTMLString;
let atualDadosUltimaNoticia;

export async function navegarMenuDeTurmas(page) {
  atualConteudosHTMLString = await ConteudosHTMLString(page);
  atualDadosUltimaNoticia = await extrairConteudoParagrafos(
    atualConteudosHTMLString
  );
  const opcaoDeNavegacao = await mostrarMenuPrincipal(page);

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

async function mostrarMenuPrincipal(page) {
  let atualUltimaNoticiaComTempoAtras = await ultimaNoticiaComTempoAtras(page);
  return await select({
    pageSize: 10,
    loop: false,
    message: "O que deseja fazer?",
    choices: [
      atualUltimaNoticiaComTempoAtras
        ? { name: atualUltimaNoticiaComTempoAtras, value: "verUltimaNoticia" }
        : null,
      { name: "Escolher Material", value: "escolherMaterial" },
    ].filter((choice) => choice !== null),
  });
}

async function ultimaNoticiaComTempoAtras(page) {
  const noticiaElement = await page.$("#ultimaNoticia");
  if (!noticiaElement) {
    return null;
  }

  const atualTempoAtras = tempoAtras(atualDadosUltimaNoticia[0]); // a string com a data e horario fica no começo do array atualDadosUltimaNoticia
  if (atualTempoAtras[0] === 0) {
    return chalk.red(
      `Ver ultima noticia (${atualTempoAtras[0]} dias e ${atualTempoAtras[1]} horas atrás.)`
    );
  } else if (atualTempoAtras[0] < 7) {
    return chalk.redBright(
      `Ver ultima noticia (${atualTempoAtras[0]} dias e ${atualTempoAtras[1]} horas atrás.)`
    );
  } else {
    return `Ver ultima noticia (${atualTempoAtras[0]} dias e ${atualTempoAtras[1]} horas atrás.)`;
  }
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
