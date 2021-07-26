import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { store } from './store';
import { Provider } from "react-redux";

ReactDOM.render(

  // Wrapping the app around store
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById('root')
);
