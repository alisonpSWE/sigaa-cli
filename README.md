<div align="center">
<pre>
 _____ _____ _____   ___    ___         _____  _     _____ 
/  ___|_   _|  __ \ / _ \  / _ \       /  __ \| |   |_   _|
\ `--.  | | | |  \// /_\ \/ /_\ \______| /  \/| |     | |  
 `--. \ | | | | __ |  _  ||  _  |______| |    | |     | |  
/\__/ /_| |_| |_\ \| | | || | | |      | \__/\| |_____| |_ 
\____/ \___/ \____/\_| |_/\_| |_/       \____/\_____/\___/ 
                                                           
                                                           
</pre>
</div>

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

```
Aplicação que utiliza Puppeteer para navegar no site do SIGAA-UFC via Linha de Comando (CLI)
```

No momento, a aplicação oferece funcionalidade de baixar materiais PDF da turma diretamente para a pasta "Downloads" e abri-los

## Capturas de Tela

<div align="center">
<img src="/docs/screenshot1.png" alt="Seleção de módulo" width="380"/>

<img src="/docs/screenshot2.png" alt="Seleção de material" width="380"/>
</div>

## Funcionalidades

- **Navegação por Turmas**: Permite a seleção de uma turma via CLI.
- **Download de Materiais**: Baixa materiais diretamente para a pasta de Downloads.
- **Abertura de PDFs**: Abre arquivos PDF de materiais diretamente na aplicação.

## Instalação e Execução

### Usando `npx` (Recomendado)

Você pode usar a aplicação diretamente via `npx` sem a necessidade de instalação local:

1. Execute a aplicação com o seguinte comando:

   ```bash
   npx sigaacli
   ```

2. Siga as instruções no terminal para selecionar a turma e o material que deseja baixar ou abrir.

### Redefinir Login

Se precisar redefinir as credenciais salvas para o login, use o argumento `--reset`:

```bash
npx sigaacli --reset
```

Isso irá limpar as credenciais de login salvas e permitir que você insira novas.

### Instalação Local

Se preferir clonar o repositório e rodar localmente, siga as etapas abaixo:

1. Clone este repositório:

   ```bash
   git clone https://github.com/alisondeveloper/sigaa-cli
   cd sigaa-cli
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Execute a aplicação:
   ```bash
   npm run start *// Modo produção*
   npm run dev *// Modo desenvolvedor*
   ```
