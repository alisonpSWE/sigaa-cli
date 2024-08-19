import * as cheerio from "cheerio";

export function extrairConteudoTurmas(html) {
  const $ = cheerio.load(html);
  const sections = [];

  $(".titulo").each((index, element) => {
    const titulo = $(element).text().trim();
    const itens = [];

    $(element)
      .next(".conteudo")
      .find(".item")
      .each((i, item) => {
        let nome = $(item).find("span").text().trim();
        const imgSrc = $(item).find("img").attr("src") || "";
        const isPDF = imgSrc.includes("pdf.png");
        nome = nome.replace(/[\t\n]+/g, " ").trim();

        itens.push({
          nome,
          isPDF,
        });
      });

    sections.push({
      titulo,
      itens,
    });
  });

  return sections;
}
