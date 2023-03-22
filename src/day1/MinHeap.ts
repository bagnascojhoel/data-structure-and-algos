type Index = number;
type Node<T> = {
    value: number,
    data: T
}

export default class MinHeap<T> {
    private static ROOT_INDEX: Index = 0;

    public length: number;
    private trunk: Node<T>[];

    constructor() {
        this.trunk = [];
        this.length = 0;
    }

    insert(value: number, data: T): void {
        this.trunk[this.length] = { value, data };
        this.length++;

        this.heapfyUp(this.length - 1);
    }

    delete(): T {
        // don't need to actually remove the data from trunk; not sure if it is better this way or not
        const deletedValue = this.trunk[MinHeap.ROOT_INDEX];
        this.swap(MinHeap.ROOT_INDEX, this.length - 1);
        this.length--;

        this.heapfyDown(MinHeap.ROOT_INDEX);

        return deletedValue.data;
    }

    private heapfyUp(currentIndex: Index): void {
        const parentIndex = this.parentIndexOf(currentIndex)
        if (this.trunk[currentIndex].value < this.trunk[parentIndex]?.value) {
            this.swap(currentIndex, parentIndex);
            this.heapfyUp(parentIndex);
        }
    }

    private heapfyDown(currentIndex: Index): void {
        const leftChildIndex = this.leftChildIndexOf(currentIndex);
        const rightChildIndex = this.rightChildIndexOf(currentIndex);

        const lastIndex = this.length - 1;
        let smallestChildIndex;
        if (leftChildIndex > lastIndex) {
            // if there are no children; since its a complete tree, there will only be
            // a right child, if there is a left one
            return;
        } else if (rightChildIndex > lastIndex) {
            // there is only the left child
            smallestChildIndex = leftChildIndex;
        } else {
            // there are both children; pick smallest
            smallestChildIndex = this.trunk[leftChildIndex].value < this.trunk[rightChildIndex]?.value
                ? leftChildIndex
                : rightChildIndex;
        }

        // swap if smallest child is smaller than current 
        if (this.trunk[smallestChildIndex].value < this.trunk[currentIndex]?.value) {
            this.swap(currentIndex, smallestChildIndex);
            this.heapfyDown(smallestChildIndex);
        }
    }

    private parentIndexOf(index: Index): Index {
        return Math.floor((index - 1) / 2);
    }

    private leftChildIndexOf(index: Index): Index {
        return 2 * index + 1;
    }

    private rightChildIndexOf(index: Index): Index {
        return 2 * index + 2;
    }

    private swap(i: Index, j: Index): void {
        const temp = this.trunk[i];
        this.trunk[i] = this.trunk[j];
        this.trunk[j] = temp;
    }
}