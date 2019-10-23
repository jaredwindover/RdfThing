import {createReducer, justPayload} from '../../utilities/reducers';

import constants from './constants';

export default createReducer({}, {[constants.set]: justPayload});
