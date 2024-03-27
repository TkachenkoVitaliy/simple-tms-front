export type NewEntity<T> = Omit<T, 'id'> & { id: null }

export type Page<T> = {
  totalCount: number
  data: T[]
}
