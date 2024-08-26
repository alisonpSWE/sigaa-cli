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

export function extrairConteudoParagrafos(htmlString) {
  const $ = cheerio.load(htmlString);

  const dataString = $(".descricaoOperacao h4")
    .text()
    .match(/\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/)?.[0];

  let paragrafos = [];
  $("p").each((i, elem) => {
    const conteudo = $(elem).text().trim();
    if (conteudo) {
      paragrafos.push(conteudo);
    }
  });

  // Adiciona a data no comeco do array
  if (dataString) {
    paragrafos.unshift(dataString);
  }

  return paragrafos;
}
