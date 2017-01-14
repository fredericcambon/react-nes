import _ from 'lodash';

import {
    ROMS,
    TOP_ROMS
} from './constants';


export default function getTopRoms() {
    return _.filter( ROMS, ( r ) => {
        return TOP_ROMS.indexOf( r.value ) !== -1;
    } );
}
