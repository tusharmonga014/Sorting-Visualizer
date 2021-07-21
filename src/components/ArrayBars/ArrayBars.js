import ArrayBars from "./ArrayBars.jsx";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    const array = state.array;
    const algorithm = state.algorithm;
    const currentlyChecking = state.currentlyChecking;
    return { array, algorithm, currentlyChecking };
}

const mapDispatchToProps = () => dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ArrayBars);