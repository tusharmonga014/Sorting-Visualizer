
export const algorithm = (state = 'BUBBLE_SORT', action) => {
    switch (action.type) {
        case 'SET_ALGORITHM':
            return  action.payload;
        default: return state;
    }
}