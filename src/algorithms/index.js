import bubbleSort from "./bubbleSort";
import mergeSort from "./mergeSort";
import quickSort from "./quickSort";
import heapSort from "./heapSort";
import { store } from "../store";
import { storeDispatch } from "./helpers";
import { setRunningStatus } from "../actions/runningStatus";

export default function sort() {

    const state = store.getState();

    const algorithm = state.algorithm;

    switch (algorithm) {

        case 'BUBBLE_SORT': {
            storeDispatch(true, setRunningStatus);
            bubbleSort();
            break;
        }
        case 'MERGE_SORT': {
            storeDispatch(true, setRunningStatus);
            mergeSort();
            break;
        }
        case 'QUICK_SORT': {
            storeDispatch(true, setRunningStatus);
            quickSort();
            break;
        }
        case 'HEAP_SORT': {
            storeDispatch(true, setRunningStatus);
            heapSort();
            break;
        }
        default: {
            console.error("No sorting algorithm selected, can't sort");
            return;
        }
    }

}