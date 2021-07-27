import { swapValuesInArray } from "../utilities";

export const array = (state = [], action) => {
    switch (action.type) {
        case 'SET_ARRAY':
            return action.payload;
        case 'SWAP_VALUES':
            return swapValuesInArray(state, action.payload.firstIdx, action.payload.secondIdx);
        default: return state;
    }
}