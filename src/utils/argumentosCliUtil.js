import { program } from "commander";
import { resetarCredenciais } from "./credenciaisUtil.js";

export async function utilizarArgumentosCli() {
  program.option("--reset", "Reseta usuário e senha");
  program.parse(process.argv);

  const options = program.opts();

  if (options.reset) {
    resetarCredenciais();
    console.log("Usuário e Senha foram resetados");
  }
}
