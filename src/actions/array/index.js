export const setArray = (payload) => {
    return {
        type: 'SET_ARRAY',
        payload: payload
    }
};

/**
 * Swaps the value at firstIdx with secondIdx 
 * in store's state Array
 * @param {number} firstIdx first index
 * @param {number} secondIdx second index
 */
export const swapValues = (firstIdx, secondIdx) => {
    return {
        type: 'SWAP_VALUES',
        payload: {
            firstIdx: firstIdx,
            secondIdx: secondIdx
        }
    }

}
