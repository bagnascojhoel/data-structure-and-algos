type Node = {
  value: string
  isWordEnd?: boolean
  children: (Node | undefined)[]
}

export default class Trie {
  private static INITIAL_CHAR_CODE: number = 'a'.charCodeAt(0)
  private root: Node

  constructor() {
    this.root = { value: '', children: [] }
  }

  insert(item: string): void {
    let current: Node | undefined = this.root
    let charIndex: number | undefined = undefined
    for (let char of item) {
      if (current === undefined) break

      charIndex = this.calculateIndex(char)
      if (current.children[charIndex] === undefined) {
        current.children[charIndex] = { value: char, children: [] }
      }
      current = current.children[charIndex]
    }

    if (current) {
      current.isWordEnd = true
    }
  }

  delete(word: string): void {
    let current = this.root
    let child: Node | undefined = undefined
    let childIndex: number | undefined = undefined
    for (let char of word) {
      childIndex = this.calculateIndex(char)
      child = current.children[childIndex]

      if (child !== undefined) {
        if (child?.children.length === 0) {
          current.children[childIndex] = undefined
        }

        current = child
      }
    }

    if (child?.isWordEnd) {
      child.isWordEnd = false
    }
  }

  find(partial: string): string[] {
    let current: Node | undefined = this.root
    for (let char of partial) {
      if (current === undefined) return []

      current = current.children[this.calculateIndex(char)]
    }

    return this.search(current, partial)
  }

  private search(current: Node | undefined, partial: string): string[] {
    if (!current) return []

    let result: string[] = []
    for (let child of current.children) {
      if (child === undefined) {
        continue
      }

      if (child.isWordEnd) {
        result.push(partial + child.value)
      }

      result = [...result, ...this.search(child, partial + child.value)]
    }
    return result
  }

  private calculateIndex(char: string): number {
    return char.charCodeAt(0) - Trie.INITIAL_CHAR_CODE
  }
}
