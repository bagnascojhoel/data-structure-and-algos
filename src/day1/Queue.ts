type Node<T> = {
    value: T;
    next?: Node<T>
    previous?: Node<T>
}

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
    }

    enqueue(item: T): void {
        this.length++;
        const newNode = {
            value: item,
            next: undefined,
            previous: this.tail
        }
        if (this.tail) {
            this.tail.next = newNode;
        }
        if (this.head === undefined) {
            this.head = newNode;
        }
        this.tail = newNode;
    }

    deque(): T | undefined {
        const dequeuedNode = this.head;
        if (dequeuedNode) {
            this.length--;
            if (dequeuedNode.next) {
                dequeuedNode.next.previous = undefined;
                this.head = dequeuedNode.next;
                dequeuedNode.next = undefined;
            } else {
                this.head = undefined;
            }
        }
        if (this.length === 0) {
            this.tail = undefined;
        }

        return dequeuedNode?.value;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}