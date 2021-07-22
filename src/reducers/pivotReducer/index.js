
export const pivot = (state = -1, action) => {
    switch (action.type) {
        case 'SET_PIVOT':
            return action.payload;

        default: return state;
    }
}