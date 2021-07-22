import { store } from "../store";
import { swapValues } from "../actions/array";
import { setCurrentlyChecking } from "../actions/currentlyChecking";
import { addToSortedArray } from "../actions/sortedArray";
import { getTimeDelay, storeDispatch } from "./helpers";

/**
 * Executes and updates the array with dispatches after timeDelays
 * @param {number} i Main iterator in bubble sort
 * @param {number} j Checking iterator in bubble sort
 * @param {number} arraySize Length of the array
 * @param {boolean} needToSwap Represents whether value at j index was swapped with (j + 1)'s value
 * @param {boolean} addToSorted Shows whether its the last j value which has been sorted
 * @param {number} timeDelayIterator An increasing value which prevents running all setTimeouts at once
 */
function updateArrayAfterTimeDelay(i, j, arraySize, needToSwap, addToSorted, timeDelayIterator) {

    setTimeout(() => {

        const currentIndicesArray = [j, j + 1];

        storeDispatch(currentIndicesArray, setCurrentlyChecking);

        if (needToSwap) {
            storeDispatch(currentIndicesArray, swapValues);
        }

        setTimeout(() => {
            storeDispatch([], setCurrentlyChecking);
        }, getTimeDelay() * (timeDelayIterator - 1));

        if (addToSorted) {
            storeDispatch(j + 1, addToSortedArray);
            /**
             * As the bar at 0th position also needs 
             * to be added to sortedArray, which doesn't 
             * get called from inside j loop
             */
            if (i === arraySize - 2) {
                storeDispatch(0, addToSortedArray);
            }
        }

    }, getTimeDelay() * timeDelayIterator);

};

/**
 * Performs Bubble Sort on the store's Array
 */
function bubbleSort() {

    // gets current state object
    const state = store.getState();

    /**
     * setTimeout() function inside a loop stacks up and
     * executes only after the loopand all the iterations 
     * start together at same time
     * 
     * To prevent simultaneous executions of setTimeouts,
     * we pass an iterator with increasing values.
     */
    let timeDelayIterator = 0;


    /**
     * Its a copy of store's state Array.
     * Here .slice() is really important as
     * it gives us a deep copy else whatever changes
     * we make in the loop, they will get updated immediately
     */
    const localArray = state.array.slice();
    const arraySize = state.array.length;

    // bubble sort algorithm 
    for (var i = 0; i < arraySize - 1; i++) {
        for (var j = 0; j < arraySize - i - 1; j++) {

            let needToSwap = false;
            let addToSorted = false;

            if (localArray[j] > localArray[j + 1]) {
                /**
                 * We make changes to our localArray according to bubbleSort,
                 * then  setTimeout, which was stacked up, follows those 
                 * chnanges of swapping
                 */
                let temp = localArray[j];
                localArray[j] = localArray[j + 1];
                localArray[j + 1] = temp;
                needToSwap = true;
            }

            if (j === arraySize - i - 2) {
                addToSorted = true;
            }

            /** 
             * Timer() uses j's value to update currentlyChecking and if 
             * needToSwap is true then also swaps array using j's value
             * THIS ALL HAPPENS AFTER THESE LOOPS HAVE EXECUTED
             */
            updateArrayAfterTimeDelay(i, j, arraySize, needToSwap, addToSorted, timeDelayIterator);

            timeDelayIterator += 2;

        }
    }
}

export default bubbleSort;