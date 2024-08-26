import * as cheerio from "cheerio";

export function tempoAtras(dataString) {
  // divide a string de entrada em data e hora
  const [parteData, parteHora] = dataString.split(" ");
  const [dia, mes, ano] = parteData.split("/").map(Number);
  const [horas, minutos] = parteHora.split(":").map(Number);

  const dataEntrada = new Date(ano, mes - 1, dia, horas, minutos);

  const agora = new Date();

  const diffMs = agora - dataEntrada;

  // converte a diferença em dias e horas
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHoras = Math.floor(
    (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );

  return [diffDias, diffHoras];
}

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
