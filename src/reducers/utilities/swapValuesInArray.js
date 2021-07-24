function checkIfIndexOutOfBounds(index, arraySize) {
    if (index < 0 || index >= arraySize) {
        console.error(index + " passed for swapping is out of bounds for " + arraySize + ", can't swap values.");
        return true;
    }
    return false;
}

/**
 * Swaps the values in given array
 * @param {Array} array Array whose values need to be swapped 
 * @param {number} firstIdx first index
 * @param {number} secondIdx second index
 */
export function swapValuesInArray(array, firstIdx, secondIdx) {

    const arraySize = array.length;

    // first and second index both should be in range 0 to (arraySize - 1)
    if (checkIfIndexOutOfBounds(firstIdx, arraySize) || checkIfIndexOutOfBounds(secondIdx, arraySize)) {
        return array;
    }

    let temp = array[firstIdx];
    array[firstIdx] = array[secondIdx];
    array[secondIdx] = temp;

    return array;
}