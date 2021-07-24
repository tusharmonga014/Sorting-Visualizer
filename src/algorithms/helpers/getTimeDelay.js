import { store } from "../../store";
import { SORTING_SPEED_UPPER_LIMIT } from "../../defaults";

/**
 * @returns the timedelay between each step,
 *          so if speed is 10 and speed range is 0-100
 *          timedelay will be of 90ms
 */
function getTimeDelay() {
    const state = store.getState();
    const speed = state.speed;
    return SORTING_SPEED_UPPER_LIMIT - speed;
}

export default getTimeDelay;