import Map from './Map'

type Node<K, V> = {
  key: K
  value: V
  next?: Node<K, V>
  prev?: Node<K, V>
}

export default class LRU<K extends string | number, V> {
  private capacity: number
  private length: number
  private map: Map<K, Node<K, V>>
  private tail?: Node<K, V>
  private head?: Node<K, V>

  constructor(capacity: number) {
    this.capacity = capacity
    this.length = 0
    this.tail = undefined
    this.head = undefined
    this.map = new Map(this.capacity)
  }

  update(key: K, value: V): void {
    const node = this.map.get(key)

    if (node === undefined) {
      const prependedNode = this.prepend(key, value)
      this.map.set(key, prependedNode)
      this.length++
      this.trimCache()
    } else {
      this.detachNode(node)
      this.prepend(key, value)
    }
  }

  get(key: K): V | undefined {
    const node = this.map.get(key)

    if (node !== undefined) {
      this.detachNode(node)
      this.prepend(node.key, node.value)
    }

    return node?.value
  }

  private prepend(key: K, value: V): Node<K, V> {
    const node: Node<K, V> = { key, value }
    if (this.head === undefined || this.tail === undefined) {
      this.head = this.tail = node
    } else {
      node.next = this.head
      this.head.prev = node
      this.head = node
    }
    return node
  }

  private trimCache() {
    if (this.length < this.capacity) {
      return
    }

    const tail = this.tail as Node<K, V>
    this.tail = tail.prev
    this.map.delete(tail.key)
    this.detachNode(tail)
    this.length--
  }

  private detachNode(aNode: Node<K, V>): void {
    if (this.length === 1) {
      this.tail = this.head = undefined
    } else {
      if (aNode.next !== undefined) {
        aNode.next.prev = aNode.prev
      }

      if (aNode.prev !== undefined) {
        aNode.prev.next = aNode.next
      }
    }

    aNode.next = undefined
    aNode.prev = undefined
  }
}
