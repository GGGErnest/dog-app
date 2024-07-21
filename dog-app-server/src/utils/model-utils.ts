export function converPageAndPageSizeToStartAndEndFormat(page: number, pageSize: number): [number, number] {
	const start = Math.abs(page * pageSize - pageSize);
	const end = page * pageSize;
	return [start, end];
}

