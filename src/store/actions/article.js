import * as actionTypes from './actionTypes';

export const articleResponse = ({data, content, recentlyVisited, statistics}, type) => ({
    type,
    data,
    content,
    recentlyVisited: recentlyVisited,
    statistics
});

export const getSpecifiedArticle = (url) => ({
    type: actionTypes.INIT_GET_ARTICLE,
    url
});

export const resolvingArticle = () => ({
    type: actionTypes.RESOLVING_ARTICLE
});

export const clearArticle = () => ({
    type: actionTypes.CLEAR_ARTICLE,
});

export const reloadPreviouslyVisitedArticle = (url) => ({
    type: actionTypes.INIT_RELOAD_ARTICLE,
    url
});

export const invalidUrl = () => ({
    type: actionTypes.INVALID_URL,
});

export const closeModalWithData = () => ({
    type: actionTypes.CLOSE_MODAL,
});

export const errorOccurred = (error) => ({
    type: actionTypes.ERROR_OCCURRED,
    error
});
