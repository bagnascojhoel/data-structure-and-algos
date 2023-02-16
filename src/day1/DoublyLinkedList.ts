type Node<T> = {
    value: T
    next?: Node<T>
    prev?: Node<T>
}
const INDEX_OUT_OF_BOUNDS_MESSAGE = 'index out of bounds';
export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>
    private tail?: Node<T>

    constructor() {
        this.length = 0;
        this.head = undefined;
        this.tail = undefined;
    }

    prepend(item: T): void {
        this.length++;
        const node: Node<T> = { value: item };
        if (this.head) {
            this.head.prev = node;
            node.next = this.head;
        }
        this.head = node;
        if (!this.tail) {
            this.tail = node;
        }
    }

    append(item: T): void {
        this.length++;
        const node: Node<T> = { value: item }
        if (this.tail) {
            this.tail.next = node;
        }
        node.prev = this.tail;
        this.tail = node;
        if (!this.head) {
            this.head = node;
        }
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0 || idx > this.length - 1) throw INDEX_OUT_OF_BOUNDS_MESSAGE;

        const node: Node<T> = { value: item }
        let useHead = Math.min(idx, (this.length - 1) - idx) === idx;
        let replaceableNode: Node<T> | undefined = useHead ? this.head : this.tail;
        for (let i = idx; replaceableNode && idx >= 0; i--) {
            if (useHead) {
                replaceableNode = replaceableNode.next;
            } else {
                replaceableNode = replaceableNode.prev;
            }
        }

        node.next = replaceableNode;
        if (replaceableNode) replaceableNode.prev = node;

        if (replaceableNode === this.head) this.head = node;
        if (replaceableNode === this.tail) this.tail = node;
        this.length++;
    }

    remove(item: T): T | undefined {
        let node = this.head;
        while (node && node.value !== item) {
            node = node.next;
        }
        if (!node) return undefined;
        this.length--;
        this.cleanRef(node);
        return node.value;
    }

    get(idx: number): T | undefined {
        const node = this.findByIndex(idx);
        return node?.value;
    }

    removeAt(idx: number): T | undefined {
        const node = this.findByIndex(idx);
        if (!node) return undefined;
        this.length--;
        this.cleanRef(node);
        return node.value
    }

    private cleanRef(node: Node<T>): void {
        if (this.head === node) {
            this.head = node.next;
        }
        if (this.tail === node) {
            this.tail = node.prev;
        }
        if (node.prev) {
            node.prev.next = node.next
        }
        if (node.next) {
            node.next.prev = node.prev
        }

        node.next = undefined;
        node.prev = undefined;
    }

    private findByIndex(idx: number): Node<T> | undefined {
        let node = this.head;
        if (idx < 0 || idx >= this.length) return undefined;
        for (let i = 0; node && i < idx; i++) {
            node = node.next;
        }
        return node;
    }
}