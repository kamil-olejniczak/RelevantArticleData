import store from '../store';
import {fakeRecentlyVisited, fakeTagStatistics} from "../../utils/__fixtures__/fakeData";

describe('store.js tests', () => {
    beforeEach(() => localStorage.setUpForTests());

    it('should get statistics from localStorage', () => {
        expect(store.getState().article.statistics).toEqual(fakeTagStatistics);
    });

    it('should get recentlyVisited from localStorage', () => {
        expect(store.getState().article.recentlyVisited).toEqual(fakeRecentlyVisited.recentlyVisited);
    });
});