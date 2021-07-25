/**
 * Sets the sort array as provided array
 * @param {Array} payload takes an array to best set as sortedArray
 */
export const setSortedArray = (payload) => {
    return {
        type: 'SET_SORTEDARRAY',
        payload: payload
    }
};

/**
 * Adds the given element to sortedArray
 * @param {*} payload element to be added in sortedArray
 */
export const addToSortedArray = (payload) => {
    return {
        type: 'ADD_TO_SORTEDARRAY',
        payload: payload
    }
};

/**
 * Adds the given array to sortedArray
 * @param {Array} payload An array to be added to sortedArray
 */
export const addArrayToSortedArray = (payload) => {
    return {
        type: 'ADD_ARRAY_TO_SORTEDARRAY',
        payload: payload
    }
}
