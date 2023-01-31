
function swap(arr: number[], x1: number, x2: number): void {
  const temp = arr[x2];
  arr[x2] = arr[x1];
  arr[x1] = temp;
}

function partition(arr: number[], limitLow: number, limitHigh: number): number {
  let pivot = arr[limitHigh];
  let smallestIndex = limitLow - 1;
  for (let i = limitLow; i < limitHigh; i++) {
    if (arr[i] < pivot) {
      smallestIndex++;
      swap(arr, i, smallestIndex)
    }
  }
  swap(arr, smallestIndex + 1, limitHigh);
  return smallestIndex + 1;
}

// JODO I've got to understand this
export default function quick_sort(arr: number[], limitLow: number = 0, limitHigh: number = arr.length - 1): void {
  if (limitLow < limitHigh) {
    const pivot = partition(arr, limitLow, limitHigh);
    quick_sort(arr, pivot + 1, limitHigh);
    quick_sort(arr, limitLow, pivot - 1);
  }
}