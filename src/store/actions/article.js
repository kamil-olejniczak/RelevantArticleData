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

export const invalidUrl = () => ({
    type: actionTypes.INVALID_URL,
});

export const errorOccurred = (error) => ({
    type: actionTypes.ERROR_OCCURRED,
    error
});
