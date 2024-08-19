import { extrairConteudoTurmas } from "../utils/stringManipulationUtil.js";

describe("Menu Turma", () => {
  it("Extrai dados do conteudo", () => {
    const conteudoHTMLSimulado = `
      <div class="titulo">
  Documentos importantes (01/03/2024 - 01/03/2024)
  <small><i></i></small>
</div>
<div class="conteudo">
  <span id="">
    <div class="item">
      <span id=""><img src="/sigaa/img/porta_arquivos/icones/pdf.png">Plano de Curso - EDA - 2024.1</span> 
      <div class="descricao-item"></div>
    </div>
    <div class="item">	
      <span id=""><img src="/sigaa/img/porta_arquivos/icones/zip.png">Planejamento das Atividades.pdf</span>
    </div>
  </span>
</div>

<div class="titulo">
  Outras Informações (02/03/2024 - 02/04/2024)
  <small><i></i></small>
</div>
<div class="conteudo">
  <span id="">
    <div class="item">
      <span id=""><img src="/sigaa/img/porta_arquivos/icones/pdf.png">Relatório Final - 2024.1</span> 
      <div class="descricao-item"></div>
    </div>
    <div class="item">	
      <span id=""><img src="/sigaa/img/porta_arquivos/icones/zip.png">Envio da Atividade 2\n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\t \n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t\tInicia</span>
    </div>
  </span>
</div> 
    `;

    const resultadoEsperado = [
      {
        titulo: "Documentos importantes (01/03/2024 - 01/03/2024)",
        itens: [
          {
            nome: "Plano de Curso - EDA - 2024.1",
            isPDF: true,
          },
          {
            nome: "Planejamento das Atividades.pdf",
            isPDF: false,
          },
        ],
      },
      {
        titulo: "Outras Informações (02/03/2024 - 02/04/2024)",
        itens: [
          {
            nome: "Relatório Final - 2024.1",
            isPDF: true,
          },
          {
            nome: "Envio da Atividade 2     Inicia",
            isPDF: false,
          },
        ],
      },
    ];

    const resultado = extrairConteudoTurmas(conteudoHTMLSimulado);
    expect(resultado).toEqual(resultadoEsperado);
  });
});
