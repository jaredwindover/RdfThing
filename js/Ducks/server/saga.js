import axios from 'axios';
import {call, put} from 'redux-saga/effects';

import {combineSagas} from '../../utilities/sagas';

import constants from './constants';
import {set} from './actions';

export const onTrySet = function * ({payload: url}) {
	try {
		const {status, headers} = yield axios.head(url, {
			headers: {
				Accept: [
					'application/sparql-results+json',
					'application/sparql-results+xml'
				].join(', ')
			}
		});
		yield put(set({url, status, contentType: headers['content-type']}));
	} catch (error) {
		console.error(error);
		yield put(set({url, status: error.response.status}));
	}
};

export default combineSagas({
	[constants.trySet]: onTrySet
});
