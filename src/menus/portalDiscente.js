import { URLsigaa } from "../user.js";
import { navigateToPage } from "../utils/utils.js";
import { select } from "@inquirer/prompts";
import { navigateMenuTurma } from "./menuTurma.js";

export async function navigatePortalDiscente(page) {
  await navigateToPage(page, URLsigaa + "/verPortalDiscente.do");

  const el = await page.$("#turmas-portal");
  if (!el) {
    throw new Error("Elemento #portais nao encontrado");
  }
  const turmasPortalTxt = await el.evaluate((e) => e.innerHTML);

  const arrayTurmasPortal = extractDataTurmasPortal(turmasPortalTxt);

  const answer = await select({
    message: "Selecione a turma",
    choices: arrayTurmasPortal.map((item) => ({
      name: item.name,
      value: item.value,
      description: `${item.dataString}`,
    })),
  });

  let idLinkTurma = await extractLinkId(turmasPortalTxt, answer);
  await page.click(`[id="${idLinkTurma}"]`);
  navigateMenuTurma(page);
}

function extractLinkId(evalHTML, valorAlvo) {
  const regex = new RegExp(
    `<input[^>]*type="hidden"[^>]*value="${valorAlvo}"[^>]*name="idTurma"[^>]*>.*?<a[^>]*id="([^"]+)"[^>]*>`,
    "s"
  );
  const match = evalHTML.match(regex);

  return match ? match[1] : null;
}

function extractDataTurmasPortal(html) {
  const trRegex = /<tr class=".*?">([\s\S]*?)<\/tr>/g;
  const nameRegex = /<a.*?>(.*?)<\/a>/;
  const valueRegex = /<input type="hidden" value="(\d+)" name="idTurma">/;
  const dataStringRegex =
    /<td class="info">[\s\S]*?<center>([\s\S]*?)<\/center>/;

  let result = [];
  let match;

  while ((match = trRegex.exec(html)) !== null) {
    const trContent = match[1];

    const nameMatch = nameRegex.exec(trContent);
    const name = nameMatch ? nameMatch[1].trim() : null;

    const valueMatch = valueRegex.exec(trContent);
    const value = valueMatch ? valueMatch[1] : null;

    const dataStringMatch = dataStringRegex.exec(trContent);
    const dataString = dataStringMatch
      ? dataStringMatch[1].replace(/<br>/g, "").replace(/\s+/g, " ").trim()
      : null;

    if (name && value && dataString) {
      result.push({ name, value, dataString });
    }
  }
  return result;
}
