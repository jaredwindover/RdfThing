import {combineReducers} from 'redux';

import {tagReducer} from '../../utilities/reducers';

import constants from './constants';
import {reducer as textField} from '../textField';
import {create as toggle} from '../toggle/reducer';

export default combineReducers({
	field: tagReducer([constants.serverBarTag], textField),
	editing: tagReducer([constants.serverBarTag], toggle(true))
});
