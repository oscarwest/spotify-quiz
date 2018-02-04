import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

render((
    <BrowserRouter>
        <App />
    </BrowserRouter>), document.getElementById('root')
);

registerServiceWorker();
