export const objectMap = (obj, lambda) => Object.entries(obj)
	.reduce(
		(res, [k, v]) => {
			res[k] = lambda(v, k);
			return res;
		},
		{}
	);
