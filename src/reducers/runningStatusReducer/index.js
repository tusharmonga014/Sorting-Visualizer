
export const runningStatus = (state = false, action) => {
    switch (action.type) {
        case 'SET_RUNNINGSTATUS':
            return action.payload;

        default: return state;
    }
}