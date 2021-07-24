import { store } from "../store";
import { swapValues } from "../actions/array";
import { setCurrentlyChecking } from "../actions/currentlyChecking";
import { addToSortedArray } from "../actions/sortedArray";
import checkCurrentSortingRunStatus from "./helpers/checkCurrentStatus";
import sleep from "./helpers/sleep";
import { sortingCompleted } from "../actions/sortingRunStatus";

/**
 * Performs Bubble Sort on the store's Array
 */
async function bubbleSort() {

    // Gets current state object
    const state = store.getState();

    // Store's state Array
    const localArray = state.array;
    // length of array
    const arraySize = state.array.length;

    // Aborts the sort if value is False
    let continueSort = true;

    // Bubble sort algorithm 

    // Outer loop
    for (let outerLoopIterator = 0; outerLoopIterator < arraySize - 1; outerLoopIterator++) {
        let innerLoopIterator = 0;

        //Inner loop
        for (innerLoopIterator = 0; innerLoopIterator < arraySize - outerLoopIterator - 1; innerLoopIterator++) {

            // Checking if Paused or Stopped
            continueSort = await checkCurrentSortingRunStatus()
                .then(() => true)
                .catch(() => false);

            // Aborting and returing if Stopped
            if (!continueSort)
                return;

            // Delays according to selected speed
            await sleep();

            // Setting the current indices which are being checked to currentlyChecking
            store.dispatch(setCurrentlyChecking([innerLoopIterator, innerLoopIterator + 1]));

            if (localArray[innerLoopIterator] > localArray[innerLoopIterator + 1]) {

                // Checking if Paused or Stopped
                continueSort = await checkCurrentSortingRunStatus()
                    .then(() => true)
                    .catch(() => false);

                // Aborting and returing if Stopped
                if (!continueSort)
                    return;

                // Delays according to selected speed
                await sleep();

                // Swaps the values in store's state Array
                store.dispatch(swapValues(innerLoopIterator, innerLoopIterator + 1));
            }

            // Checking if Paused or Stopped
            continueSort = await checkCurrentSortingRunStatus()
                .then(() => true)
                .catch(() => false);

            // Aborting and returing if Stopped
            if (!continueSort)
                return;

            // Delays according to selected speed
            await sleep();
        }

        // Adding the 'j' which has been sorted to sortedArray
        store.dispatch(addToSortedArray(innerLoopIterator));
    }

    // Removing the first bar as currentlyChecking
    store.dispatch(setCurrentlyChecking([]));

    // First bar needs to be marked explicitly as 
    // it doesn't go inside inner loop
    store.dispatch(addToSortedArray(0));

    // After sorting sets the Sorting Running Status to COMPLETED
    store.dispatch(sortingCompleted());
}

export default bubbleSort;