import {
  extrairConteudoTurmas,
  extrairConteudoParagrafos,
} from "../src/utils/stringManipulationUtil.js";

describe("Menu Turma", () => {
  it("Extrai dados do ultimo anuncio", () => {
    const ultimoAnuncioHTMLSimulado = `<div class="descricaoOperacao" id="ultimaNoticia">
    <h4> Última Atualização<br>Notas - Atividade X - 01/09/2024 10:15 </h4>
    <p>Prezados alunos, disponibilizei no portal uma planilha com a revisão do segundo trabalho da disciplina. O link para a planilha é chamado “Relatório de Atividades e Desempenho”.<br><br>Alguns estudantes precisarão reenviar o material, pois não consegui acessar o código enviado, peço que enviem apenas o link para o repositório, não compartilhem a pasta diretamente comigo.</p>
    <p>Em caso de dúvidas ou questões, entrem em contato por e-mail.</p>
    <p>&nbsp;</p>
    <br>
    <small> Cadastrado por:  <i> JOAQUIM SILVA PEREIRA</i>  </small>
</div>`;

    const resultadoEsperado = [
      "01/09/2024 10:15",
      "Prezados alunos, disponibilizei no portal uma planilha com a revisão do segundo trabalho da disciplina. O link para a planilha é chamado “Relatório de Atividades e Desempenho”.Alguns estudantes precisarão reenviar o material, pois não consegui acessar o código enviado, peço que enviem apenas o link para o repositório, não compartilhem a pasta diretamente comigo.",
      "Em caso de dúvidas ou questões, entrem em contato por e-mail.",
    ];

    const resultado = extrairConteudoParagrafos(ultimoAnuncioHTMLSimulado);
    expect(resultado).toEqual(resultadoEsperado);
  });

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
