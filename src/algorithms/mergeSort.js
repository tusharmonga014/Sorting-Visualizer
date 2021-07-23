import { setValue } from "../actions/array";
import { setCurrentlyChecking } from "../actions/currentlyChecking";
import { addToSortedArray } from "../actions/sortedArray";
import { store } from "../store";
import { getTimeDelay, storeDispatch } from "./helpers";

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
 * -- We didn't need a queue in Bubble Sort because it wasn't recursive --
 * 
 * This keeps a track of changes in the array an the indices
 * It stores an object for each change,
 * k : index which needs to be updated
 * value : value with which array[k] will be updated with
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

        const { k, value, firstIdx, secondIdx } = QueueObject;
        const indices = [firstIdx, secondIdx];

        /**
         * Shows the indices of the first and second 
         * which are being compared currently
         */
        storeDispatch(indices, setCurrentlyChecking);

        /**
         * Removing the marking on indices
         */
        setTimeout(() => {
            storeDispatch([], setCurrentlyChecking);
        }, getTimeDelay() * (timeDelayIterator - 1));

        /**
         * Updating value at k index in array
         */
        storeDispatch({ index: k, value: value }, setValue);

    }, getTimeDelay() * timeDelayIterator);
}

/**
 * Merges two subarrays of localArray[].
 * First subarray is localArray[l..m]
 * Second subarray is localArray[m+1..r]
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
            Queue.push({
                k: k,
                value: leftLocalArray[i],
                firstIdx: leftIdx + i,
                secondIdx: midIdx + 1 + j
            });
            i++;
        }
        else {
            localArray[k] = rightLocalArray[j];
            Queue.push({
                k: k,
                value: rightLocalArray[j],
                firstIdx: leftIdx + i,
                secondIdx: midIdx + 1 + j
            });
            j++;
        }

        k++;
    }

    /**
     * Reason for IMPORTANT in below steps : 
     * Pushing the changes for even one 
     * subarray is important as, if not done then 
     * at last if some changes were made to array, 
     * they will not get recorded, but such changes 
     * 'in between' will get updated by next merge changes
     */

    // Copy the remaining elements of
    // leftLocalArray[], if there are any
    while (i < n1) {
        localArray[k] = leftLocalArray[i];
        // IMPORTANT
        Queue.push({
            k: k,
            value: leftLocalArray[i],
            firstIdx: leftIdx + i,
            secondIdx: -1
        });
        i++;
        k++;
    }

    // Copy the remaining elements of
    // rightLocalArrau[], if there are any
    while (j < n2) {
        localArray[k] = rightLocalArray[j];
        // IMPORTANT 
        Queue.push({
            k: k,
            value: rightLocalArray[j],
            firstIdx: -1,
            secondIdx: midIdx + 1 + j
        });
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
function mergeSortRecursive(localArray, leftIdx, rightIdx) {
    if (leftIdx >= rightIdx) {
        return;//returns recursively
    }
    var midIdx = leftIdx + parseInt((rightIdx - leftIdx) / 2);
    mergeSortRecursive(localArray, leftIdx, midIdx);
    mergeSortRecursive(localArray, midIdx + 1, rightIdx);
    merge(localArray, leftIdx, midIdx, rightIdx);
}

/**
 * Perform Merge Sort on the store's Array
 */
function mergeSort() {

    // gets current state object
    const state = store.getState();

    /**
     * Its a copy of store's state Array.
     * Here .slice() is really important as
     * it gives us a deep copy else whatever changes
     * we make in the loop, they will get updated immediately
     */
    const localArray = state.array.slice();

    // So that it clears prevoius memory.. as it is a global variable maintaining memory across files
    Queue = [];

    // We perform the merge sort on a copy of store's state Array
    mergeSortRecursive(localArray, 0, state.array.length - 1);

    // Performing the Queued changes in the array
    for (var i = 0; i < Queue.length; i++) {
        /**
        * setTimeout() function inside a loop stacks up and
        * executes only after the loop and all the iterations 
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
        // THIS EXECUTES AFTER ALL THE OTHER setTimeout ABOVE IN LOOP
        if (i === Queue.length - 1) {
            setTimeout(() => {
                for (let arrayIterator = 0; arrayIterator < localArray.length; arrayIterator++)
                    storeDispatch(arrayIterator, addToSortedArray);
            }, getTimeDelay() * (i + 2));
        }
    }
}

export default mergeSort;