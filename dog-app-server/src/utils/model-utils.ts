export function converPageAndPageSizeToStartAndEndFormat(page: number, pageSize: number): [number, number] {
	const end = page * pageSize;
	const start = Math.abs(end - pageSize);
	return [start, end];
}

