const protectedTemplateString = f => s => {
	if (s === undefined) {
		throw new Error(
			'Undefined string used in template. You don\'t want this.'
		);
	}
	return f(s);
};

export const
begin = protectedTemplateString(s => `${s}_BEGIN`),
error = protectedTemplateString(s => `${s}_ERROR`),
succeed = protectedTemplateString(s => `${s}_SUCCEED`),
trigger = protectedTemplateString(s => `${s}_TRIGGER`);
