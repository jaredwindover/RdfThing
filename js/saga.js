import {saga as ServerBar} from './Ducks/serverBar';
import {saga as Server} from './Ducks/server';
import {saga as Data} from './Ducks/data';

import {rootSaga} from './utilities/sagas';

export default rootSaga({
	ServerBar,
	Server,
	Data
});
