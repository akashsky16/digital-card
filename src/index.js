import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore,  } from "redux"
// import cardListReducer from './store/reducer/cardList.reducer'
import allCardReducer from './store/reducer';
import { Provider } from 'react-redux';
import { sampleData } from './GeneralComponents/data';
import * as Actions from "./store/action/index"

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = createStore(allCardReducer, window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__())
store.dispatch(Actions.setCardList(sampleData))
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
