import * as actions from '../actions/article';
import {put} from 'redux-saga/effects';
import {isImproperLink, parseResponseData, refreshRecentlyVisited, refreshTagStatistics} from '../../utils/utils';
import axios from 'axios';
import {GET_ARTICLE, RELOAD_ARTICLE} from '../actions/actionTypes';
import {saveData} from '../actions/localStorage';
import uuid from 'uuid';

export function* getArticleSaga({url}) {
    if (yield* checkForImproperLink(url)) {
        return null;
    }
    yield* checkForSuccessfulResponse(url, GET_ARTICLE);
}

export function* reloadArticleSaga({url}) {
    yield* checkForSuccessfulResponse(url, RELOAD_ARTICLE);
}

function* checkForSuccessfulResponse(url, type) {
    const response = yield* fetchArticle(url);
    if (!response.data) {
        return yield put(actions.errorOccurred(response));
    }
    yield put(actions.articleResponse(response, type));
}

function* fetchArticle(url) {
    yield put(actions.resolvingArticle());
    const authData = {
        headers: {
            'x-api-key': process.env.REACT_APP_API_KEY
        }
    };

    let response;
    try {
        response = yield axios.get(`https://mercury.postlight.com/parser?url=${url}`, authData);
    } catch (error) {
        return error;
    }

    const visitedSite = {
        id: uuid(),
        title: response.data.title,
        url: response.data.url,
        date: new Date()
    };
    const formattedData = {
        data: parseResponseData(response.data),
        content: response.data.content,
        recentlyVisited: refreshRecentlyVisited(visitedSite),
        statistics: refreshTagStatistics(response.data.content)
    };

    yield put(saveData(formattedData));

    return formattedData;
}

function* checkForImproperLink(url) {
    if (!isImproperLink(url)) {
        yield put(actions.invalidUrl());
        return true;
    }
    return false;
}