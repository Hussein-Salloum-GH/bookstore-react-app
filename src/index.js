import React from 'react';
import ReactDOM from 'react-dom';

// import styles
import "semantic-ui-css/semantic.min.css";

// import router
import { BrowserRouter } from "react-router-dom";

import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>

    , document.getElementById('root')
);

serviceWorker.unregister();
