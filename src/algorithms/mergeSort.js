import { setValue } from "../actions/array";
import { setCurrentlyChecking } from "../actions/currentlyChecking";
import { sortingCompleted } from "../actions/sortingRunStatus";
import { store } from "../store";
import checkCurrentSortingRunStatus from "./helpers/checkCurrentStatus";
import { continueAfterDelayIfNotStopped } from "./helpers/continueAfterDelayIfNotStopped";
import sleep from "./helpers/sleep";

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
 * Merges two subarrays of localArray[].
 * First subarray is localArray[l..m]
 * Second subarray is localArray[m+1..r]
 * @param {*} localArray Original Array 
 * @param {*} leftIdx Starting index for first subarray
 * @param {*} midxIdx Ending Index (inclusive) for first subarray
 * @param {*} rightIdx Ending Index (inclusive) for second subarray 
 *                      which start from midIdx + 1
 */
async function merge(localArray, leftIdx, midIdx, rightIdx) {

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
    let i = 0;

    // Initial index of second subarray
    let j = 0;

    // Initial index of merged subarray
    let k = leftIdx;

    // Aborts the sort if value is False
    let continueSort = true;

    while (i < n1 && j < n2) {

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        /**
         * i : leftIdx + 1, j : midIdx + j + 1 because : 
         * they are indices of left and right copy array
         */
        store.dispatch(setCurrentlyChecking([leftIdx + i, midIdx + j + 1]));

        if (leftLocalArray[i] <= rightLocalArray[j]) {

            // Check if stopped or paused - delay accoring to selected speed - again check
            continueSort = await continueAfterDelayIfNotStopped();
            // Return if stopped
            if (!continueSort)
                return;

            store.dispatch(setValue(k, leftLocalArray[i]));

            i++;
        }
        else {

            // Check if stopped or paused - delay accoring to selected speed - again check
            continueSort = await continueAfterDelayIfNotStopped();
            // Return if stopped
            if (!continueSort)
                return;

            store.dispatch(setValue(k, rightLocalArray[j]));

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

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        // Delays according to selected speed
        await sleep();

        /**
         * i : leftIdx + 1 because : 
         * they are indices of left and right copy array
         */
        store.dispatch(setCurrentlyChecking([leftIdx + i]));

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        store.dispatch(setValue(k, leftLocalArray[i]));

        i++;
        k++;
    }

    // Copy the remaining elements of
    // rightLocalArrau[], if there are any
    while (j < n2) {

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        /**
         * j : midIdx + j + 1 because : 
         * they are indices of left and right copy array
         */
        store.dispatch(setCurrentlyChecking([midIdx + j + 1]));

        // Delays according to selected speed
        await sleep();

        store.dispatch(setValue(k, rightLocalArray[j]));

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
async function mergeSortRecursive(localArray, leftIdx, rightIdx) {
    if (leftIdx >= rightIdx) {
        return;//returns recursively
    }
    var midIdx = leftIdx + parseInt((rightIdx - leftIdx) / 2);
    let continueSort = await checkCurrentSortingRunStatus()
        .then(async () => {
            await mergeSortRecursive(localArray, leftIdx, midIdx)
            await mergeSortRecursive(localArray, midIdx + 1, rightIdx);
            await merge(localArray, leftIdx, midIdx, rightIdx);
            return true;
        })
        .catch(() => false);

    // Aborting and returing if Stopped
    if (!continueSort)
        return;
}

/**
 * Perform Merge Sort on the store's Array
 */
async function mergeSort() {

    // Gets current state object
    const state = store.getState();

    // Store's state Array
    const localArray = state.array;
    // length of array
    const arraySize = state.array.length;

    // Performing merge sort on the array
    await mergeSortRecursive(localArray, 0, arraySize - 1);

    /**
     * After sorting sets the Sorting Running Status to COMPLETED
     * it will automatically check and make them sorted colour
     * 
     * Also check if sort was not stopped
     */
    let sortAborted = await checkCurrentSortingRunStatus()
        .then(() => false)
        .catch(() => true);

    // If sort was stopped then empty the currentlyChecking array
    if (sortAborted)
        store.dispatch(setCurrentlyChecking([]));
    // Else sort was not aborted then mark sort as COMPLETED
    else
        store.dispatch(sortingCompleted());
}

export default mergeSort;