import { store } from "../store";
import { setArray, swapValues } from "../actions/array";
import { setCurrentlyChecking } from "../actions/currentlyChecking";
import { SORTING_SPEED_UPPER_LIMIT } from "../defaults";

/**
 * 
 * @param {*} storeElementPayload The payload for the store element whose state needs to be updated
 * @param {*} elementReducer The reducer for that specific change to the element
 */
const storeDispatch = (storeElementPayload, elementReducer) => {
    store.dispatch(elementReducer(storeElementPayload));
}

// executes after the loop and dispatches after timeDelays
const timer = (needToSwap, j, timeDelayIterator, timeDelay) => {

    setTimeout(() => {

        const currentIndicesArray = [j, j + 1];

        storeDispatch(currentIndicesArray, setCurrentlyChecking);

        if (needToSwap) {
            storeDispatch(currentIndicesArray, swapValues);
        }

        setTimeout(() => {
            storeDispatch([], setCurrentlyChecking);
        }, (timeDelayIterator * timeDelay) + (needToSwap ? 1000 : 0));

    }, timeDelayIterator * timeDelay);

};

const bubbleSort = () => {

    // gets current state object
    const state = store.getState();

    /**
     * --NOTE ABOUT setTimeout FUNCTION--
     * setTimeout function inside a loop stacks up and
     * executes only after the loopand all the iterations 
     * start together at same time
     */
    const speed = state.speed;

    /**
     * It determines the constant timedelay 
     * between each step,
     * so if speed is 10 and speed range is 0-100
     * timedelay will be of 90ms
     */
    const timeDelay = SORTING_SPEED_UPPER_LIMIT - speed;

    /**
     * So, to prevent simultaneous executions of setTimeouts,
     * we pass and iterator with increasing values.
     */
    let timeDelayIterator = 0;

    /**
     * --IMPORTANT--
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

            /** 
             * Timer() uses j's value to update currentlyChecking and if needToSwap 
             * is true then also swaps array using j's value
             * THIS ALL HAPPENS AFTER THESE LOOPS HAVE EXECUTED
             */
            timer(needToSwap, j, timeDelayIterator, timeDelay);

            timeDelayIterator++;

        }
    }
}

export default bubbleSort;