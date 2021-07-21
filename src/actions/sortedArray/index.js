export const setSortedArray = (payload) => {
    return {
        type: 'SET_SORTEDARRAY',
        payload: payload
    }
};

export const addToSortedArray = (payload) => {
    return {
        type: 'ADD_TO_SORTEDARRAY',
        payload: payload
    }
};
