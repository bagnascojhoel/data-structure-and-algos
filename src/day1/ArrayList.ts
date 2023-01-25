export default class ArrayList<T> {
    private readonly INITIAL_CAPACITY = 100;

    public length: number;
    private array: (T | undefined)[];

    constructor(initialCapacity?: number) {
        this.length = 0;
        this.array = new Array(initialCapacity ?? this.INITIAL_CAPACITY);
    }

    prepend(item: T): void {
        if (!this.hasCapacity()) {
            this.increaseArrayCapacity();
        }
        for (let i = this.length -1; i >= 0; i--) {
            this.array[i + 1] = this.array[i];
            this.array[i] = undefined;
        }
        this.array[0] = item;
        this.length++;
    }

    append(item: T): void {
        const index = this.length; 
        this.insertAt(item, index);
    }

    insertAt(item: T, index: number): void {
        if (!this.fitsInCapacity(index)) {
            this.increaseArrayCapacity()
        }
        this.array[index] = item;
        this.length++;
    }

    remove(item: T): T | undefined {
        const index = this.array.findIndex(i => i === item);
        const itemExists = index >= 0;
        if (!itemExists) {
            return undefined;
        }
        for (let i = index; i + 1 < this.length; i++) {
            this.array[i] = this.array[i + 1]
        }
        this.length--;
        return item;
    }

    get(index: number): T | undefined {
        return this.length > index ? this.array[index] : undefined;
    }

    removeAt(index: number): T | undefined {
        const indexExists = index >= 0 && this.length > index;
        if (!indexExists) {
            return undefined;
        }
        const itemFound = this.array[index];
        if (itemFound !== undefined) {
            for (let i = index; i + 1 < this.length; i++) {
                this.array[i] = this.array[i + 1]
            }
            this.length--;
        }
        return itemFound;
    }

    private hasCapacity() {
        return this.array.length > this.length;
    }

    private fitsInCapacity(index: number) {
        return this.array.length > index;
    }

    private increaseArrayCapacity(): void {
        const currentCapacity = this.array.length;
        const newArray = new Array(currentCapacity * 2);
        for (let i = 0; i < currentCapacity; i++) {
            newArray[i] = this.array[i];
        }
        this.array = newArray;
    }
}