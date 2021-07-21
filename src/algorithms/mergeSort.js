import { setArray, setValue } from "../actions/array";
import { setCurrentlyChecking } from "../actions/currentlyChecking";
import { setSortedArray } from "../actions/sortedArray";
import { store } from "../store";
import { getTimeDelay, storeDispatch } from "./helpers";

/**
 * 
 * **********************************************************
 *
 * We perform the merge sort on a copy of store's state Array
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
 * This keeps a track of changes in the array an the indices
 * It stores an object for each change,
 * array : changed array,
 * firstIdx : index for first subarray,
 * secondIdx : index for second subarray
 */
let Queue = [];

/**
 * 
 * @param {*} storeElementPayload The payload for the store element whose state needs to be updated
 * @param {*} storeElementReducer The reducer for that specific change to the element
 */
function updateArrayAfterTimeDelay(QueueObject, timeDelayIterator) {
    setTimeout(() => {

        const { array, firstIdx, secondIdx } = QueueObject;
        const indices = [firstIdx, secondIdx];

        /**
         * Shows the indices of the first and second 
         * which are being compared currently
         */
        storeDispatch(indices, setCurrentlyChecking);

        /**
         * Updating array with changed array
         */
        storeDispatch(array, setArray);

        /**
         * Removing the marking on indices
         */
        setTimeout(() => {
            storeDispatch([], setCurrentlyChecking);
        }, getTimeDelay() * timeDelayIterator);

    }, getTimeDelay() * timeDelayIterator);
}

/**
 * MERGE_SORT (arr[] , l, r)
 * 
 *   If r > l
 *      1. Find the middle point to divide the array into two halves:
 *          middle m = l + (r - l) / 2
 *      2. Call mergeSort for first half:
 *          Call mergeSort(arr, l, m)
 *      3. Call mergeSort for second half:
 *          Call mergeSort(arr, m + 1, r)
 *      4. Merge the two halves sorted in step 2 and 3:
 *          Call merge(arr, l, m, r)
 */

/**
 * Merges two subarrays of array[].
 * First subarray is array[l..m]
 * Second subarray is array[m+1..r]
 * @param {*} localArray Original Array 
 * @param {*} leftIdx Starting index for first subarray
 * @param {*} midxIdx Ending Index (inclusive) for first subarray
 * @param {*} rightIdx Ending Index (inclusive) for second subarray 
 *                      which start from midIdx + 1
 */
function merge(localArray, leftIdx, midIdx, rightIdx) {

    // Sizes of two subarray
    var n1 = midIdx - leftIdx + 1;
    var n2 = rightIdx - midIdx;

    // Creating temp arrays
    var leftLocalArray = new Array(n1);
    var rightLocalArray = new Array(n2);

    // Copy data to temp arrays
    for (let i = 0; i < n1; i++)
        leftLocalArray[i] = localArray[[leftIdx + i]];
    for (let j = 0; j < n2; j++)
        rightLocalArray[j] = localArray[midIdx + 1 + j];

    /**
     *  ..................................................
     *
     *  MERGING THE TEMP ARRAYS BACK INTO localArray[l..r]
     * (Using Merge-K-Sorted-LinkedLists Algorithm)
     * 
     *  ..................................................
     */

    // Initial index of first subarray
    var i = 0;

    // Initial index of second subarray
    var j = 0;

    // Initial index of merged subarray
    var k = leftIdx;

    while (i < n1 && j < n2) {
        if (leftLocalArray[i] <= rightLocalArray[j]) {
            localArray[k] = leftLocalArray[i];
            i++;
        }
        else {
            localArray[k] = rightLocalArray[j];
            j++;
        }
        Queue.push({
            array: localArray.slice(),
            firstIdx: leftIdx + i,
            secondIdx: midIdx + 1 + j
        });

        k++;
    }

    // Copy the remaining elements of
    // leftLocalArray[], if there are any
    while (i < n1) {
        localArray[k] = leftLocalArray[i];
        // Queue.push({
        //     array: localArray.slice(),
        //     firstIdx: leftIdx + i,
        //     secondIdx: -1
        // });
        i++;
        k++;
    }

    // Copy the remaining elements of
    // rightLocalArrau[], if there are any
    while (j < n2) {
        localArray[k] = rightLocalArray[j];
        // Queue.push({
        //     array: localArray.slice(),
        //     firstIdx: -1,
        //     secondIdx: leftIdx + j
        // });
        j++;
        k++;
    }

}

/**
 * Sorts the array from leftIdx to rightIdx using MergeSort Algorithm
 * @param {*} localArray Original Array whose subarray is to be sorted
 * @param {*} leftIdx Starting index of subarray
 * @param {*} rightIdx Ending Index (inclusive) of subarray 
 */
function merge_Sort(localArray, leftIdx, rightIdx) {
    if (leftIdx >= rightIdx) {
        return;//returns recursively
    }
    var midIdx = leftIdx + parseInt((rightIdx - leftIdx) / 2);
    merge_Sort(localArray, leftIdx, midIdx);
    merge_Sort(localArray, midIdx + 1, rightIdx);
    merge(localArray, leftIdx, midIdx, rightIdx);
}

/**
 * Perform Merge Sort on the store's Array
 */
function mergeSort() {

    const state = store.getState();
    const localArray = state.array.slice();

    // So that it clears prevoius memory.. as it is a global variable maintaining memory across files
    Queue = [];

    // We perform the merge sort on a copy of store's state Array
    merge_Sort(localArray, 0, state.array.length - 1);

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
        * we pass and iterator with increasing values.
        */
        //i is passed as timeDealyIterator
        updateArrayAfterTimeDelay(Queue[i], i);

        /**
         * On last iteration, adding another setTimeout()
         * to the list of setTimeouts to fill sortedArray
         */
        // Adding current index to allIndicesArray
        allIndicesArray.push(i);
        // THIS EXECUTES AFTER ALL THE OTHER setTimeout ABOVE IN LOOP
        if (i === Queue.length - 1) {
            setTimeout(() => {
                storeDispatch(allIndicesArray, setSortedArray);
            }, getTimeDelay() * i);
        }
    }
}

export default mergeSort;