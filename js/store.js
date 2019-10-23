import {
	createStore,
	compose,
	applyMiddleware
} from 'redux';
import logger from 'redux-logger';
import persistState from 'redux-localstorage';

import reducer from './reducer';

const storeVersion = 'v0.0.1';

const showErrors = _ => next => action => {
	if (action.type == 'UNHANDLED_ERROR') {
		//eslint-disable-next-line no-console
		console.error(action.payload.error);
	}
	return next(action);
};

export default (sagaMiddleware) => {

	const middlewares = [
		sagaMiddleware,
		showErrors,
		logger
	];

	const enhancer = compose(
		applyMiddleware(...middlewares),
		persistState('data', {key: storeVersion}),
		persistState('ui', {key: storeVersion})
	);

	return createStore(reducer, enhancer);
}
