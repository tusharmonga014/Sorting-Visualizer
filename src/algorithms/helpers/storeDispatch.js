import { store } from "../../store";

/**
 * @param {*} storeElementPayload The payload for the store element whose state needs to be updated
 * @param {*} storeElementReducer The reducer for that specific change to the element
 */
export function storeDispatch(storeElementPayload, storeElementReducer) {
    store.dispatch(storeElementReducer(storeElementPayload));
}