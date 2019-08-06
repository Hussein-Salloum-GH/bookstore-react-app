import React from 'react';
import ReactDOM from 'react-dom';

// import styles
import "semantic-ui-css/semantic.min.css";

// import router
import { BrowserRouter } from "react-router-dom";

// imports redux framework
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import Logger from "redux-logger";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import * as serviceWorker from './serviceWorker';
import App from './App';

import rootReducer from "./rootReducer";

const middleWare = applyMiddleware(Logger, thunk);

const store = createStore(
    rootReducer,
    composeWithDevTools(middleWare)
);


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>

    , document.getElementById('root')
);

serviceWorker.unregister();
