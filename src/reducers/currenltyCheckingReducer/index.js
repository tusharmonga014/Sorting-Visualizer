/**
 * It denotes the array of indices currently 
 * being checked by the algorithm for sorting
 */
export const currentlyChecking = (state = [], action) => {
    switch (action.type) {
        case 'SET_CURRENTLYCHECKING':
            return action.payload;

        default: return state;
    }
}