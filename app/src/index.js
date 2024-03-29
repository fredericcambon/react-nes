import axios from "axios";
import React from "react";
import ReactDOM from "react-dom";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import DebugNES from "./components/DebugNES";

import NES from "./components/NES";
import HomeGrid from "./components/HomeGrid";
import BrowseGrid from "./components/BrowseGrid";
import Menu from "./components/Menu";
import About from "./components/About";

import "./static/App.css";
import settings from "./config/settings";

// Because jQuery must be loeaded before bootstrap ...
window.jQuery = window.$ = require("jquery/dist/jquery.min");
require("bootstrap/dist/js/bootstrap.min.js");

axios.defaults.baseURL = window.location.origin + process.env.REACT_APP_BASE_PATH;


ReactDOM.render(
  <BrowserRouter basename={process.env.REACT_APP_BASE_PATH}>
    <div>
      <div id="wrap">
        <Menu />
        <Switch>
          <Route exact={true} path="/" component={HomeGrid} />
          <Route path="/play/:game" component={NES} />
          <Route path="/about" component={About} />
          <Route path="/debug" component={DebugNES} />
          <Route exact={true} path="/browse-all" component={BrowseGrid} />
          <Route path="/browse/:filter" component={BrowseGrid} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>,
  document.getElementById("root")
);
