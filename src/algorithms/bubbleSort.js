import { store } from "../store";
import { swapValues } from "../actions/array";
import { setCurrentlyChecking } from "../actions/currentlyChecking";
import { SORTING_SPEED_UPPER_LIMIT } from "../defaults";
import { addToSortedArray } from "../actions/sortedArray";

/**
 * 
 * @param {*} storeElementPayload The payload for the store element whose state needs to be updated
 * @param {*} storeElementReducer The reducer for that specific change to the element
 */
function storeDispatch(storeElementPayload, storeElementReducer) {
    store.dispatch(storeElementReducer(storeElementPayload));
}

/**
 * @returns the timedelay between each step,
 *          so if speed is 10 and speed range is 0-100
 *          timedelay will be of 90ms
 */
function timeDelay() {
    const state = store.getState();
    const speed = state.speed;
    return SORTING_SPEED_UPPER_LIMIT - speed;
}

// executes after the loop and dispatches after timeDelays
function timer(i, j, arraySize, needToSwap, addToSorted, timeDelayIterator) {

    setTimeout(() => {

        const currentIndicesArray = [j, j + 1];

        storeDispatch(currentIndicesArray, setCurrentlyChecking);

        if (needToSwap) {
            storeDispatch(currentIndicesArray, swapValues);
        }

        setTimeout(() => {
            storeDispatch([], setCurrentlyChecking);
        }, timeDelayIterator * timeDelay());

        if (addToSorted) {
            storeDispatch(j + 1, addToSortedArray);
            /**
             * As the bar at 0th position also needs 
             * to be added to sortedArray
             */
            if (i === arraySize - 2) {
                storeDispatch(0, addToSortedArray);
            }
        }

    }, timeDelayIterator * timeDelay());

};

const bubbleSort = () => {

    // gets current state object
    const state = store.getState();

    /**
     * setTimeout() function inside a loop stacks up and
     * executes only after the loopand all the iterations 
     * start together at same time
     * 
     * To prevent simultaneous executions of setTimeouts,
     * we pass and iterator with increasing values.
     */
    let timeDelayIterator = 0;


    /**
     * Here .slice() is really important as
     * only then react will be able to spot a difference 
     * in the originally stored array's state and 
     * newly passed array's state
     * 
     */
    let localArray = state.array.slice();
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
            timer(i, j, arraySize, needToSwap, addToSorted, timeDelayIterator);

            timeDelayIterator += 1;

        }
    }
}

export default bubbleSort;