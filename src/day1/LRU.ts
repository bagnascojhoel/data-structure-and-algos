export default class LRU<K, V> {
  private length: number
  private head: K
  private tail: K

  constructor() {}

  update(key: K, value: V): void {}

  get(key: K): V | undefined {}
}
