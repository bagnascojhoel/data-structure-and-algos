type Node<T> = {
  value: T
  next?: Node<T>
}
export default class Stack<T> {
  public length: number
  private head?: Node<T>

  constructor() {
    this.length = 0
    this.head = undefined
  }

  push(item: T): void {
    this.length++
    const newNode = { value: item } as Node<T>
    if (this.head !== undefined) {
      newNode.next = this.head
    }
    this.head = newNode
  }

  pop(): T | undefined {
    if (this.head === undefined) {
      return undefined
    }
    this.length--
    const popped = this.head
    const next = popped.next
    if (next !== undefined) {
      popped.next = undefined
    }
    this.head = next
    return popped.value
  }

  peek(): T | undefined {
    return this.head?.value
  }
}
