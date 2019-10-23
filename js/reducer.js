import {combineReducers} from 'redux';

import {reducer as serverBar} from './Ducks/serverBar';
import {reducer as server} from './Ducks/server';
import {reducer as data} from './Ducks/data';

export default combineReducers({serverBar, server, data});
