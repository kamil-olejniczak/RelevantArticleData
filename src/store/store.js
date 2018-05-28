import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import articleReducer from './reducers/article';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagaIndex';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));

const rootReducer = combineReducers({article: articleReducer});

const store = createStore(rootReducer, enhancers);

sagaMiddleware.run(rootSaga);

export default store;