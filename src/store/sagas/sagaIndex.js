import {getArticleSaga, reloadArticleSaga} from './article';
import {clearLocalStorageSaga, saveDataToLocalStorageSaga} from './localStorage';
import * as actionTypes from '../actions/actionTypes';
import {all, takeEvery} from 'redux-saga/effects';

const watchArticle = [
    takeEvery(actionTypes.INIT_GET_ARTICLE, getArticleSaga),
    takeEvery(actionTypes.INIT_RELOAD_ARTICLE, reloadArticleSaga)
];

const watchLocalStorage = [
    takeEvery(actionTypes.INIT_CLEAR_DATA, clearLocalStorageSaga),
    takeEvery(actionTypes.INIT_SAVE_DATA, saveDataToLocalStorageSaga),
];

export default function* rootSaga() {
    yield all([
        ...watchArticle,
        ...watchLocalStorage
    ]);
}