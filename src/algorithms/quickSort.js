import { store } from "../store";
import { storeDispatch, getTimeDelay } from "./helpers";
import { setCurrentlyChecking } from "../actions/currentlyChecking";
import { addToSortedArray } from "../actions/sortedArray";

/**
 * 
 * **********************************************************
 *
 * We perform the quick sort on a copy of store's state Array
 * and keep a track of changes in array and the indices which 
 * were compared while merging two subarrays
 * 
 * **********************************************************
 * 
 * Then we update our state array step-by-step according 
 * to our tracked changes
 * 
 * **********************************************************
 * 
 */

/**
 * -- We didn't need a queue in Bubble Sort because it wasn't recursive --
 * 
 * This keeps a track of changes in the array an the indices
 * It stores an object for each change,
 * array : changed array,
 * firstIdx : index for first subarray,
 * secondIdx : index for second subarray
 */
let Queue = [];

/**
 * It takes an object and a timeDelayIterator as arguments and update the
 * store's state Array after delayed time
 * @param {*} QueueObject The Object which contains one specific change
 * @param {*} timeDelayIterator An increasing value which prevents 
 * running all setTimeouts at once
 */
 function updateArrayAfterTimeDelay(QueueObject, timeDelayIterator) {
    setTimeout(() => {

        const { array, firstIdx, secondIdx, pivot } = QueueObject;
        const indices = [firstIdx, secondIdx];

        /**
         * Shows the indices of the first and second 
         * which are being compared currently
         */
        storeDispatch(indices, setCurrentlyChecking);

        /**
         * 
         */
        // storeDispatch()

        /**
         * Updating array with changed array
         */
        // storeDispatch(array, setArray);

        /**
         * Removing the marking on indices
         */
        setTimeout(() => {
            storeDispatch([], setCurrentlyChecking);
        }, getTimeDelay() * (timeDelayIterator - 1));

    }, getTimeDelay() * timeDelayIterator);
}

/**
 * 
 * @param {Array} localArray Copy of the array on which we want to we want to perform Quick Sort
 * @param {number} startIdx Starting index 
 * @param {number} endIdx Ending index 
 * @returns Pivot index
 */
function partition(localArray, startIdx, endIdx) {

    // Taking the last element as the pivot
    /**
     * Value at selected(last element) pivot
     */
    const pivotValue = localArray[endIdx];

    /**
     * Shows uptill where the value is smaller than pivotValue
     */
    let pivotIdx = startIdx;
    for (let idx = startIdx; idx < endIdx; idx++) {
        if (localArray[idx] < pivotValue) {
            // Swapping elements
            [localArray[idx], localArray[pivotIdx]] = [localArray[pivotIdx], localArray[idx]];
            // Moving to next element
            pivotIdx++;
            Queue.add({
                array : localArray,
                firstIdx: idx,
                secondIdx: idx,
                pivot: pivotIdx
            })

        }
    }

    // Putting the pivot value in the middle
    [localArray[pivotIdx], localArray[endIdx]] = [localArray[endIdx], localArray[pivotIdx]]

    return pivotIdx;
};

function quickSortRecursive(arr, start, end) {
    // Base case or terminating case
    if (start >= end) {
        return;
    }

    // Returns pivotIndex
    let index = partition(arr, start, end);

    // Recursively apply the same logic to the left and right subarrays
    quickSortRecursive(arr, start, index - 1);
    quickSortRecursive(arr, index + 1, end);
}

function quickSort() {

    // gets current state object
    const state = store.getState();

    /**
    * Its a copy of store's state Array.
    * Here .slice() is really important as
    * it gives us a deep copy else whatever changes
    * we make in the loop, they will get updated immediately
    */
    let localArray = state.array.slice();

    // So that it clears prevoius memory.. as it is a global variable maintaining memory across files
    Queue = [];

    // We perform the quick sort on a copy of store's state Array
    quickSortRecursive(localArray, 0, localArray.length - 1);

    // Stores all indices of the array which will be used for filling sortedArray
    const allIndicesArray = [];

    // Performing the Queued changes in the array
    for (var i = 0; i < Queue.length; i++) {
        /**
        * setTimeout() function inside a loop stacks up and
        * executes only after the loopand all the iterations 
        * start together at same time
        * 
        * To prevent simultaneous executions of setTimeouts,
        * we pass an iterator with increasing values.
        */
        //i is passed as timeDealyIterator
        updateArrayAfterTimeDelay(Queue[i], i + 2);

        /**
         * On last iteration, adding another setTimeout()
         * to the list of setTimeouts to fill sortedArray
         */
        // Adding current index to allIndicesArray
        allIndicesArray.push(i);
        // THIS EXECUTES AFTER ALL THE OTHER setTimeout ABOVE IN LOOP
        if (i === Queue.length - 1) {
            setTimeout(() => {
                // storeDispatch(allIndicesArray, setSortedArray);
            }, getTimeDelay() * i);
        }
    }
}

export default quickSort;