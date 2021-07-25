
export const sortedArray = (state = [], action) => {
    switch (action.type) {
        case 'SET_SORTEDARRAY':
            return action.payload;
        case 'ADD_TO_SORTEDARRAY':
            return state.concat(action.payload);
        case 'ADD_ARRAY_TO_SORTEDARRAY':
            return state.concat(action.payload);
        default: return state;
    }
}