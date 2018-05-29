import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import articleReducer, {initialState} from './reducers/article';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/sagaIndex';
import {parseDateForRecentlyVisitedFromLocalStorage} from '../utils/utils';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeEnhancers(applyMiddleware(sagaMiddleware));

const rootReducer = combineReducers({article: articleReducer});

const getInitialState = () => {
    if (localStorage.getItem('tagStats') || localStorage.getItem('recentVisit')) {
        return {
            ...initialState,
            statistics: JSON.parse(localStorage.getItem('tagStats')),
            recentlyVisited: parseDateForRecentlyVisitedFromLocalStorage(JSON.parse(localStorage.getItem('recentVisit')))
        };
    }

    return initialState;
};

const reducersInitialState = {article: getInitialState()};

const store = createStore(rootReducer, reducersInitialState, enhancers);

sagaMiddleware.run(rootSaga);

export default store;