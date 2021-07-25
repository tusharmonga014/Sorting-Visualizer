import { store } from "../store";
import { sortingStarted } from "../actions/sortingRunStatus";
import ALGORITHMS from "./ALGORITHMS";

/**
 * Starts the sorting process
 */
function sort() {
    /**
     * Store's state object
     */
    const state = store.getState();

    /**
     * Algorithm object in store's state
     */
    const algorithm = state.algorithm;

    if (ALGORITHMS.includes(algorithm)) {
        // If valid algorithm is selected, call its function
        store.dispatch(sortingStarted());
        algorithm.function();
    } else {
        // If not valid algorithm, show error
        console.error("No sorting algorithm selected, can't sort");
        return;
    }
}

export default sort;