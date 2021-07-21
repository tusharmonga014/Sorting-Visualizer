import { combineReducers } from "redux";
import { algorithm } from "./algorithmRedcuer";
import { array } from "./arrayReducer";
import { currentlyChecking } from "./currenltyCheckingReducer";
import { speed } from "./speedReducer";
import { sortedArray } from "./sortedArrayReducer";

const rootReducer = combineReducers({
    array,
    algorithm,
    speed,
    currentlyChecking,
    sortedArray
});

export default rootReducer;