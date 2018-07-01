import articleReducer, {initialState} from '../../reducers/article';
import {
    CLEAR_ARTICLE,
    CLEAR_DATA,
    CLOSE_MODAL,
    ERROR_OCCURRED,
    GET_ARTICLE,
    INVALID_URL,
    RESOLVING_ARTICLE,
    SAVE_DATA
} from "../../actions/actionTypes";

describe('Article reducer tests', () => {
    it('should return initial state, when action type is nor recognized', () => {
        expect(articleReducer(undefined, 'FAKE_ACTION')).toEqual(initialState);
    });

    it('should return updated state, for GET_ARTICLE and RELOAD_ARTICLE action type', () => {
        const fakeAction = makeFakeAction(GET_ARTICLE);

        const stateFromReducer = articleReducer(undefined, fakeAction);

        checkForFieldsEquality(stateFromReducer, {
            data: fakeAction.data,
            statistics: fakeAction.statistics,
            recentlyVisited: fakeAction.recentlyVisited,
            content: fakeAction.content,
            isArticleShown: true,
            isModalClosedByUser: false,
            isDataBeingResolved: false
        });
    });

    it('should return updated state, for RESOLVING_ARTICLE action type', () => {
        const fakeAction = makeFakeAction(RESOLVING_ARTICLE);

        const stateFromReducer = articleReducer(undefined, fakeAction);

        checkForFieldsEquality(stateFromReducer, {
            error: '',
            isArticleShown: false,
            isModalClosedByUser: true,
            isDataBeingResolved: true
        });
    });

    it('should return updated state, for INVALID_URL action type', () => {
        const fakeAction = makeFakeAction(INVALID_URL);

        const stateFromReducer = articleReducer(undefined, fakeAction);

        expect(stateFromReducer.error).toContain('proper URL');
        expect(stateFromReducer.isArticleShown).toBeFalsy();
    });

    it('should return updated state, for CLEAR_ARTICLE action type', () => {
        const fakeAction = makeFakeAction(CLEAR_ARTICLE);

        const stateFromReducer = articleReducer(undefined, fakeAction);

        checkForFieldsEquality(stateFromReducer, {
            data: {},
            content: '',
            error: '',
            isArticleShown: false,
            isModalClosedByUser: true,
        });
    });

    it('should return updated state, for CLEAR_DATA action type', () => {
        const fakeAction = makeFakeAction(CLEAR_DATA);

        const stateFromReducer = articleReducer(undefined, fakeAction);

        expect(stateFromReducer).toEqual(initialState);
    });

    it('should return updated state, for SAVE_DATA action type', () => {
        const fakeAction = makeFakeAction(SAVE_DATA);
        const stateBeforeAction = articleReducer(undefined, 'FAKE_ACTION');
        const stateAfterAction = articleReducer(undefined, fakeAction);

        expect(stateBeforeAction).toEqual(stateAfterAction);
    });

    it('should return updated state, for CLOSE_MODAL action type', () => {
        const fakeAction = makeFakeAction(CLOSE_MODAL);

        const stateFromReducer = articleReducer(undefined, fakeAction);

        expect(stateFromReducer.isModalClosedByUser).toEqual(fakeAction.isModalClosedByUser);
    });

    it('should return updated state, for ERROR_OCCURRED action type', () => {
        const fakeErrorMessage = 'fakeErrorMessage';
        const fakeAction = makeFakeAction(ERROR_OCCURRED);
        fakeAction.error = {message: fakeErrorMessage}

        const stateFromReducer = articleReducer(undefined, fakeAction);

        checkForFieldsEquality(stateFromReducer, {
            error: fakeErrorMessage,
            isArticleShown: false,
            isModalClosedByUser: true,
            isDataBeingResolved: false
        });
    });
});

const makeFakeAction = type => ({
    data: {data: 'fakeData'},
    statistics: {statistics: 'fakeStatistics'},
    recentlyVisited: ['fakeRecentlyVisited'],
    content: 'fakeContent',
    error: 'fakeError',
    isArticleShown: true,
    isModalClosedByUser: true,
    isDataBeingResolved: true,
    type
});

const checkForFieldsEquality = (state, expectedState) => {
    Object.keys(expectedState).forEach(key => expect(state[key]).toEqual(expectedState[key]));
};