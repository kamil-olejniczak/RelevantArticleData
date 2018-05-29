import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {fakeRecentlyVisited, fakeTagStatistics} from './utils/__fixtures__/fakeData';

Enzyme.configure({adapter: new Adapter()});

//localStorage mock
const initialState = {
    tagStats: JSON.stringify(fakeTagStatistics),
    recentVisit: JSON.stringify(fakeRecentlyVisited.recentlyVisited)
};
export const localStorageMock = (function () {
    let store = {
        ...initialState
    };

    return {
        getItem: function (key) {
            return store[key] || null;
        },
        setItem: function (key, value) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        setUpForTests: function () {
            store = {...initialState};
        }
    };

})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});