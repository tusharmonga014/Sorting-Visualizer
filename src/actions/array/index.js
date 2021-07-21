export const setArray = (payload) => {
    return {
        type: 'SET_ARRAY',
        payload: payload
    }
};

/**
 * 
 * @param {*} payload An array of indices i, j 
 * where swapping needs to be done as :
 * Array[i] <-> Array[j]
 */
export const swapValues = (payload) => {
    return {
        type: 'SWAP_VALUES',
        payload: payload
    }

}

/**
 * Sets value at specific index in store's State Array
 * @param {*} index Index at which value needs to be stored
 * @param {*} value The value which needs to be inserted
 * @returns An action object with type and payload
 */
export const setValue = (index, value) => {
    return {
        type: 'SET_VALUE',
        payload: {
            id: index,
            data: value
        }
    }
}
