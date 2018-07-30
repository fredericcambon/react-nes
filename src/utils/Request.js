import axios from "axios";
import settings from "../config/settings";

export default function fetchROM(rom) {
  return axios({
    method: "get",
    url: settings.ROMS_PATH + "/" + rom.slug + ".nes",
    responseType: "arraybuffer"
  });
}
