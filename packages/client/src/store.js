import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import * as reducers from './reducers';

// const sharedReducers = {};
const reducer = combineReducers({
    ...reducers,
});

const store = (initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducer,
        initialState,
        compose(
            applyMiddleware(
                sagaMiddleware,
            ),
            (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f)
        )
    );

    sagaMiddleware.run(rootSaga);

    window.getState = () => store.getState();

    return store;
};

const initialState = window.initialState || {};

export default store(initialState);
