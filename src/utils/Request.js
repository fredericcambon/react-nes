import axios from "axios";

export default function fetchROM(rom) {
  return axios({
    method: "get",
    url: process.env.REACT_APP_MEDIA_HOST + "/" + process.env.REACT_APP_ROMS_PATH + rom.slug + ".nes",
    responseType: "arraybuffer"
  });
}
