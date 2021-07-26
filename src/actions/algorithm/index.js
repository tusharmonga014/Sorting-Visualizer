import { getAlgorithmById } from "../../algorithms";
import { DEFAULT_SELECTED_ALGORITHM_ID } from "../../defaults";

export const setAlgorithm = (payload = getAlgorithmById(DEFAULT_SELECTED_ALGORITHM_ID)) => {
    return {
        type: 'SET_ALGORITHM',
        payload: payload
    }
};
