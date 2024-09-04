function obterPastaDownload() {
  const diretorioHome = os.homedir();

  if (os.platform() === "win32") {
    return path.join(diretorioHome, "Downloads");
  } else if (os.platform() === "darwin" || os.platform() === "linux") {
    return path.join(diretorioHome, "Downloads");
  }
}
