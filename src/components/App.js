import React from "react";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import { createStore } from "redux";
import rootReducer from "../reducers";
import { Provider } from "react-redux";


const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
  return (
    <Provider store={store}>
      <SortingVisualizer />
    </Provider>
  );
}

export default App;
