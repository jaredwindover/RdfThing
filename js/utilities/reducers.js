export const
toggle = state => !state,
just = v => () => v,
returnTrue = just(true),
returnFalse = just(false),
justPayload = (state, {payload}) => payload,
applyPayload = (state, {payload}) => ({...state, ...payload}),
addToArray = (state, {payload}) => [...state, payload],
merge = obj => state => ({...state, ...obj});

const createFilteredReducer = (pred, reducer) => (state, action) => {
	const isInit = state === undefined;
	const shouldRunWrappedReducer = pred(action) || isInit;
	return shouldRunWrappedReducer ? reducer(state, action) : state;
};

const createPredReducer = (initialState, arr) => (state, action) => {
	if (state === undefined) {
		return initialState;
	}
	for (const {pred, handler} of arr) {
		if (pred(action)) {
			return handler(state, action);
		}
	}
	return state;
};

export const tagReducer = (tags, reducer) => {
	if (tags.some(x => x === undefined)) {
		throw new Error('Tags cannot be undefined. You don\'t want this.');
	}
	return createFilteredReducer(
		action => action &&
			action.tags &&
			tags.every(t => action.tags.includes(t)),
		reducer
	);
};

export const createReducer = (initialState, obj) => createPredReducer(
	initialState,
	Object.entries(obj).map(([type, handler]) => ({
		pred: action => action && action.type == type,
		handler
	}))
);

export const createTagReducer = (initialState, arr) => createPredReducer(
	initialState,
	arr.map(([type, tags, handler]) => ({
		pred: action => action && action.type == type &&
			tags.every(t => action.tags.includes(t)),
		handler
	}))
);

export const objectReducer = innerReducer => (
	state,
	{payload: {id, inner}}
) => {
	const newState = {...state};
	newState[id] = innerReducer(newState[id] || {}, inner);
	return newState;
};

export const arrayReducer = ({
	push = "PUSH",
	update = "UPDATE"
}) => createReducer(
	[],
	{
		[update]: justPayload,
		[push]: addToArray
	}
);
