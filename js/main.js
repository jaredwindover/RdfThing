import React from 'react';
import ReactDom from 'react-dom';
import {Provider} from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import saga from './saga';
import getStore from './store';
import MainLayout from './Components/MainLayout';

const sagaMiddleware = createSagaMiddleware();

const app = document.getElementById('app');

const store = getStore(sagaMiddleware);

sagaMiddleware.run(saga);

ReactDom.render(
	<Provider store={store}>
	  <MainLayout/>
	</Provider>,
	app
);
