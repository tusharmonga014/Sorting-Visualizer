// import { swapValues } from "../actions/array";
// import { setCurrentlyChecking } from "../actions/currentlyChecking";
// import { addToSortedArray } from "../actions/sortedArray";
// import { store } from "../store";
// import { getTimeDelay, storeDispatch } from "./helpers";

// /**
//  * Since a Binary Heap is a Complete Binary Tree, it can be easily represented
//  * as an array and the array-based representation is space-efficient.
//  * If the parent node is stored at index I, the left child can be
//  * calculated by 2 * I + 1 and the right child by 2 * I + 2
//  * (assuming the indexing starts at 0).
//  */

// /**
//  * HEAP SORT Algorithm for sorting in increasing order:
//  *  1. Build a max heap from the input data.
//  *  2. At this point, the largest item is stored at the root of the heap.
//  *     Replace it with the last item of the heap followed by reducing the
//  *     size of heap by one. Finally, heapify the root of the tree.
//  *  3. Repeat step 2 while the size of the heap is greater than 1.
//  */

// /**
//  * 
//  * **********************************************************
//  *
//  * We perform the heap sort on a copy of store's state Array
//  * and keep a track of changes in array (Heap)
//  * 
//  * **********************************************************
//  * 
//  * Then we update our state array step-by-step according 
//  * to our tracked changes
//  * 
//  * **********************************************************
//  * 
//  */

// /**
//  * -- We didn't need a queue in Bubble Sort because it wasn't recursive --
//  * 
//  * This keeps a track of changes in the array an the indices
//  * It stores an object for each change,
//  * firstIdx : left index for heap node in array,
//  * secondIdx : right index for heap node in array,
//  * nodeIndex : heap node root
//  * largest : largest value index
//  */
// let Queue = [];

// /**
//  * It takes an object and a timeDelayIterator as arguments and update the
//  * store's state Array after delayed time
//  * @param {*} QueueObject The Object which contains one specific change
//  * @param {*} timeDelayIterator An increasing value which prevents 
//  * running all setTimeouts at once
//  */
// function updateArrayAfterTimeDelay(QueueObject, timeDelayIterator) {
//     setTimeout(() => {

//         const { firstIdx, secondIdx, nodeIndex, largest } = QueueObject;
//         const indices = [firstIdx, secondIdx];

//         /**
//          * Shows the indices of the first and second 
//          * which are being compared currently
//          */
//         storeDispatch(indices, setCurrentlyChecking);

//         /**
//          * Removing the marking on indices
//          */
//         setTimeout(() => {
//             storeDispatch([], setCurrentlyChecking);
//         }, getTimeDelay() * (timeDelayIterator - 1));

//         if (nodeIndex !== largest) {

//             /**
//              * Updating value at k index in array
//              */
//             storeDispatch([nodeIndex, largest], swapValues);

//             /**
//              * When both left are right are null, its the case of 
//              * moving current root to end and it has been sorted 
//              * so its added to sortedArray, also we need to explicitly 
//              * add first bar to sortedArray as at that point
//              * nodeIndex = largest = 0, so it does'nt enter in here  
//              */
//             if (firstIdx === null && secondIdx === null) {
//                 storeDispatch(largest, addToSortedArray);
//             }
//         }
//         /** we need to explicitly 
//          * add first bar to sortedArray as at that point
//          * nodeIndex = largest = 0, so it does'nt enter 
//          * in above condition
//          */
//         if (largest === 0) {
//             storeDispatch(0, addToSortedArray);
//         }

//     }, getTimeDelay() * timeDelayIterator);
// }

// /**
//  * Heapifies a subtree rooted with node i which is
//  * an index in localArray. arraySize is size of heap
//  * @param {Array} localArray An array which represents heap
//  * @param {Number} nodeIndex An index which represents root node of the subtree
//  * @param {Number} arraySize Size of the heap array
//  */
// function heapify(localArray, nodeIndex, arraySize) {
//     let largest = nodeIndex; // Initialize largest as root
//     const left = 2 * nodeIndex + 1; // left = 2*i + 1
//     const right = 2 * nodeIndex + 2; // right = 2*i + 2

//     // If left child is larger than root
//     if (left < arraySize && localArray[left] > localArray[largest])
//         largest = left;

//     // If right child is larger than largest so far
//     if (right < arraySize && localArray[right] > localArray[largest])
//         largest = right;

//     Queue.push({
//         // Need to check to make sure currently checing also doesn;t show more than current heap size
//         firstIdx: left < arraySize ? left : null,
//         // Need to check to make sure currently checing also doesn;t show more than current heap size
//         secondIdx: right < arraySize ? right : null,
//         nodeIndex: nodeIndex,
//         largest: largest
//     });

//     // If largest is not root
//     if (largest !== nodeIndex) {
//         const swap = localArray[nodeIndex];
//         localArray[nodeIndex] = localArray[largest];
//         localArray[largest] = swap;

//         // Recursively heapify the affected sub-tree
//         heapify(localArray, largest, arraySize);
//     }
// }
// /**
//  * Helpeer function for implementing heap sort on localArray
//  * @param {Array} localArray An array which represents heap
//  */
// function HeapSort(localArray) {
//     var arraySize = localArray.length;

//     // Build heap (rearrange localArray)
//     for (let nodeIndex = Math.floor(arraySize / 2) - 1; nodeIndex >= 0; nodeIndex--)
//         heapify(localArray, nodeIndex, arraySize);

//     // One by one extract an element from heap
//     for (let extractElementIterator = arraySize - 1; extractElementIterator > 0; extractElementIterator--) {
//         // Move current root to end
//         const temp = localArray[0];
//         localArray[0] = localArray[extractElementIterator];
//         localArray[extractElementIterator] = temp;
//         Queue.push({
//             firstIdx: null,
//             secondIdx: null,
//             nodeIndex: 0,
//             largest: extractElementIterator
//         });

//         // call max heapify on the reduced heap
//         heapify(localArray, 0, extractElementIterator);
//     }
// }

// /**
//  * Performs Heap Sort on the store's Array
//  */
// function heapSort() {
//     // gets current state object
//     const state = store.getState();

//     /**
//      * Its a copy of store's state Array.
//      * Here .slice() is really important as
//      * it gives us a deep copy else whatever changes
//      * we make in the loop, they will get updated immediately
//      */
//     const localArray = state.array.slice();

//     // So that it clears prevoius memory.. as it is a global variable maintaining memory across files
//     Queue = [];

//     // We perform the Heap Sort on a copy of store's state Array
//     HeapSort(localArray);

//     // Performing the Queued changes in the array
//     for (var i = 0; i < Queue.length; i++) {
//         /**
//         * setTimeout() function inside a loop stacks up and
//         * executes only after the loop and all the iterations 
//         * start together at same time
//         * 
//         * To prevent simultaneous executions of setTimeouts,
//         * we pass an iterator with increasing values.
//         */
//         //i is passed as timeDealyIterator
//         updateArrayAfterTimeDelay(Queue[i], i + 2);
//     }
// }

// export default heapSort;