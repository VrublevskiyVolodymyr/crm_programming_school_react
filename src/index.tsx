import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {App} from './App';
import {Provider} from "react-redux";
import {setupStore} from "./redux";
import {unstable_HistoryRouter as BrowserRouter} from 'react-router-dom';

import {history} from './services'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const store = setupStore();


root.render(
    <Provider store={store}>
        {/*// @ts-expect-error*/}
    <BrowserRouter history={history}>
        <App />
    </BrowserRouter>
    </Provider>
);
