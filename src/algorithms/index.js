import bubbleSort from "./bubbleSort";
import mergeSort from "./mergeSort";
import quickSort from "./quickSort";
import { store } from "../store";

export default function sort() {

    const state = store.getState();

    const algorithm = state.algorithm;

    switch (algorithm) {
        
        case 'BUBBLE_SORT': {
            bubbleSort();
            break;
        }
        case 'MERGE_SORT': {
            mergeSort();
            break;
        }
        case 'QUICK_SORT': {
            quickSort();
            break;
        }
        default: {
            console.error("No sorting algorithm selected, can't sort");
            return;
        }
    }

}