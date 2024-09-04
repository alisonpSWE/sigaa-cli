import { confirm } from "@inquirer/prompts";

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

  if (platform === "win32") {
    exec(`start "" "${filePath}"`);
  } else if (platform === "darwin") {
    exec(`open "${filePath}"`);
  } else if (platform === "linux") {
    exec(`xdg-open "${filePath}"`);
  } else {
    console.log("Plataforma não suportada.");
  }
}
