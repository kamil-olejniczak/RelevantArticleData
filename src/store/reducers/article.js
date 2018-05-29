import * as actionTypes from '../actions/actionTypes';

export const initialState = {
    data: {},
    statistics: {},
    recentlyVisited: [],
    content: '',
    error: '',
    isArticleShown: false,
    isModalClosedByUser: false,
    isDataBeingResolved: false
};

const articleReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ARTICLE:
        case actionTypes.RELOAD_ARTICLE: {
            return {
                ...state,
                data: action.data,
                statistics: action.statistics,
                recentlyVisited: action.recentlyVisited,
                content: action.content,
                isArticleShown: true,
                isModalClosedByUser: false,
                isDataBeingResolved: false
            };
        }
        case actionTypes.RESOLVING_ARTICLE: {
            return {
                ...state,
                error: '',
                isArticleShown: false,
                isModalClosedByUser: true,
                isDataBeingResolved: true,
            };
        }
        case actionTypes.INVALID_URL: {
            return {
                ...state,
                error: 'Please provide proper URL, just copy whole content from address bar in your browser.',
                isArticleShown: false
            };
        }
        case actionTypes.CLEAR_ARTICLE: {
            return {
                ...state,
                data: {},
                content: '',
                error: '',
                isArticleShown: false,
                isModalClosedByUser: true
            };
        }
        case actionTypes.CLEAR_DATA: {
            return {
                ...initialState,
            };
        }
        case actionTypes.SAVE_DATA: {
            return state;
        }
        case actionTypes.CLOSE_MODAL: {
            return {
                ...state,
                isModalClosedByUser: true
            };
        }
        case actionTypes.ERROR_OCCURRED: {
            return {
                ...state,
                error: action.error.message,
                isArticleShown: false,
                isModalClosedByUser: true,
                isDataBeingResolved: false,
            };
        }
        default:
            return state;
    }
};

export default articleReducer;