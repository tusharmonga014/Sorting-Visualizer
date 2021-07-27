import { store } from "../../store";
import { setCurrentlyChecking } from "../../actions/currentlyChecking";
import { setSortedArray } from "../../actions/sortedArray";
import { sortingCompleted } from "../../actions/sortingRunStatus";
import { setArray } from "../../actions/array";
import checkCurrentSortingRunStatus from "../helpers/checkCurrentStatus";
import continueAfterDelayIfNotStopped from "../helpers/continueAfterDelayIfNotStopped";

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
 * Dispatches new array with merged values of given data 
 * in order of : remaining array on left, merging value, 
 * left array, right array, remaining array on left.
 * @param {number} mainArrayIterator The mainIterator or K
 * @param {number} rightIdx End limit of current array(inclusive)
 * @param {*} valueToBeMerged The value which needs to be inserted
 * @param {Array} leftLocalArray Current remaining left array of current array
 * @param {Array} rightLocalArray Current remaining right array of current array
 */
function mergeInArrayAndDispatch(mainArrayIterator, rightIdx, valueToBeMerged, leftLocalArray, rightLocalArray) {

    /** 
     * Gets current state object
     */
    const state = store.getState();

    /** 
     * Store's state Array
     */
    const localArray = state.array;

    /**
     * Array on the left side of current 
     * array-(which remains to be merge)
     */
    const remainingArrayOnLeft = localArray.slice(0, mainArrayIterator);

    /**
     * Array on the right side of current 
     * array-(which remains to be merge)
     */
    const remainingArrayOnRight = localArray.slice(rightIdx + 1);

    /**
     * New merged array which will be returned
     */
    let mergedArray = [];

    // Merging the values in new array
    mergedArray = mergedArray.concat(remainingArrayOnLeft).concat(valueToBeMerged).concat(leftLocalArray).concat(rightLocalArray).concat(remainingArrayOnRight);

    // Setting it as the new state array in store
    store.dispatch(setArray(mergedArray));
}

/**
 * Merges two subarrays of localArray[].
 * First subarray is localArray[l..m]
 * Second subarray is localArray[m+1..r]
 * @param {number} leftIdx Starting index for first subarray
 * @param {number} midxIdx Ending Index (inclusive) for first subarray
 * @param {number} rightIdx Ending Index (inclusive) for second subarray which start from midIdx + 1
 */
async function merge(leftIdx, midIdx, rightIdx) {

    /** 
     * Gets current state object
     */
    const state = store.getState();

    /** 
     * Store's state Array
     */
    const localArray = state.array;

    /**
     * Aborts the sort if value is false
     */
    let continueSort = true;

    /**
     * Left subarray array of current array
     */
    var leftLocalArray = localArray.slice(leftIdx, midIdx + 1);
    /**
     * Right subarray array of current array
     */
    var rightLocalArray = localArray.slice(midIdx + 1, rightIdx + 1);

    /**
     *  ..................................................
     *
     *  MERGING THE TEMP ARRAYS BACK INTO localArray[l..r]
     *  (Using Merge-K-Sorted-LinkedLists Algorithm)
     * 
     *  ..................................................
     */

    /**
     * Iterator for left subarray
     */
    let leftArrayIterator = leftIdx;
    /**
     * Iterator for right subarray
     */
    let rightArrayIterator = midIdx + 1;

    /**
     * Iterator or K, for state's array
     */
    let mainArrayIterator = leftIdx;


    while (leftLocalArray.length > 0 && rightLocalArray.length > 0) {

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        /**
         * leftArrayIterator : mainArrayIterator + 1
         * rightArrayIterator :  mainArrayIterator + leftLocalArray.length + 1
         * they are indices of left and right copy array
         */
        store.dispatch(setCurrentlyChecking([leftArrayIterator, rightArrayIterator]));

        if (leftLocalArray[0] <= rightLocalArray[0]) {
            // Taking first value of left array of current array
            const leftArrayValueToBeMerged = leftLocalArray[0];

            // Removing first value of left array of current array
            leftLocalArray.shift();

            // Check if stopped or paused - delay accoring to selected speed - again check
            continueSort = await continueAfterDelayIfNotStopped();
            // Return if stopped
            if (!continueSort)
                return;

            mergeInArrayAndDispatch(mainArrayIterator, rightIdx, leftArrayValueToBeMerged, leftLocalArray, rightLocalArray);

        } else {
            // Taking first value of right array of current array
            const rightArrayValueToBeMerged = rightLocalArray[0];

            // Removing first value of left array of current array
            rightLocalArray.shift();

            // Check if stopped or paused - delay accoring to selected speed - again check
            continueSort = await continueAfterDelayIfNotStopped();
            // Return if stopped
            if (!continueSort)
                return;

            mergeInArrayAndDispatch(mainArrayIterator, rightIdx, rightArrayValueToBeMerged, leftLocalArray, rightLocalArray);
        }

        
        leftArrayIterator = mainArrayIterator + 1;
        rightArrayIterator = mainArrayIterator + leftLocalArray.length + 1;
        store.dispatch(setCurrentlyChecking([leftArrayIterator, rightArrayIterator]));
        mainArrayIterator++;
    }

    while (leftLocalArray.length > 0) {

        // Marking leftArrayIterator
        store.dispatch(setCurrentlyChecking([leftArrayIterator]));

        // Taking first value of left array of current array
        const leftArrayValueToBeMerged = leftLocalArray[0];

        // Removing first value of left array of current array
        leftLocalArray.shift();

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        mergeInArrayAndDispatch(mainArrayIterator, rightIdx, leftArrayValueToBeMerged, leftLocalArray, rightLocalArray);

        leftArrayIterator = mainArrayIterator + 1;
        mainArrayIterator++;
    }

    while (rightLocalArray.length > 0) {

        // Marking leftArrayIterator
        store.dispatch(setCurrentlyChecking([rightArrayIterator]));

        // Taking first value of right array of current array
        const rightArrayValueToBeMerged = rightLocalArray[0];

        // Removing first value of left array of current array
        rightLocalArray.shift();

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        mergeInArrayAndDispatch(mainArrayIterator, rightIdx, rightArrayValueToBeMerged, leftLocalArray, rightLocalArray);

        rightArrayIterator = mainArrayIterator + leftLocalArray.length + 1;
        mainArrayIterator++;
    }

    // Emptying the currentlyChecking array
    store.dispatch(setCurrentlyChecking([]));
}

/**
 * Sorts the array from leftIdx to rightIdx using MergeSort Algorithm
 * @param {*} localArray Original Array whose subarray is to be sorted
 * @param {*} leftIdx Starting index of subarray
 * @param {*} rightIdx Ending Index (inclusive) of subarray 
 */
async function mergeSortRecursive(leftIdx, rightIdx) {
    if (leftIdx >= rightIdx) {
        return;//returns recursively
    }

    /**
     * Middle index
     */
    const midIdx = leftIdx + parseInt((rightIdx - leftIdx) / 2);

    /**
     * Aborts the sort if value is false
     */
    let continueSort = await checkCurrentSortingRunStatus()
        .then(async () => {
            await mergeSortRecursive(leftIdx, midIdx)
            await mergeSortRecursive(midIdx + 1, rightIdx);
            await merge(leftIdx, midIdx, rightIdx);
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
    const arraySize = localArray.length;

    // Performing merge sort on the array
    await mergeSortRecursive(0, arraySize - 1);

    /**
     * After sorting sets the Sorting Running Status to COMPLETED
     * it will automatically check and make them sorted colour
     * 
     * Also check if sort was not stopped
     */
    let sortAborted = await checkCurrentSortingRunStatus()
        .then(() => false)
        .catch(() => true);

    // If sort was stopped then empty the currentlyChecking and sortedArray
    if (sortAborted) {
        store.dispatch(setSortedArray([]));
        store.dispatch(setCurrentlyChecking([]));
    }
    // Else sort was not aborted then mark sort as COMPLETED
    else
        store.dispatch(sortingCompleted());
}

export default mergeSort;