import React from "react";
import ReactDOM from "react-dom";
import { Route, HashRouter } from "react-router-dom";
import Root from "../components/Root";

import NES from "../components/NES";
import Grid from "../components/Grid";

ReactDOM.render(
  <HashRouter basename="/" hashType="noslash">
    <div>
      <Route path="play/:game" component={NES} />
      <Route exact path="/" component={Grid} />
    </div>

    <footer>
      <p className="text-center">
        © 2017 NES Emulator. · <a href="#">Privacy</a> · <a href="#">Terms</a>
      </p>
    </footer>
  </HashRouter>,
  document.getElementById("root")
);
