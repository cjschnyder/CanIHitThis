import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import CanIHitThis from './CanIHitThis';
import './css/index.css';
import store from './store/store';

ReactDOM.render(
    <Provider store={store}>
        <CanIHitThis />
    </Provider>,
    document.getElementById('react-container')
);
