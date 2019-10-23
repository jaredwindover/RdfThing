import {compose} from 'recompose';

import {named} from '../utilities';
import Presenter from './Presenter';

export default compose(
	named('MainLayout'),
)(Presenter);
