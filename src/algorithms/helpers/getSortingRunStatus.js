import { store } from "../../store"

/**
 * Returns the sortingRunStatus in store's state
 * @returns sortingRunStatus
 */
function getCurrentSortingRunStatus() {
    // Gets the current state object in store
    const state = store.getState();

    // Gets the sortingRunStatus from state object
    const status = state.sortingRunStatus;
    return status;
}

export default getCurrentSortingRunStatus;