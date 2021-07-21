import ControlBar from "./ControlBar.jsx";
import { connect } from "react-redux";
import { ARRAY_MIN_VALUE, ARRAY_MAX_VALUE } from "../../defaults/index.js";
import { bubbleSort, mergeSort, quickSort } from "../../algorithms"
import { setArray } from "../../actions/array";
import { setSpeed } from "../../actions/speed/index.js";
import { setSortedArray } from "../../actions/sortedArray/index.js";
import { setAlgorithm } from "../../actions/algorithm";
import { setCurrentlyChecking } from "../../actions/currentlyChecking/index.js";

//returns a random value between low and up limit [both inclusive]
const getRandomValue = (lowerLimit, upperLimit) => {
    return Math.floor(Math.random() * (upperLimit + 1)) + lowerLimit;
}

//generates a random array of 'arraySize'
const generateRandomArray = (arraySize) => {
    const array = [];
    const lowerLimit = ARRAY_MIN_VALUE;
    const upperLimit = ARRAY_MAX_VALUE;
    for (var i = 0; i < arraySize; i++) {
        array.push(getRandomValue(lowerLimit, upperLimit));
    }
    return array;
}

//converts the algorithm name to all capital seperated by a '_'
const convertAlgorithmNameToSpecific = (selectedAlgo) => {
    switch (selectedAlgo) {
        case 'Bubble Sort': return 'BUBBLE_SORT'
        case 'Merge Sort': return 'MERGE_SORT'
        case 'Quick Sort': return 'QUICK_SORT'
        case 'Sort': return 'SORT'
        default: return ''
    }
}

/**
 * Takes the dispatch method as argument 
 * and dispatches the methods for reseting 
 * sortedArray and currentlyChecking array
 */
const empty_CurrentlyArray_and_SortedArray = (dispatch) => {
    dispatch(setCurrentlyChecking([]));
    dispatch(setSortedArray([]));
}

const mapStateToProps = (state) => {
    const array = state.array;
    const algorithm = state.algorithm;
    return { array, algorithm }
}

const mapDispatchToProps = () => dispatch => ({

    //generating a random array of 'arraySize' and setting it through dispatch
    generateArray: (arraySize) => {
        const randomGeneratedArray = generateRandomArray(arraySize);
        dispatch(setArray(randomGeneratedArray));
        empty_CurrentlyArray_and_SortedArray(dispatch);
    },

    //setting the algorithm through dispatch
    changeAlgorithm: (selectedAlgo) => {
        empty_CurrentlyArray_and_SortedArray(dispatch);
        const specificAlgoName = convertAlgorithmNameToSpecific(selectedAlgo);
        dispatch(setAlgorithm(specificAlgoName));
    },

    //changing the sorting display speed of algorithm
    changeSpeed: (selectSpeed) => {
        empty_CurrentlyArray_and_SortedArray(dispatch);
        dispatch(setSpeed(selectSpeed));
    },

    //starts the sorting
    sort: () => {
        empty_CurrentlyArray_and_SortedArray(dispatch);
        bubbleSort();
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);