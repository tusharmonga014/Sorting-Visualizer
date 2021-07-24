import bubbleSort from "./bubbleSort";
import mergeSort from "./mergeSort";
import quickSort from "./quickSort";
import heapSort from "./heapSort";
import { store } from "../store";
import { sortingStarted } from "../actions/sortingRunStatus";

export default function sort() {

    const state = store.getState();

    const algorithm = state.algorithm;

    switch (algorithm) {

        case 'BUBBLE_SORT': {
            store.dispatch(sortingStarted());
            bubbleSort();
            break;
        }
        case 'MERGE_SORT': {
            store.dispatch(sortingStarted());
            mergeSort();
            break;
        }
        case 'QUICK_SORT': {
            store.dispatch(sortingStarted());
            quickSort();
            break;
        }
        case 'HEAP_SORT': {
            store.dispatch(sortingStarted());
            heapSort();
            break;
        }
        default: {
            console.error("No sorting algorithm selected, can't sort");
            return;
        }
    }

}