
export const sortingRunStatus = (state = 'NOT_RUNNING', action) => {
    switch (action.type) {
        case 'STARTED':
            return 'STARTED';
        case 'CONTINUED':
            return 'CONTINUED';
        case 'PAUSED':
            return 'PAUSED';
        case 'STOPPED':
            return 'STOPPED';
        case 'COMPLETED':
            return 'COMPLETED'

        default: return state;
    }
}