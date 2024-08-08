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
