export default class RingBuffer<T> {
  private array: (T | undefined)[]
  public length: number
  private capacity: number
  private head: number
  private tail: number

  constructor(initialCapacity?: number) {
    this.capacity = initialCapacity ?? 3
    this.array = new Array(this.capacity)
    this.length = 0
    this.tail = 0
    this.head = -1
  }

  push(item: T): void {
    if (!this.hasCapacity()) {
      this.increaseArrayCapacity()
    }
    this.length++
    this.array[this.tail] = item
    this.tail = ++this.tail % this.capacity
  }

  pop(): T | undefined {
    if (this.head < 0) {
      this.head = 0
    }
    if (this.head === this.tail) {
      return undefined
    }
    this.length--
    const item = this.array[this.head]
    this.head = ++this.head % this.capacity
    return item
  }

  get(index: number): T | undefined {
    return this.array[this.head + index]
  }

  private hasCapacity() {
    return this.length < this.capacity
  }

  private increaseArrayCapacity(): void {
    const newArray = new Array(this.capacity * 2)
    const head = this.head === undefined ? 0 : this.head
    for (let pointer = head, i = 0; pointer <= this.tail; pointer++, i++) {
      newArray[i] = this.array[pointer]
    }
    this.head = 0
    this.tail = this.length - 1
    this.array = newArray
  }
}
