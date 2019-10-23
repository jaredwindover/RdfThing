import React from 'react';
import {
	compose,
	renderComponent,
  mapProps
} from 'recompose';

import {branch} from '../utilities';

import ServerEntry from '../ServerEntry';
import ServerDisplay from '../ServerDisplay';

const dropEditing = mapProps(({editing, ...rest}) => ({...rest}));

export default compose(
	branch(
		'editing',
		compose(
      dropEditing,
      renderComponent(ServerEntry)
    )
	),
  dropEditing
)(ServerDisplay);
