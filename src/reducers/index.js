import { combineReducers } from "redux";
import { algorithm } from "./algorithmRedcuer";
import { array } from "./arrayReducer";
import { currentlyChecking } from "./currenltyCheckingReducer";
import { speed } from "./speedReducer";

const rootReducer = combineReducers({
    array,
    algorithm,
    speed,
    currentlyChecking
});

export default rootReducer;