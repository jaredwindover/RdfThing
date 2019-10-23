import constants from './constants';
import {act} from '../../utilities/actions';

export const
trySet = act(constants.trySet),
set = act(constants.set);
