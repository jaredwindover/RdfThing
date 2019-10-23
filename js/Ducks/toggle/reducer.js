import {
	createReducer,
	toggle,
	returnTrue,
	returnFalse
} from '../../utilities/reducers';

import constants from './constants';

export const create = start => createReducer(
	start,
	{
		[constants.tog]: toggle,
		[constants.on]: returnTrue,
		[constants.off]: returnFalse
	}
);

export default create(false);
