import {createReducer, merge} from '../../utilities/reducers';

import constants from './constants';

const change = (state, {payload: value}) => (
	{...state, value, focused: true, dirty: true}
);

export default createReducer(
	{value: '', focused: false, dirty: false},
	{
		[constants.change]: change,
		[constants.blur]: merge({focused: false}),
		[constants.clean]: merge({dirty: false})
	}
);
