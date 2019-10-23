import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {
	change as onChange,
	submit as onSubmit
} from '../../Ducks/serverBar/actions';

import {server} from '../../Ducks/serverBar/selectors';

import {named} from '../utilities';
import Presenter from './Presenter';

const mapStateToProps = createStructuredSelector({
	value: server
});
const mapDispatchToProps = {onChange, onSubmit};

export default compose(
	named('ServerEntry'),
	connect(mapStateToProps, mapDispatchToProps)
)(Presenter);
