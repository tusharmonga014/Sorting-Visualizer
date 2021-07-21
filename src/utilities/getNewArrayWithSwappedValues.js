function checkIfIndexOutOfBounds(index, arraySize) {
    if (index < 0 || index >= arraySize) {
        console.error(index + " passed for swapping is out of bounds for " + arraySize + ", can't swap values.");
        return true;
    }
    return false;
}

/**
 * 
 * @param {*} array Array whose values need to be swapped 
 * @param {*} swappingIndicesArray An Array of 2 indices whose values are to be swapped
 * @returns A new array with swapped values
 */
export function getNewArrayWithSwappedValues(array, swappingIndicesArray) {

    // show error if exactly 2 indices are not passed
    if (swappingIndicesArray.length !== 2) {
        console.error("An array of 2 indices required for swapping instead recieved " + swappingIndicesArray.length + " values , can't swap values");
        return array;
    }

    const arraySize = array.length;

    let firstIdx = swappingIndicesArray[0];
    let secondIdx = swappingIndicesArray[1];

    // first and second index both should be in range 0 to (arraySize - 1)
    if (checkIfIndexOutOfBounds(firstIdx, arraySize) || checkIfIndexOutOfBounds(secondIdx, arraySize)) {
        return array;
    }

    let firstIdxValue = null;
    let secondIdxValue = null;
    const arrayWithSwappedValues = [];

    // loop to traverse on original array
    for (var swappingIterator = 0; swappingIterator < arraySize; swappingIterator++) {
        /**
         * store the values of first and second indices and
         * copy rest all indices values
         */
        if (swappingIterator === firstIdx)
            firstIdxValue = array[swappingIterator];
        else if (swappingIterator === secondIdx)
            secondIdxValue = array[swappingIterator];

        arrayWithSwappedValues.push(array[swappingIterator]);
    }

    arrayWithSwappedValues[firstIdx] = secondIdxValue;
    arrayWithSwappedValues[secondIdx] = firstIdxValue;

    return arrayWithSwappedValues;
}