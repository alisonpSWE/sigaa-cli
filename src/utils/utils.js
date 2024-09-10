import { exec } from "child_process";
import fs from "fs";
import { confirm } from "@inquirer/prompts";
import path from "path";

export async function navigateToPage(page, url) {
  try {
    await page.goto(url);
  } catch (error) {
    console.error(error);
    const retry = await confirm({ message: "Tentar novamente?" });
    if (retry) {
      return await navigateToPage(page, url);
    }
  }
}

export async function esperarCarregamentoTotalHtml(page) {
  await page.waitForNavigation({
    waitUntil: "networkidle0",
  });
}

export async function openPDF(filePath) {
  const platform = process.platform;
  const resolvedFilePath = path.resolve(filePath);
  console.log(resolvedFilePath);

  if (platform === "win32") {
    exec(`start "" "${resolvedFilePath}"`);
  } else if (platform === "darwin") {
    exec(`open "${resolvedFilePath}"`);
  } else if (platform === "linux") {
    exec(`xdg-open "${resolvedFilePath}"`);
  } else {
    console.log("Plataforma não suportada.");
  }
}

export async function verificarArquivoExiste(dirArquivo) {
  const existe = fs.existsSync(dirArquivo);
  if (!existe) {
    return false;
  }
  return true;
}

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
