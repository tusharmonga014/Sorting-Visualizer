import { setValueInArrayUsingSplice, swapValuesInArray } from "../utilities";

export const array = (state = [], action) => {
    switch (action.type) {
        case 'SET_ARRAY':
            return action.payload;
        case 'SWAP_VALUES':
            return swapValuesInArray(state, action.payload.firstIdx, action.payload.secondIdx);
        case 'SET_VALUE':
            return setValueInArrayUsingSplice(state, action.payload.id, 1, action.payload.data);
        case 'REMOVE_VALUE':
            return state.slice(0, action.payload).concat(state.slice(action.payload + 1));
        case 'INSERT_VALUE':
            return state.slice(0, action.payload.id).concat(action.payload.data).concat(state.slice(action.payload));
        default: return state;
    }
}