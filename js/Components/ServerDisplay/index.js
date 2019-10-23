import {compose, renderNothing} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {actions as serverBar} from '../../Ducks/serverBar';
import {actions as data} from '../../Ducks/data';
import {server} from '../../Ducks/server/selectors';

import Presenter from './Presenter';
import {named, branch} from '../utilities';

export default compose(
	connect(
		createStructuredSelector({server}),
		{
			change: serverBar.editingOn,
			init: data.init
		}
	),
	named('ServerDisplay')
)(Presenter);
