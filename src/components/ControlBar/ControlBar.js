import ControlBar from "./ControlBar.jsx";
import { connect } from "react-redux";
import { setArray } from "../../actions/array";
import { setAlgorithm } from "../../actions/algorithm";

//returns a random value between low and up limit [both inclusive]
const getRandomValue = (lowerLimit, upperLimit) => {
    return Math.floor(Math.random() * (upperLimit + 1)) + lowerLimit;
}

//generates a random array of 'arraySize'
const generateRandomArray = (arraySize) => {
    const array = [];
    const lowerLimit = 75;
    const upperLimit = 400;
    for (var i = 0; i < arraySize; i++) {
        array.push(getRandomValue(lowerLimit, upperLimit));
    }
    return array;
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
    },

    //setting the algorithm through dispatch
    setAlgorithm: () => { dispatch(setAlgorithm('BUBBLE')) }
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlBar);