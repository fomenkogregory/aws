export interface Read<T> {
  find: () => Promise<T[]>
  findOne: (id: string) => Promise<T>
}

export interface Write<T> {
  create: (item: T) => Promise<T>
  update: (id: string, item: T) => Promise<T>
  delete: (id: string) => Promise<void>
}