import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/app/App';
import {Provider} from "react-redux"
import store from "./components/store/store"
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store ={store}>
    <App />
    </Provider>
);

