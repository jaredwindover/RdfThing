import constants from './constants';
import {tag, act} from '../../utilities/actions';

import {actions as textField} from '../textField';
import {actions as toggle} from '../toggle';

const forServerBar = tag([constants.serverBarTag]);

export const
change = forServerBar(textField.change),
submit = forServerBar(act(constants.submit)),
blur = forServerBar(textField.blur),
editingOn = forServerBar(toggle.on),
editingOff = forServerBar(toggle.off);
