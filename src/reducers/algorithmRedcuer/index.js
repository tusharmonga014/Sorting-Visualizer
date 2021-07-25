import { getAlgorithmById } from "../../algorithms";
import { DEFAULT_SELECTED_ALGORITHM_ID } from "../../defaults";

export const algorithm = (state = () => getAlgorithmById(DEFAULT_SELECTED_ALGORITHM_ID), action) => {
    switch (action.type) {
        case 'SET_ALGORITHM':
            return action.payload;
        default: return state;
    }
}