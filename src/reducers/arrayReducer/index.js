import { getNewArrayWithSwappedValues } from "../../utilities";

export const array = (state = [], action) => {
    switch (action.type) {
        case 'SET_ARRAY':
            return action.payload;
        case 'SWAP_VALUES':
            return getNewArrayWithSwappedValues(state, action.payload)
        default: return state;
    }
}