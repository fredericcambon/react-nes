import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  BrowserRouter,
  Switch
} from 'react-router-dom';
import DebugNES from './components/DebugNES';

import NES from './components/NES';
import Grid from './components/Grid';
import Menu from './components/Menu';


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
        <p className="text-center text-white">© 2017 NES Emulator. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
      </footer>
    </div>
  </BrowserRouter>,
  document.getElementById( 'root' )
)
