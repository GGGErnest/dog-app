import { MemoryCacheIdRequestkey, MemoryCacheRangeRequestKey } from '../types/interfaces/cache';

export function converPageAndPageSizeToStartAndEndFormat(page: number, pageSize: number): [number, number] {
	const start = page * pageSize - page;
	const end = page * pageSize;
	return [start, end];
}

export function serializeMemoryCacheRangeRequestKey(entityId: string, start: number, end: number): string {
	const entityKey: MemoryCacheRangeRequestKey = {
		entityName: entityId,
		start,
		end
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
