import {getArticleSaga} from './article';
import * as actionTypes from '../actions/actionTypes';
import {all, takeEvery} from 'redux-saga/effects';

const watchArticle = [
    takeEvery(actionTypes.INIT_GET_ARTICLE, getArticleSaga),
];

export default function* rootSaga() {
    yield all([...watchArticle]);
}