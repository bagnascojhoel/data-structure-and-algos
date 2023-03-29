import { unchangedTextChangeRange } from 'typescript'

type Node<T> = {
  value: T
  next?: Node<T>
}

const INDEX_OUT_OF_BOUNDS_MESSAGE = 'index out of bounds'

export default class SinglyLinkedList<T> {
  public length: number
  private head: Node<T> | undefined
  private tail: Node<T> | undefined

  constructor() {
    this.head = undefined
    this.length = 0
  }

  prepend(item: T): void {
    const newNode: Node<T> = { value: item }

    if (this.head !== undefined) {
      newNode.next = this.head
    }

    if (this.tail === undefined) {
      this.tail = newNode
    }

    this.head = newNode
    this.length++
  }

  insertAt(item: T, idx: number): void {
    if (idx < 0 || idx > this.length - 1) throw INDEX_OUT_OF_BOUNDS_MESSAGE

    const newNode = { value: item } as Node<T>
    if (this.head === undefined || idx === 0) {
      newNode.next = this.head
      this.head = newNode
    } else {
      let i = 0
      let node: Node<T> | undefined = this.head
      const indexOfOneNodeBefore = idx - 1
      while (i <= indexOfOneNodeBefore) {
        if (i === idx) {
          break
        }

        i++
        node = node?.next
      }

      if (node === undefined) {
        throw INDEX_OUT_OF_BOUNDS_MESSAGE
      } else {
        const nodeToReplace = node.next
        node.next = newNode
        newNode.next = nodeToReplace
      }
    }

    this.length++
  }

  append(item: T): void {
    const newNode: Node<T> = { value: item }

    if (this.head === undefined) {
      this.head = newNode
    }

    if (this.tail !== undefined) {
      this.tail.next = newNode
    }

    this.tail = newNode
    this.length++
  }

  remove(item: T): T | undefined {
    if (this.head === undefined) {
      return undefined
    }

    let prev = undefined
    let nodeToRemove = undefined
    if (this.head.value === item) {
      nodeToRemove = this.head
      this.head = nodeToRemove.next
    }

    if (nodeToRemove === undefined) {
      let node: Node<T> | undefined = this.head
      let i = 0
      while (i++ < this.length && node !== undefined) {
        if (node.next?.value === item) {
          break
        }

        node = node.next
      }

      if (node === undefined || node.next === undefined) {
        return undefined
      }

      prev = node
      nodeToRemove = node.next
      node.next = nodeToRemove.next
    }

    if (this.tail === nodeToRemove) {
      this.tail = prev
    }

    nodeToRemove.next = undefined
    this.length--

    return nodeToRemove.value
  }

  get(idx: number): T | undefined {
    if (this.head === undefined) {
      return undefined
    }

    let i = 0
    let node: Node<T> | undefined = this.head
    while (i < idx) {
      if (i === idx) {
        break
      }

      i++
      node = node?.next
    }

    return node?.value
  }

  removeAt(idx: number): T | undefined {
    if (this.head === undefined) {
      return undefined
    }

    let prev = undefined
    let nodeToRemove = undefined
    if (idx === 0) {
      nodeToRemove = this.head
      this.head = nodeToRemove.next
    }

    if (nodeToRemove === undefined) {
      let node: Node<T> | undefined = this.head
      let i = 0
      while (i++ < this.length && node !== undefined) {
        if (i + 1 >= idx) {
          break
        }

        node = node.next
      }

      if (node === undefined || node.next === undefined) {
        return undefined
      }

      prev = node
      nodeToRemove = node.next
      node.next = nodeToRemove.next
    }

    if (this.tail === nodeToRemove) {
      this.tail = prev
    }

    nodeToRemove.next = undefined
    this.length--

    return nodeToRemove.value
  }
}
