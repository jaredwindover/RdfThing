import React from 'react';

export default ({onChange, onSubmit, ...other}) => (
	<div>
	  <input onChange={({target: {value}}) => onChange(value)}{...other}/>
	  <button onClick={onSubmit}>Submit</button>
	</div>
);
