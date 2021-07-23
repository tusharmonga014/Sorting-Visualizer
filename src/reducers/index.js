import { combineReducers } from "redux";
import { algorithm } from "./algorithmRedcuer";
import { array } from "./arrayReducer";
import { currentlyChecking } from "./currenltyCheckingReducer";
import { speed } from "./speedReducer";
import { pivot } from "./pivotReducer";
import { sortedArray } from "./sortedArrayReducer";
import { runningStatus } from "./runningStatusReducer";

const rootReducer = combineReducers({
    array,
    algorithm,
    speed,
    currentlyChecking,
    pivot,
    sortedArray,
    runningStatus
});

export default rootReducer;