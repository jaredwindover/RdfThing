import {
	all,
	takeEvery,
	select,
	call,
	spawn,
	put,
	delay
} from 'redux-saga/effects';

import {begin, succeed, error} from './constants';
import {combineSelectors} from './selectors';

export const simpleCombine = Sagas => function * () {
	yield all(Sagas.map(s => s()));
};

export const combineSagas = mapping => function * () {
	yield all(Object.entries(mapping)
	          .map(([type, gen]) => {
		          if (type === undefined) {
			          throw new Error('Undefined in saga. You don\'t mean it');
		          }
		          return [type, gen];
	          })
	          .map(([type, gen]) => takeEvery(type, gen)));
};

export const applyToAll = f => obj => {
	const newObj = {};
	for (const key in obj) {
		newObj[key] = f(obj[key]);
	}
	return newObj;
};

export function* scopedPendingWrapper(scope, fn, ...args) {
	yield put({type: begin(scope)});
	try {
		const res = yield call(fn, ...args);
		yield put({type: succeed(scope)});
		return res;
	}
	catch(e) {
		yield put({type: error(scope), payload: {error: e}});
		throw e;
	}
}

export const unhandledError = e => put({
	type: 'UNHANDLED_ERROR',
	payload: {
		error: e
	}
});

export const makeMap = key => objects =>
	objects.reduce((map, o) => {
		map[o[key]] = o;
		return map;
	}, {});

export const makeRestartable = (name, saga) => function* () {
	yield spawn(function* () {
		while (true) {
			try {
				yield put({type: `[${name}]_SAGA_STARTING`});
				yield call(saga);
				yield put({type: `[${name}]_SAGA_ENDING`});
			} catch (e) {
				yield unhandledError(e);
			}
			yield delay(1000);
		}
	});
};

export const rootSaga = sagas => function* () {
	yield all(
		Object.entries(sagas)
			.map(([name, saga]) => makeRestartable(name, saga))
			.map(call)
	);
};

export const arrToMap = arr => arr.reduce((o, [k, v]) => {
	o[k] = v;
	return o;
}, {});
