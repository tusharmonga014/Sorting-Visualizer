import { store } from "../store";
import { setArray } from "../actions/array";
import { SORTING_SPEED_UPPER_LIMIT } from "../defaults";

const storeDispatch = (localArray) => {
    store.dispatch(setArray(localArray));
}

// executes after the loop and dispatches after timeDelays
const timer = (localArray, timeDelayIterator, timeDelay) => {
    setTimeout(() => {
        console.log('yes');
        storeDispatch(localArray);
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
        for (var j = 0; j < arraySize - i; j++) {

            if (localArray[j] > localArray[j + 1]) {

                // swapping jth elem with (j+1)th elem
                let temp = localArray[j + 1];
                localArray[j + 1] = localArray[j];
                localArray[j] = temp;
            }

            // again slicing to make dispatch and make state changes
            const arr = localArray.slice();
            timer(arr, timeDelayIterator, timeDelay);
            timeDelayIterator++;

        }
    }
}

export default bubbleSort;