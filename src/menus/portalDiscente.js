import { URLsigaa } from "../web.js";
import { navigateToPage } from "../utils/utils.js";
import { select } from "@inquirer/prompts";
import { navegarMenuDeTurmas } from "./menuTurma.js";

export async function navegarPortalDiscente(page) {
  await navigateToPage(page, URLsigaa + "/verPortalDiscente.do");
  console.clear();

  const elementoTabelaTurmas = await page.$("#turmas-portal");
  if (!elementoTabelaTurmas) {
    throw new Error("Elemento #turmas-portal não encontrado");
  }

  const htmlTabelaTurmas = await elementoTabelaTurmas.evaluate(
    (e) => e.innerHTML
  );
  const dadosTurmas = extrairDadosTurmas(htmlTabelaTurmas);

  const turmaSelecionada = await select({
    message: "Selecione a turma",
    choices: dadosTurmas.map((turma) => ({
      name: turma.nome,
      value: turma.id,
      description: `${turma.info}`,
    })),
  });

  const idLinkTurma = encontrarIdLinkTurma(htmlTabelaTurmas, turmaSelecionada);
  await page.click(`[id="${idLinkTurma}"]`);
  navegarMenuDeTurmas(page);
}

function encontrarIdLinkTurma(html, idTurmaSelecionada) {
  const regexIdLinkTurma = new RegExp(
    `<input[^>]*type="hidden"[^>]*value="${idTurmaSelecionada}"[^>]*name="idTurma"[^>]*>.*?<a[^>]*id="([^"]+)"[^>]*>`,
    "s"
  );
  const match = html.match(regexIdLinkTurma);
  return match ? match[1] : null;
}

function extrairDadosTurmas(html) {
  const regexLinhaTurma = /<tr class=".*?">([\s\S]*?)<\/tr>/g;
  const regexNomeTurma = /<a.*?>(.*?)<\/a>/;
  const regexIdTurma = /<input type="hidden" value="(\d+)" name="idTurma">/;
  const regexInfoTurma =
    /<td class="info">[\s\S]*?<center>([\s\S]*?)<\/center>/;

  const turmas = [];
  let match;

  while ((match = regexLinhaTurma.exec(html)) !== null) {
    const conteudoLinha = match[1];

    const matchNome = regexNomeTurma.exec(conteudoLinha);
    const nomeTurma = matchNome ? matchNome[1].trim() : null;

    const matchId = regexIdTurma.exec(conteudoLinha);
    const idTurma = matchId ? matchId[1] : null;

    const matchInfo = regexInfoTurma.exec(conteudoLinha);
    const infoTurma = matchInfo
      ? matchInfo[1].replace(/<br>/g, "").replace(/\s+/g, " ").trim()
      : null;

    if (nomeTurma && idTurma && infoTurma) {
      turmas.push({ nome: nomeTurma, id: idTurma, info: infoTurma });
    }
  }
  return turmas;
}
