import { store } from "../../store";
import { swapValues } from "../../actions/array";
import { setCurrentlyChecking } from "../../actions/currentlyChecking";
import { addToSortedArray } from "../../actions/sortedArray";
import { sortingCompleted } from "../../actions/sortingRunStatus";
import continueAfterDelayIfNotStopped from "../helpers/continueAfterDelayIfNotStopped";

/**
 * INSERTION SORT : 
 * 
 * Insertion sort is a simple sorting algorithm that works similar to the way 
 * you sort playing cards in your hands. The array is virtually split into a 
 * sorted and an unsorted part. Values from the unsorted part are picked and 
 * placed at the correct position in the sorted part.
 * 
 */

/**
 * Performs insertion sort on the store's state array
 */
async function insertionSort() {

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

    // Insetion Sort Algorithm

    for (let iterator = 0; iterator < arraySize; iterator++) {
        /**
         * Backward moving iterator for current element
         */
        let backwardIterator = iterator;

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        // Current element is marked
        store.dispatch(setCurrentlyChecking([backwardIterator]));

        /**
         * Adding the current element's index to sortedArray as
         * all array including this position is sorted
         */
        store.dispatch(addToSortedArray(iterator));

        /**
         * Keep swpping the current element with previous 
         * elements untill it reaches the correct position
         * i.e. previous element is smaller or equal to it
         */
        while (backwardIterator > 0 && localArray[backwardIterator - 1] > localArray[backwardIterator]) {

            // Check if stopped or paused - delay accoring to selected speed - again check
            continueSort = await continueAfterDelayIfNotStopped();
            // Return if stopped
            if (!continueSort)
                return;

            /**
             * Swapping the currentElement with 
             * previous element as it is bigger
             */
            store.dispatch(swapValues(backwardIterator - 1, backwardIterator));

            // Current element is marked as it has now moved to one previous postition
            store.dispatch(setCurrentlyChecking([backwardIterator - 1]));

            backwardIterator--;
        }
    }

    // After sorting sets the Sorting Running Status to COMPLETED
    store.dispatch(sortingCompleted());
}

export default insertionSort;
