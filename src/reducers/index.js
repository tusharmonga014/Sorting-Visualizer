import { combineReducers } from "redux";
import { algorithm } from "./algorithmRedcuer";
import { array } from "./arrayReducer";

const rootReducer = combineReducers({
    array: array,
    algorithm: algorithm
});

export default rootReducer;