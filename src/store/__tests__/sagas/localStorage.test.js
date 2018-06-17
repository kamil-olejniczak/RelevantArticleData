import {clearLocalStorageSaga, saveDataToLocalStorageSaga} from '../../sagas/localStorage';
import {CLEAR_DATA, SAVE_DATA} from '../../actions/actionTypes';
import {fakeRecentlyVisited, fakeTagStatistics} from '../../../utils/__fixtures__/fakeData';

describe('Local storage saga tests', () => {
    beforeEach(() => localStorage.setUpForTests());

    it('clearLocalStorageSaga should clean local storage', () => {
        const it = clearLocalStorageSaga();
        it.next();

        expect(localStorage.getItem('tagStats')).toBeNull();
    });

    it('clearLocalStorageSaga should put action with CLEAR_DATA type', () => {
        const it = clearLocalStorageSaga();
        const valueFromPutInGenerator = it.next().value.PUT;

        expect(valueFromPutInGenerator.action).toEqual({type: CLEAR_DATA});
    });

    it('saveDataToLocalStorageSaga should update local storage', () => {
        const it = saveDataToLocalStorageSaga(fakeData);
        it.next();

        expect(localStorage.getItem('recentVisit')).toEqual(JSON.stringify(fakeData.formattedData.recentlyVisited));
        expect(localStorage.getItem('tagStats')).toEqual(JSON.stringify(fakeData.formattedData.statistics));
    });

    it('saveDataToLocalStorageSaga should put action with SAVE_DATA type', () => {
        const it = saveDataToLocalStorageSaga(fakeData);
        const valueFromPutInGenerator = it.next().value.PUT;

        expect(valueFromPutInGenerator.action).toEqual({type: SAVE_DATA});
    });
});

const fakeData = {
    formattedData: {
        ...fakeRecentlyVisited,
        statistics: {
            ...fakeTagStatistics
        }
    }
};