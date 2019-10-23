import {connect} from 'react-redux';
import {
	compose
} from 'recompose';
import {createStructuredSelector} from 'reselect';

import {named} from '../utilities';
import {editing} from '../../Ducks/serverBar/selectors';

import Presenter from './Presenter';

export default compose(
	connect(createStructuredSelector({editing}), () => ({})),
	named('ServerBar')
)(Presenter);
