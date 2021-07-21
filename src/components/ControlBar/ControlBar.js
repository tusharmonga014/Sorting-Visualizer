import ControlBar from "./ControlBar.jsx";
import { connect } from "react-redux";
import { ARRAY_MIN_VALUE, ARRAY_MAX_VALUE } from "../../defaults/index.js";
import sort from "../../algorithms"
import { setArray } from "../../actions/array";
import { setSpeed } from "../../actions/speed/index.js";
import { setSortedArray } from "../../actions/sortedArray/index.js";
import { setAlgorithm } from "../../actions/algorithm";
import { setCurrentlyChecking } from "../../actions/currentlyChecking/index.js";

/**
 * Return a random value in specified range
 * @param {*} lowerLimit Least possible random number
 * @param {*} upperLimit Larget possible random number
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
    return { array, algorithm }
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
    },

    /**
     * Changes the algorithm through dispatch
     * @param {*} selectedAlgo New algorithm to be set 
     */
    changeAlgorithm: (selectedAlgo) => {
        empty_CurrentlyArray_and_SortedArray(dispatch);
        dispatch(setAlgorithm(selectedAlgo));
    },

    /**
     * Changes the sorting display speed of algorithm
     * @param {*} selectedSpeed Selected Speed
     */
    changeSpeed: (selectedSpeed) => {
        empty_CurrentlyArray_and_SortedArray(dispatch);
        dispatch(setSpeed(selectedSpeed));
    },

    /**
     * Starts the sorting
     */
    sort: () => {
        empty_CurrentlyArray_and_SortedArray(dispatch);
        sort();
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);