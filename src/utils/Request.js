import axios from "axios";
import settings from "../config/settings";

export default function fetchROM(path) {
  return axios({
    method: "get",
    url: settings.MEDIA_HOST + "/roms/" + path,
    responseType: "arraybuffer"
  });
}
