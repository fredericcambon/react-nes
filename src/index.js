import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import DebugNES from "./components/DebugNES";

import NES from "./components/NES";
import Grid from "./components/Grid";
import Menu from "./components/Menu";

// Because jQuery must be loeaded before bootstrap ...
window.jQuery = window.$ = require("jquery/dist/jquery.min");
require("bootstrap/dist/js/bootstrap.min.js");

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Menu />
      <Switch>
        <Route exact={true} path="/" component={Grid} />
        <Route path="/play/:game" component={NES} />
        <Route path="/debug" component={DebugNES} />
      </Switch>
      <footer>
        <p className="text-center text-white">
          2018 NES Emulator. <Link to="/terms">Terms</Link> ·{" "}
          <Link to="/about">About</Link>
        </p>
      </footer>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
