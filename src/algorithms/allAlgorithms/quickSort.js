import { store } from "../../store";
import { setCurrentlyChecking } from "../../actions/currentlyChecking";
import { addToSortedArray, setSortedArray } from "../../actions/sortedArray";
import { swapValues } from "../../actions/array";
import { setPivot } from "../../actions/pivot";
import continueAfterDelayIfNotStopped from "../helpers/continueAfterDelayIfNotStopped";
import checkCurrentSortingRunStatus from "../helpers/checkCurrentStatus";
import { sortingCompleted } from "../../actions/sortingRunStatus";

/**
 * 
 * @param {Array} localArray Copy of the array on which we want to we want to perform Quick Sort
 * @param {number} startIdx Starting index 
 * @param {number} endIdx Ending index 
 * @returns Pivot index
 */
async function partition(localArray, startIdx, endIdx) {

    // Taking the last element as the pivot
    /**
     * Value at selected(last element) pivot
     */
    const pivotValue = localArray[endIdx];
    store.dispatch(setPivot(endIdx));

    /**
     * Shows uptill where the value is smaller than pivotValue
     */
    let pivotIdx = startIdx;

    /**
     * Aborts the sort if value is false
     */
    let continueSort = true;

    for (let idx = startIdx; idx < endIdx; idx++) {

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        /**
         * Shows the indices of the first and second 
         * which are being compared currently
         */
        store.dispatch(setCurrentlyChecking([idx, pivotIdx]));

        if (localArray[idx] <= pivotValue) {
            // Check if stopped or paused - delay accoring to selected speed - again check
            continueSort = await continueAfterDelayIfNotStopped();
            // Return if stopped
            if (!continueSort)
                return;

            // Swapping the value
            store.dispatch(swapValues(idx, pivotIdx));

            // Moving to next element
            pivotIdx++;
        }

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        /**
         * Removing the marking on indices
         */
        store.dispatch(setCurrentlyChecking([]));
    }

    // Check if stopped or paused - delay accoring to selected speed - again check
    continueSort = await continueAfterDelayIfNotStopped();
    // Return if stopped
    if (!continueSort)
        return;

    // Putting the pivot value in the middle
    store.dispatch(swapValues(endIdx, pivotIdx));

    return pivotIdx;
};

async function quickSortRecursive(localArray, startIdx, endIdx) {
    // Base case or terminating case
    if (startIdx >= endIdx) {
        return;
    }

    // Returns pivotIndex
    const pivotIdx = await partition(localArray, startIdx, endIdx);

    store.dispatch(addToSortedArray(pivotIdx));

    /**
     * Aborts the sort if value is false
     */
    let continueSort = await checkCurrentSortingRunStatus()
        .then(async () => {
            // Recursively apply the same logic to the left and right subarrays
            store.dispatch(addToSortedArray(pivotIdx));
            await quickSortRecursive(localArray, startIdx, pivotIdx - 1);
            // Marking first index for this part as sorted
            store.dispatch(addToSortedArray(startIdx));
            await quickSortRecursive(localArray, pivotIdx + 1, endIdx);
            // Marking first index for this part as sorted
            store.dispatch(addToSortedArray(pivotIdx + 1));
        })
        .catch(() => false);
    // Aborting and returing if Stopped
    if (!continueSort)
        return;
}

/**
 * Performs quick sort on the store's state array
 */
async function quickSort() {

    /** 
     * Gets current state object
     */
    const state = store.getState();

    /** 
     * Store's state Array
     */
    const localArray = state.array;

    /**
     * length of array
     */
    const arraySize = state.array.length;

    // Performing quick sort on the array
    await quickSortRecursive(localArray, 0, arraySize - 1);

    // Remove the pivot regardless of whether sort was completed or stoped
    store.dispatch(setPivot(null));

    /**
     * After sorting sets the Sorting Running Status to COMPLETED
     * it will automatically check and make them sorted colour
     * 
     * Also check if sort was not stopped
     */
    let sortAborted = await checkCurrentSortingRunStatus()
        .then(() => false)
        .catch(() => true);

    // If sort was stopped then empty the currentlyChecking and sortedArray
    if (sortAborted) {
        store.dispatch(setSortedArray([]));
        store.dispatch(setCurrentlyChecking([]));
    }
    // Else sort was not aborted then mark sort as COMPLETED
    else
        store.dispatch(sortingCompleted());
}

export default quickSort;