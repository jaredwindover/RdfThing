import {createSelector} from 'reselect';

export const combineSelectors = obj => store => {
	const res = {};
	for (const name in obj) {
		res[name] = obj[name](store);
	}
	return res;
};

const dataUiSelector = f => (dataSel, uiSel) => createSelector(
	dataSel,
	uiSel,
	f
);

const uiSelector = f => uiSel => createSelector(uiSel, f);

const prepareArrayField = ({value, dirty, focused, ...rest}) => {
	const empty = (
		dirty &&
			(!value ||
			 !Array.isArray(value) ||
			 value.length == 0) &&
			!focused);
	return {
		value: value || [],
		dirty,
		focused,
		empty,
		...rest
	};
};

const prepareTextField = ({value, dirty, focused, ...rest}) => {
	const empty = (dirty && value == '' && !focused);
	return {
		value: value ? value.toString() : '',
		dirty,
		focused,
		empty,
		...rest
	};
};

const makeDataUiFieldSelector = prep => dataUiSelector(
	(dataValue, {value, dirty, ...rest}) => prep({
		value: dirty? value: dataValue,
		dirty,
		...rest})
);

const makePlainUiFieldSelector = prep => uiSelector(prep);

export const
textFieldSelector = makeDataUiFieldSelector(prepareTextField),
plainTextFieldSelector = makePlainUiFieldSelector(prepareTextField),
boolFieldSelector = makeDataUiFieldSelector(
	({value, ...rest}) => ({value: Boolean(value), ...rest})
);
