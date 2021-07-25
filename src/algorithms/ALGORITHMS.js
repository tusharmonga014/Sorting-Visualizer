import bubbleSort from "./allAlgorithms/bubbleSort";
import mergeSort from "./allAlgorithms/mergeSort";
import quickSort from "./allAlgorithms/quickSort";
import heapSort from "./allAlgorithms/heapSort";
import insertionSort from "./allAlgorithms/insertionSort";

/**
 * An array of objects where each 
 * object is a sorting algorithm
 */
const ALGORITHMS = [
    {
        id: 0,
        name: 'Merge Sort',
        value: 'MERGE_SORT',
        function: mergeSort
    },
    {
        id: 1,
        name: 'Bubble Sort',
        value: 'BUBBLE_SORT',
        function: bubbleSort
    },
    {
        id: 2,
        name: 'Heap Sort',
        value: 'HEAP_SORT',
        function: heapSort
    },
    {
        id: 3,
        name: 'Insertion Sort',
        value: 'INSERTION_SORT',
        function: insertionSort
    },
    {
        id: 4,
        name: 'Quick Sort',
        value: 'QUICK_SORT',
        function: quickSort
    },
    {
        id: 5,
        name: 'Selection Sort',
        value: 'SELECTION_SORT',
        // function: ()
    }
]

export default ALGORITHMS;