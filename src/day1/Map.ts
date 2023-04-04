import SinglyLinkedList from '@code/SinglyLinkedList'
import ArrayList from '@code/ArrayList'

type Node<K extends string | number, V> = {
  key: K
  value: V
}

const MAX_LOAD_FACTOR: number = 0.7
const CAPACITY_INCREASE_FACTOR: number = 1.5
export default class Map<T extends string | number, V> {
  private nodeGroupCapacity: number
  private length: number
  private nodeGroups: ArrayList<Node<T, V>[]>

  constructor(initialCapacity?: number) {
    this.nodeGroupCapacity = initialCapacity ?? 10
    this.nodeGroups = new ArrayList(this.nodeGroupCapacity)
    this.length = 0
  }

  get(key: T): V | undefined {
    const nodeGroupIndex = this.hash(key)

    let result: V | undefined
    const nodes = this.nodeGroups.get(nodeGroupIndex)
    if (nodes === undefined) {
      result = undefined
    } else {
      result = nodes.find((node) => node.key === key)?.value
    }

    return result
  }

  set(key: T, value: V): void {
    if (this.getLoadFactor() >= MAX_LOAD_FACTOR) {
      this.increaseCapacity()
    }

    const nodeGroupIndex = this.hash(key)
    let nodes = this.nodeGroups.get(nodeGroupIndex)
    if (nodes === undefined) {
      nodes = []
      this.nodeGroups.insertAt(nodes, nodeGroupIndex)
    }

    nodes.push({ key, value } as Node<T, V>)
    this.length++
  }

  delete(key: T): V | undefined {
    const nodeGroupIndex = this.hash(key)

    const nodes = this.nodeGroups.get(nodeGroupIndex)
    let deletedValue: V | undefined
    if (nodes === undefined) {
      deletedValue = undefined
    } else {
      const valueIndex = nodes.findIndex((node) => node.key === key)
      if (valueIndex === -1) {
        deletedValue = undefined
      } else {
        const singleDeletedNode = nodes.splice(valueIndex, 1)[0]
        deletedValue = singleDeletedNode.value
        this.length--
      }
    }

    return deletedValue
  }

  size(): number {
    return this.length
  }

  private getLoadFactor(): number {
    return this.length / this.nodeGroupCapacity
  }

  private increaseCapacity() {
    const currentCapacity = this.nodeGroupCapacity
    const currentNodeGroups = this.nodeGroups
    this.nodeGroupCapacity = Math.ceil(
      this.nodeGroupCapacity * CAPACITY_INCREASE_FACTOR
    )
    this.nodeGroups = new ArrayList(this.nodeGroupCapacity)

    for (let i = 0; i < currentCapacity; i++) {
      const nodeGroup = currentNodeGroups.get(i)

      if (nodeGroup === undefined) {
        continue
      }

      for (let node of nodeGroup) {
        this.set(node.key, node.value)
      }
    }
  }

  private hash(key: T): number {
    let totalKeyCharCodeValue = 0
    for (let char of key.toString()) {
      totalKeyCharCodeValue += char.charCodeAt(0)
    }
    return totalKeyCharCodeValue % this.nodeGroupCapacity
  }
}
