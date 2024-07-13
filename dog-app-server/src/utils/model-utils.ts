import { SortDir } from '../types/data';
import { MemoryCacheIdRequestkey, MemoryCacheRangeRequestKey, MemoryCacheTotalAmountRequestkey } from '../types/interfaces/cache';

export function converPageAndPageSizeToStartAndEndFormat(page: number, pageSize: number): [number, number] {
	const start = Math.abs(page * pageSize - pageSize);
	const end = page * pageSize;
	return [start, end];
}

export function serializeMemoryCacheRangeRequestKey(entityId: string, start: number, end: number, sort: string, sortDir: SortDir): string {
	const entityKey: MemoryCacheRangeRequestKey = {
		entityName: entityId,
		start,
		end,
		sort,
		sortDir
	}

	return JSON.stringify(entityKey);
}

export function serializeMemoryCacheIdRequestkey(entityId: string, id: string): string {
	const entityKey: MemoryCacheIdRequestkey = {
		entityName: entityId,
		id,
	}
	return JSON.stringify(entityKey);
}

export function serializeMemoryCacheTotalAmountResqueKey(entityId: string): string {
	const entityKey: MemoryCacheTotalAmountRequestkey = {
		entityName: entityId,
		total: true
	}
	return JSON.stringify(entityKey);
}
