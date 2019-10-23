import {
	compose,
	branch as branchOrig,
	withProps,
	mapProps,
	setDisplayName
} from 'recompose';
import _ from 'lodash';

export const branch = (prop, ...args) => typeof prop == 'string' ?
	branchOrig(props => props[prop], ...args) :
	branchOrig(prop, ...args);

export const addClassName = f => withProps(props => {
	let {className = ''} = props;
	let additional = f;
	switch (typeof f) {
	case 'function': {
		additional = `${f(props)}`;
		break;
	}
	case 'object': {
		additional = `${f.join(' ')}`;
		break;
	}
	}
	if (className && additional) {
		className = `${className} ${additional}`;
	} else if (additional) {
		className = additional;
	}
	return {className};
});

export const addClassNameP = (p, f) => branchOrig(p, addClassName(f));

export const named = name => compose(
	setDisplayName(name),
	addClassName(name)
);

export const omitProp = p => mapProps(props => _.omit(props, p));

export const mergeProp = (name, obj) => mapProps(
	props => ({...props, [name]:  {...props[name], ...obj}})
);

export const addStyle = obj => mergeProp('style', obj);
