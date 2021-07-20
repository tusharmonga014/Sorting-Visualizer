import ArrayBars from "./ArrayBars.jsx";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    const array = state.array;
    const algorithm = state.algorithm;
    return { array, algorithm }
}

const mapDispatchToProps = () => dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ArrayBars);