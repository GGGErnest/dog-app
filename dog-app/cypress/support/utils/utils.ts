export function createCypressSelector(id: string): string {
  return `[data-cy="${id}"]`;
}
