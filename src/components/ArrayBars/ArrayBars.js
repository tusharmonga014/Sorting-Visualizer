import ArrayBars from "./ArrayBars.jsx";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    const array = state.array;
    const algorithm = state.algorithm;
    const currentlyChecking = state.currentlyChecking;
    const pivot = state.pivot;
    const sortedArray = state.sortedArray;
    const sortingRunStatus = state.sortingRunStatus;
    return { array, algorithm, currentlyChecking, pivot, sortedArray, sortingRunStatus };
}

const mapDispatchToProps = () => dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ArrayBars);