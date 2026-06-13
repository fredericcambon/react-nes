// PUBLIC_URL is injected by Create React App from the `homepage` field at build
// time (e.g. "/react-nes" for the GitHub Pages project site). Building the ROM
// path from it keeps cover/ROM URLs absolute, so they resolve correctly on every
// client-side route instead of relative to the current URL.
const PUBLIC_URL = process.env.PUBLIC_URL || "";

export default {
    REACT_APP_ROMS_PATH: PUBLIC_URL + "/media/data/"
};
