import {combineReducers, createStore} from 'redux';
import articleReducer from './reducers/article';

const rootReducer = combineReducers({article: articleReducer});

const store = createStore(rootReducer);

export default store;