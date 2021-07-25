import ControlBar from "./ControlBar.jsx";
import { connect } from "react-redux";
import { ARRAY_MIN_VALUE, ARRAY_MAX_VALUE, DEFAULT_SELECTED_ALGORITHM_ID } from "../../defaults/index.js";
import { ALGORITHMS, getAlgorithmById, sort } from "../../algorithms"
import { setArray } from "../../actions/array";
import { setSpeed } from "../../actions/speed/index.js";
import { setSortedArray } from "../../actions/sortedArray/index.js";
import { setAlgorithm } from "../../actions/algorithm";
import { setCurrentlyChecking } from "../../actions/currentlyChecking/index.js";
import { sortingContinued, sortingPaused, sortingRefresh, sortingStopped } from "../../actions/sortingRunStatus/index.js";

/**
 * Return a random value in specified range
 * @param {*} lowerLimit Least possible random number
 * @param {*} upperLimit Maximum possible random number
 * @returns A random number between lowerLimit and UpperLimit (both inclusive)
 */
const getRandomValue = (lowerLimit, upperLimit) => {
    return Math.floor(Math.random() * (upperLimit + 1)) + lowerLimit;
}

/**
 * Returns a random array pf specified Length
 * @param {*} arraySize Length of the array to be formed
 * @returns A random values array of length = arraySize
 */
const generateRandomArray = (arraySize) => {
    const array = [];
    const lowerLimit = ARRAY_MIN_VALUE;
    const upperLimit = ARRAY_MAX_VALUE;
    for (var i = 0; i < arraySize; i++) {
        array.push(getRandomValue(lowerLimit, upperLimit));
    }
    return array;
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
    const sortingRunStatus = state.sortingRunStatus;
    const algorithms = ALGORITHMS;
    const defaultAlgorithm = getAlgorithmById(DEFAULT_SELECTED_ALGORITHM_ID);
    return { array, algorithm, sortingRunStatus, algorithms, defaultAlgorithm };
}

const mapDispatchToProps = () => dispatch => ({

    /**
     * Generats a random array of given size and sets it through dispatch
     * @param {*} arraySize Length of the array to be generated
     */
    generateArray: (arraySize) => {
        const randomGeneratedArray = generateRandomArray(arraySize);
        dispatch(setArray(randomGeneratedArray));
        empty_CurrentlyArray_and_SortedArray(dispatch);
        dispatch(sortingRefresh());
    },

    /**
     * Changes the algorithm through dispatch
     * @param {*} selectedAlgo New algorithm to be set 
     */
    changeAlgorithm: (selectedAlgo) => {
        dispatch(setAlgorithm(selectedAlgo));
        empty_CurrentlyArray_and_SortedArray(dispatch);
        dispatch(sortingRefresh());
    },

    /**
     * Changes the sorting display speed of algorithm
     * @param {*} selectedSpeed Selected Speed
     */
    changeSpeed: (selectedSpeed) => {
        dispatch(setSpeed(selectedSpeed));
        empty_CurrentlyArray_and_SortedArray(dispatch);
        dispatch(sortingRefresh());
    },

    /**
     * Starts the sorting
     */
    startSorting: () => {
        empty_CurrentlyArray_and_SortedArray(dispatch);
        sort();
    },

    /**
     * Pauses the current sorting process
     * by dispatching the sortingPaused
     */
    pauseSorting: () => {
        dispatch(sortingPaused());
    },

    /**
     * Continues the paused sorting process
     * by dispatching sortingContinued
     */
    continueSorting: () => {
        dispatch(sortingContinued());
    },

    /**
     * Stops the current sorting process
     * by dispatching sortingStopped
     */
    stopSorting: () => {
        dispatch(sortingStopped());
        empty_CurrentlyArray_and_SortedArray(dispatch);
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);