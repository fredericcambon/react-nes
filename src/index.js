import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import DebugNES from "./components/DebugNES";

import NES from "./components/NES";
import Grid from "./components/Grid";
import Menu from "./components/Menu";
import About from "./components/About";

import "./static/App.css";

// Because jQuery must be loeaded before bootstrap ...
window.jQuery = window.$ = require("jquery/dist/jquery.min");
require("bootstrap/dist/js/bootstrap.min.js");

ReactDOM.render(
  <BrowserRouter>
    <div>
      <div id="wrap">
        <Menu />
        <Switch>
          <Route exact={true} path="/" component={Grid} />
          <Route path="/play/:game" component={NES} />
          <Route path="/about" component={About} />
          <Route path="/debug" component={DebugNES} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
