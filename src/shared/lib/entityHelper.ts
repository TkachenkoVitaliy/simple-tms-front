export function convertToNewEntity<T extends object>(entity: T): NewEntity<T> {
  return { ...entity, id: null }
}
