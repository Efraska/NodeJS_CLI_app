import fs from "fs";
import { exit } from "process";

export default function dbFileCheck() {
  if (!fs.existsSync("db.json")) {
    console.log("La Base de Datos está vacía. ¡Crea algún dato!");
    exit(1);
  }
}
