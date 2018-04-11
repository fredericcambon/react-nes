import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  HashRouter
} from 'react-router-dom';
import DebugNES from '../components/DebugNES';
import Root from '../components/Root';

import NES from '../components/NES';
import Grid from '../components/Grid';


ReactDOM.render(
  <HashRouter>
    <Route path="play/:game" component={NES} />
    <Route path="debug" component={DebugNES} />
    <Route exaxt path="/" component={Grid} />

    <footer>
      <p className="text-center">© 2017 NES Emulator. · <a href="#">Privacy</a> · <a href="#">Terms</a></p>
    </footer>
  </HashRouter>,
  document.getElementById( 'root' )
)
