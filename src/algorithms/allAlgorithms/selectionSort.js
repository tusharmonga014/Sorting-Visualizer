import { store } from "../../store";
import { swapValues } from "../../actions/array";
import { setCurrentlyChecking } from "../../actions/currentlyChecking";
import { setPivot } from "../../actions/pivot";
import { addToSortedArray } from "../../actions/sortedArray";
import { sortingCompleted } from "../../actions/sortingRunStatus";
import continueAfterDelayIfNotStopped from "../helpers/continueAfterDelayIfNotStopped";

/**
 * SELECTION SORT : 
 * 
 * The selection sort algorithm sorts an array by repeatedly finding the minimum
 * element (considering ascending order) from unsorted part and putting it at
 * the beginning. The algorithm maintains two subarrays in a given array.
 *
 * In every iteration of selection sort, the minimum element (considering ascending
 * order) from the unsorted subarray is picked and moved to the sorted subarray.
 */

/**
 * Perform insertion sort on store's state array
 */
async function selectionSort() {
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

    /**
     * Aborts the sort if value is false
     */
    let continueSort = true;

    /* Selection Sort Algorithm */

    /**
     * One by one move boundary of unsorted subarray
     * only till arraysize - 1 as last element will be
     * in its correct position after all iterations
     */
    for (let iterator = 0; iterator < arraySize - 1; iterator++) {

        // Find the minimum element in unsorted array
        let minimumElementIndex = iterator;

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        // Current element is marked
        store.dispatch(setPivot(minimumElementIndex));

        //finding current minimum element's index
        for (let minElmntIdxIteartor = iterator + 1; minElmntIdxIteartor < arraySize; minElmntIdxIteartor++) {

            // Check if stopped or paused - delay accoring to selected speed - again check
            continueSort = await continueAfterDelayIfNotStopped();
            // Return if stopped
            if (!continueSort)
                return;

            if (localArray[minElmntIdxIteartor] < localArray[minimumElementIndex]) {
                // Set minimum element if current is smaller
                minimumElementIndex = minElmntIdxIteartor;

                // Marking current element as new min element
                store.dispatch(setPivot(minElmntIdxIteartor));
            }
            else {
                // Marking current checked element
                store.dispatch(setCurrentlyChecking([minElmntIdxIteartor]));
            }
        }

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        // Swap the found minimum element with the first element
        store.dispatch(swapValues(minimumElementIndex, iterator));

        // Showing the currently sorted minimum element
        store.dispatch(setPivot(iterator));

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

            // Emptying the currentlyChecking array
        store.dispatch(setCurrentlyChecking([]));

        // Adding current iterator index to sorted array as it now at correct position
        store.dispatch(addToSortedArray(iterator));
    }

    // Adding last element index to sorted array as it now sorted
    store.dispatch(addToSortedArray(arraySize - 1));

    // Emptying the currentlyChecking array
    store.dispatch(setCurrentlyChecking([]));

    // Removing the last set pivot
    store.dispatch(setPivot(null));

    // After sorting sets the Sorting Running Status to COMPLETED
    store.dispatch(sortingCompleted());
}

export default selectionSort;