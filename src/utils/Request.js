import axios from "axios";
import settings from "../config/settings";

export default function fetchROM(rom) {
  return axios({
    method: "get",
    url: settings.MEDIA_HOST + "/" + settings.ROMS_PATH + rom.slug + ".nes",
    responseType: "arraybuffer"
  });
}
