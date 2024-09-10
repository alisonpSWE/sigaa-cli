import os from "os";
import path from "path";

export const diretorioDownload = (filename) => {
  return path.join(os.homedir(), "Downloads", filename);
};
