import {objectMap} from './';

export const
act = type => {
	if (type === undefined) {
		throw new Error('type cannot be undefined. You don\'t want this');
	}
	return payload => {
		const res = {type};
		if (payload !== undefined) {
			res.payload = payload;
		}
		return res;
	};
},
tag = tags => {
	if (tags.some(x => x === undefined)) {
		throw new Error('tags cannot be undefined. You don\'t want this');
	}
	return actor => payload => {
		const action = actor(payload);
		action.tags = action.tags ? action.tags.concat(tags): tags;
		return action;
	};
},
innerAct = type => f => payload => act(type)({
	id: payload.id,
	inner: f(payload)
}),
observe = (action, obs) => {
	action.observe = obs;
	action.do = Object.entries(obs).reduce(
		(o, [k, v]) => {
			o[k] = act(v);
			return o;
		}, {}
	);
};
