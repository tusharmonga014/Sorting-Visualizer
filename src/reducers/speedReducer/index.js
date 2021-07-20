
export const speed = (state = 50, action) => {
    switch (action.type) {
        case 'SET_SPEED':
            return action.payload;

        default: return state;
    }
}