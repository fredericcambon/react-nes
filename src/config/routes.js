import React from 'react';
import {
    Route,
    IndexRoute
} from 'react-router';

import DebugNES from '../components/DebugNES';
import Root from '../components/Root';

import NES from '../components/NES';
import Grid from '../components/Grid';


export default (
    <Route path="/" component={Root}>
        <Route path="play/:game" component={NES} />
        <Route path="debug" component={DebugNES} />
        <IndexRoute component={Grid} />
    </Route>
);
