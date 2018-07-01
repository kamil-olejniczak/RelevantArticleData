import * as actions from '../../actions/article';
import {
    CLEAR_ARTICLE,
    CLOSE_MODAL,
    ERROR_OCCURRED,
    GET_ARTICLE,
    INIT_GET_ARTICLE,
    INIT_RELOAD_ARTICLE,
    INVALID_URL,
    RELOAD_ARTICLE,
    RESOLVING_ARTICLE
} from '../../actions/actionTypes';

describe('Article actions with types tests', () => {

    it('should return action with provided GET_ARTICLE type and additional data', () => {
        expectArticleResponse(GET_ARTICLE);
    });

    it('should return action with provided RELOAD_ARTICLE type and additional data', () => {
        expectArticleResponse(RELOAD_ARTICLE);
    });

    it('should return action with INIT_GET_ARTICLE type, with url', () => {
        expect(actions.getSpecifiedArticle(fakeUrl)).toEqual({
            type: INIT_GET_ARTICLE,
            url: fakeUrl
        });
    });

    it('should return action with RESOLVING_ARTICLE type', () => {
        expect(actions.resolvingArticle()).toEqual({
            type: RESOLVING_ARTICLE,
        });
    });

    it('should return action with CLEAR_ARTICLE type', () => {
        expect(actions.clearArticle()).toEqual({
            type: CLEAR_ARTICLE,
        });
    });

    it('should return action with INIT_RELOAD_ARTICLE type, with url', () => {
        expect(actions.reloadPreviouslyVisitedArticle(fakeUrl)).toEqual({
            type: INIT_RELOAD_ARTICLE,
            url: fakeUrl
        });
    });

    it('should return action with INVALID_URL type', () => {
        expect(actions.invalidUrl()).toEqual({
            type: INVALID_URL,
        });
    });

    it('should return action with CLOSE_MODAL type', () => {
        expect(actions.closeModalWithData()).toEqual({
            type: CLOSE_MODAL,
        });
    });

    it('should return action with ERROR_OCCURRED type', () => {
        expect(actions.errorOccurred()).toEqual({
            type: ERROR_OCCURRED,
        });
    });
});

const expectArticleResponse = type => {
    expect(actions.articleResponse(fakeData, type)).toEqual({
        type: type,
        data: fakeData.data,
        content: fakeData.content,
        recentlyVisited: fakeData.recentlyVisited,
        statistics: fakeData.statistics
    });
};
const fakeUrl = 'someUrl';
const fakeData = {
    data: 'fakeData',
    content: 'fakeContent',
    recentlyVisited: 'fakeRecentlyVisited',
    statistics: 'fakeStatistics'
};