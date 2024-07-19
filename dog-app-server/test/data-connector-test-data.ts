export const MOCK_DATA_RESPONSE = {
	message: {
		'affenpinscher': [],
		'african': [],
		'airedale': [],
		'akita': [],
		'appenzeller': [],
		'australian': [
			'kelpie',
			'shepherd'
		],
		'bakharwal': [
			'indian'
		],
		'briard': [],
		'buhund': [
			'norwegian'
		],
		'bulldog': [
			'boston',
			'english',
			'french'
		],
		'bullterrier': [
			'staffordshire'
		],
		'cattledog': [
			'australian'
		],
		'cavapoo': [],
		'chihuahua': [],
		'chippiparai': [
			'indian'
		],
		'chow': [],
		'clumber': [],
		'cockapoo': [],
		'collie': [
			'border'
		],
		'coonhound': [],
		'corgi': [
			'cardigan'
		],
		'cotondetulear': [],
		'dachshund': [],
		'dalmatian': [],
		'dane': [
			'great'
		],
		'danish': [
			'swedish'
		],
		'deerhound': [
			'scottish'
		],
		'dhole': [],
		'dingo': [],
		'doberman': [],
		'elkhound': [
			'norwegian'
		],
		'entlebucher': [],
		'eskimo': [],
		'finnish': [
			'lapphund'
		],
		'frise': [
			'bichon'
		],
		'gaddi': [
			'indian'
		],
		'germanshepherd': [],
		'greyhound': [
			'indian',
			'italian'
		],
		'groenendael': [],
		'havanese': [],
		'hound': [
			'afghan',
			'basset',
			'blood',
			'english',
			'ibizan',
			'plott',
			'walker'
		],
		'husky': [],
		'keeshond': [],
		'kelpie': [],
		'kombai': [],
		'komondor': [],
		'kuvasz': [],
		'labradoodle': [],
		'labrador': [],
		'leonberg': [],
		'lhasa': [],
		'malamute': [],
		'malinois': [],
		'maltese': [],
		'mastiff': [
			'bull',
			'english',
			'indian',
			'tibetan'
		],
		'mexicanhairless': [],
		'mix': [],
		'mountain': [
			'bernese',
			'swiss'
		],
		'mudhol': [
			'indian'
		],
	},
	status: 'success'
};

export async function fakeFetchResponse(dataToReturn: any, ok = true): Promise<Partial<Response>> {
	return { ok, json: () => dataToReturn };
}
