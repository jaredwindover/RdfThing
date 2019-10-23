import {createSelector} from 'reselect';

import {value} from '../textField/selectors';

const scope = data => data.serverBar;
const fieldScope = data => data.serverBar.field;

export const
server = createSelector(fieldScope, value),
editing = createSelector(scope, ({editing}) => editing);

export default {server, editing};
