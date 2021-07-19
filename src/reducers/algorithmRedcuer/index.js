
export const algorithm = (state = '', action) => {
    switch (action.type) {
        case 'SET_ALGORITHM':
            return  action.payload;
        default: return state;
    }
}