/**
 * Returns the array with value inserted at given index
 * @param {Array} array Array in which value needs to be inserted
 * @param {Number} index Index at wich value gets inserted
 * @param {Number} replaceCounter Number of indices to replace after given index by the given value
 * @param {*} value Value which is to be inserted
 * @returns Array with value inserted at index 
 */
export function setValueInArrayUsingSplice(array, index, replaceCounter, value) {
    array.splice(index, replaceCounter, value);
    return array;
}