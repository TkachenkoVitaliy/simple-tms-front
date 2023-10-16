export type NewEntity<T> = Omit<T, 'id'> & { id: null }
