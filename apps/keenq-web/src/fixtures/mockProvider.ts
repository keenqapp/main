import { Entity, Provider } from '@/types/types'

export default class MockProvider<T extends Entity> implements Provider<T> {

  data

  constructor(data: T[]) {
    this.data = data
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  get(id: string): T | undefined {
    return this.data.find(item => item.uid === id)
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  getAll(): T[] {
    return this.data
  }

}
