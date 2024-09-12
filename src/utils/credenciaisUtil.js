import fs from "fs";
import path from "path";
import inquirer from "inquirer";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function salvarCredenciais(nomeUsuario, senhaUsuario) {
  const envPath = path.join(__dirname, "../../", ".env");
  const newEnvContent = `USER_NAME="${nomeUsuario}"\nUSER_PASSWORD="${senhaUsuario}"\n`;
  fs.writeFileSync(envPath, newEnvContent, { encoding: "utf-8" });
  console.log("Usuário e senha salvos.");
}

export function resetarCredenciais() {
  const envPath = path.join(__dirname, ".env");
  const newEnvContent = `USER_NAME=\nUSER_PASSWORD=\n`;
  fs.writeFileSync(envPath, newEnvContent, { encoding: "utf-8" });
  console.log("Usuário e senha resetados.");
}

export function mostrarUsuario() {
  const nomeUsuario = process.env.USER_NAME;
  console.log(`Usuário: ${nomeUsuario}`);
}

export async function solicitarCredenciais() {
  const respostas = await inquirer.prompt([
    {
      type: "input",
      name: "nomeUsuario",
      message: "Digite o nome de usuário:",
    },
    {
      type: "password",
      name: "senhaUsuario",
      message: "Digite a senha:",
      mask: "*",
    },
  ]);

  salvarCredenciais(respostas.nomeUsuario, respostas.senhaUsuario);
}
