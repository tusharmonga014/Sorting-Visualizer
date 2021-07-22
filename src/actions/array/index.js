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
 * @param {Object} payload
 * index : Index at which value needs to be stored,
 * value : The value which needs to be inserted
 * @returns An action object with type and payload
 */
export const setValue = (payload) => {
    return {
        type: 'SET_VALUE',
        payload: {
            id: payload.index,
            data: payload.value
        }
    }
}
