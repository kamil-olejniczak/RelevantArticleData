import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    data: {},
    statistics: {},
    recentlyVisited: [],
    content: '',
    error: '',
    isArticleShown: false,
    isModalClosedByUser: false,
    dataIsResolving: false
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ARTICLE: {
            return {
                ...state,
                data: action.data,
                statistics: action.statistics,
                content: action.content,
                recentlyVisited: action.recentlyVisited,
                isArticleShown: true,
                isModalClosedByUser: false,
                dataIsResolving: false
            };
        }
        case actionTypes.RESOLVING_ARTICLE: {
            return {
                ...state,
                error: '',
                isArticleShown: false,
                isModalClosedByUser: true,
                dataIsResolving: true,
            };
        }
        case actionTypes.INVALID_URL: {
            return {
                ...state,
                error: 'Please provide proper URL, just copy whole content from address bar in your browser.',
                isArticleShown: false
            };
        }
        case actionTypes.ERROR_OCCURRED: {
            return {
                ...state,
                error: action.error.message,
                isArticleShown: false,
                isModalClosedByUser: true,
                dataIsResolving: false,
            };
        }
        default:
            return state;
    }
};

export default articleReducer;