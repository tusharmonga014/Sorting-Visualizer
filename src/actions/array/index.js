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
