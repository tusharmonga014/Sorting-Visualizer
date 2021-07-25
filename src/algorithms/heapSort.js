import { swapValues } from "../actions/array";
import { setCurrentlyChecking } from "../actions/currentlyChecking";
import { addToSortedArray } from "../actions/sortedArray";
import { sortingCompleted } from "../actions/sortingRunStatus";
import { store } from "../store";
import checkCurrentSortingRunStatus from "./helpers/checkCurrentStatus";
import continueAfterDelayIfNotStopped from "./helpers/continueAfterDelayIfNotStopped";

/**
 * Since a Binary Heap is a Complete Binary Tree, it can be easily represented
 * as an array and the array-based representation is space-efficient.
 * If the parent node is stored at index I, the left child can be
 * calculated by 2 * I + 1 and the right child by 2 * I + 2
 * (assuming the indexing starts at 0).
 */

/**
 * HEAP SORT Algorithm for sorting in increasing order:
 *  1. Build a max heap from the input data.
 *  2. At this point, the largest item is stored at the root of the heap.
 *     Replace it with the last item of the heap followed by reducing the
 *     size of heap by one. Finally, heapify the root of the tree.
 *  3. Repeat step 2 while the size of the heap is greater than 1.
 */

/**
 * Heapifies a subtree rooted with node i which is
 * an index in localArray. arraySize is size of heap
 * @param {Array} localArray An array which represents heap
 * @param {Number} nodeIndex An index which represents root node of the subtree
 * @param {Number} arraySize Size of the heap array
 */
async function heapify(localArray, nodeIndex, arraySize) {
    let largest = nodeIndex; // Initialize largest as root
    const left = 2 * nodeIndex + 1; // left = 2*i + 1
    const right = 2 * nodeIndex + 2; // right = 2*i + 2

    // Aborts the sort if value is False
    let continueSort = true;

    // If left child is larger than root
    if (left < arraySize && localArray[left] > localArray[largest])
        largest = left;

    // If right child is larger than largest so far
    if (right < arraySize && localArray[right] > localArray[largest])
        largest = right;


    // Check if stopped or paused - delay accoring to selected speed - again check
    continueSort = await continueAfterDelayIfNotStopped();
    // Return if stopped
    if (!continueSort)
        return;

    /**
     * left and right are being currently checked and also
     * need to check to make sure currently checking doesn't 
     * show more than current heap size
     */
    store.dispatch(setCurrentlyChecking([largest, nodeIndex]));

    // If largest is not root
    if (largest !== nodeIndex) {

        // Check if stopped or paused - delay accoring to selected speed - again check
        continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        // Swaps the values in store's state Array
        store.dispatch(swapValues(largest, nodeIndex));

        // Recursively heapify the affected sub-tree
        await heapify(localArray, largest, arraySize);
    }
}
/**
 * Helpeer function for implementing heap sort on localArray
 * @param {Array} localArray An array which represents heap
 */
async function HeapSort(localArray) {
    var arraySize = localArray.length;

    // Build heap (rearrange localArray)
    for (let nodeIndex = Math.floor(arraySize / 2) - 1; nodeIndex >= 0; nodeIndex--) {
        let continueSort = await checkCurrentSortingRunStatus()
            .then(async () => {
                await heapify(localArray, nodeIndex, arraySize);
                return true;
            })
            .catch(() => false);
        // Aborting and returing if Stopped
        if (!continueSort)
            return;
    }

    // One by one extract an element from heap
    for (let extractElementIterator = arraySize - 1; extractElementIterator > 0; extractElementIterator--) {

        // Check if stopped or paused - delay accoring to selected speed - again check
        let continueSort = await continueAfterDelayIfNotStopped();
        // Return if stopped
        if (!continueSort)
            return;

        // Move current root to end
        store.dispatch(swapValues(0, extractElementIterator));


        // Emptying the currently checking array to prevent having a single bar as marked each time
        store.dispatch(setCurrentlyChecking([]));

        // Add the last moved bar to sorted Array
        store.dispatch(addToSortedArray(extractElementIterator));

        // Call max heapify on the reduced heap
        continueSort = await checkCurrentSortingRunStatus()
            .then(async () => {
                await heapify(localArray, 0, extractElementIterator);
                return true;
            })
            .catch(() => false);
        // Aborting and returing if Stopped
        if (!continueSort)
            return;
    }
}

/**
 * Performs Heap Sort on the store's Array
 */
async function heapSort() {
    // Gets current state object
    const state = store.getState();

    // Store's state Array
    const localArray = state.array;

    // We perform the Heap Sort on store's state array
    await HeapSort(localArray);

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

export default heapSort;