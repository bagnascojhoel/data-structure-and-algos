export default function bs_list(haystack: number[], needle: number): boolean {
    let limitHigh = haystack.length;
    let limitLow = 0;
    let middleIndex;
    while (limitHigh > limitLow) {
        middleIndex = limitLow + Math.floor((limitHigh - limitLow) / 2)
        if (haystack[middleIndex] === needle) {
            return true;
        } else if (haystack[middleIndex] > needle) {
            limitHigh = middleIndex;
        } else {
            limitLow = middleIndex + 1;
        }
    }
    return false;
}