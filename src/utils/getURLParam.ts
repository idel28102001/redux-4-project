export function getURLParam<T extends string | number>(url: URL, param: string, defaultValue: T): T {
  const value = url.searchParams.get(param) || defaultValue;
  if (typeof defaultValue === 'number') return Number(value) as T;
  return value as T;
}
