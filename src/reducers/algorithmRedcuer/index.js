import { DEFAULT_SELECTED_ALGORITHM_ID } from "../../defaults";

let initialState = {
    id: DEFAULT_SELECTED_ALGORITHM_ID
}

export const algorithm = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_ALGORITHM':
            return action.payload;
        default: return state;
    }
}