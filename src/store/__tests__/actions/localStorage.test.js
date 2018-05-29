import {CLEAR_DATA, INIT_CLEAR_DATA, INIT_SAVE_DATA, SAVE_DATA} from '../../actions/actionTypes';
import * as actions from '../../actions/localStorage';

describe('Local storage actions with types tests', () => {

    it('should return action with INIT_CLEAR_DATA type', () => {
        expect(actions.clearData()).toEqual({
            type: INIT_CLEAR_DATA,
        });
    });

    it('should return action with CLEAR_DATA type', () => {
        expect(actions.localStorageWasCleaned()).toEqual({
            type: CLEAR_DATA,
        });
    });

    it('should return action with INIT_SAVE_DATA type', () => {
        expect(actions.saveData()).toEqual({
            type: INIT_SAVE_DATA,
        });
    });

    it('should return action with SAVE_DATA type', () => {
        expect(actions.localStorageWasUpdated()).toEqual({
            type: SAVE_DATA,
        });
    });
});
