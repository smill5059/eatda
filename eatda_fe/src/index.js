import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
 
import { createStore } from "redux";
import rootReducer from "./store/modules";

const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(rootReducer, devTools);

console.info("현재 state는", store.getState())

const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
