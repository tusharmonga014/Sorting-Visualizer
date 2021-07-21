import { DEFAULT_SELECTED_SPEED } from "../../defaults";

export const speed = (state = DEFAULT_SELECTED_SPEED, action) => {
    switch (action.type) {
        case 'SET_SPEED':
            return action.payload;

        default: return state;
    }
}