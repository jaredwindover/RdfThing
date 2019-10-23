import axios from 'axios';
import {select, call, put} from 'redux-saga/effects';

import {combineSagas} from '../../utilities/sagas';
import {server} from '../server/selectors';

import constants from './constants';


export const onInit = function * () {
	const url = (yield select(server)).url;
	try {
		const result = yield axios.get(url);
		console.debug({data: result.data});
	} catch (error) {
		console.error(error);
	}
};

export default combineSagas({
	[constants.init]: onInit
});
