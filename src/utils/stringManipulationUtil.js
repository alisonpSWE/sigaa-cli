import * as cheerio from "cheerio";

export function extrairConteudoTurmas(htmlString) {
  const $ = cheerio.load(htmlString);
  const result = [];

  $(".topico-aula").each((index, element) => {
    const titulo = $(element).find(".titulo").text().trim();
    const itens = [];

    $(element)
      .find(".conteudo .item")
      .each((i, el) => {
        const nome = $(el).find("a").text().trim();
        const isPDF = $(el).find("img").attr("src").includes("pdf.png");

        itens.push({
          nome: nome,
          isPDF: isPDF,
        });
      });

    result.push({
      titulo: titulo,
      itens: itens,
    });
  });
  result.filter((value) => !_.isEmpty(value));
  return result;
}
