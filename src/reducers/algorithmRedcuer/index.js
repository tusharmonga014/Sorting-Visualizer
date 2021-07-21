import { DEFAULT_SELECTED_ALGORITHM } from "../../defaults";

export const algorithm = (state = DEFAULT_SELECTED_ALGORITHM, action) => {
    switch (action.type) {
        case 'SET_ALGORITHM':
            return  action.payload;
        default: return state;
    }
}