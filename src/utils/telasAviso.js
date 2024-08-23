export async function manuseiarTelaAvisoLogon(page) {
  console.log("Mensagem oficial de aviso em: " + page.url());
  const continuar = await confirm({ message: "Continuar?" });
  if (continuar) {
    return await await page.click('[value="Continuar >>"]');
  }
}
