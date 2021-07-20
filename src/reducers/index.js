import { combineReducers } from "redux";
import { algorithm } from "./algorithmRedcuer";
import { array } from "./arrayReducer";
import { speed } from "./speedReducer";

const rootReducer = combineReducers({
    array: array,
    algorithm: algorithm,
    speed: speed
});

export default rootReducer;