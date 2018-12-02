import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers/rootReducer';
import {
    init as websocketInit,
    emit
} from './actions/websocket';

export const history = createHistory();

const initialState = {};
const enhancers = [];
const middleware = [
    // thunk,
    routerMiddleware(history),
    thunk.withExtraArgument({ emit })
];

if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension;

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension());
    }
}

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

// Persist state to localstorage for now..
// const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers,
    // persistedState,
);

websocketInit(store)

// store.subscribe(()=>{
//     localStorage.setItem('reduxState', JSON.stringify(store.getState()))
// });

export default store;
