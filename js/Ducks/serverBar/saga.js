import {select, put} from 'redux-saga/effects';

import {trySet} from '../server/actions';
import {editingOff} from './actions';

import {combineSagas} from '../../utilities/sagas';
import constants from './constants';
import {server} from './selectors';

export const onSubmit = function * () {
	yield put(editingOff({}));
	const serverName = yield select(server);
	yield put(trySet(serverName));
};

export default combineSagas({
	[constants.submit]: onSubmit
});
