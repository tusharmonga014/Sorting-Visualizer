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

/**
 * Sets value at specific index in store's State Array
 * @param {number} index Index at which value needs to be stored,
 * @param {*} value The value which needs to be set
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

/**
 * Removes value at specific index in store's state array
 * @param {number} index Index at which value needs to be removed
 * @returns An action object with type and payload
 */
export const removeValue = (index) => {
    return {
        type: 'REMOVE_VALUE',
        payload: index
    }
}

/**
 * Inserts value at specific index in store's state array
 * @param {number} index Index at which value needs to be inserted
 * * @param {*} value The value which needs to be inserted
 * @returns An action object with type and payload
 */
export const insertValue = (index, value) => {
    return {
        type: 'INSERT_VALUE',
        payload: {
            id: index,
            data: value
        }
    }
}
