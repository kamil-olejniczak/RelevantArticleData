import * as actionTypes from './actionTypes';

export const clearData = () => ({
    type: actionTypes.INIT_CLEAR_DATA,
});

export const localStorageWasCleaned = () => ({
    type: actionTypes.CLEAR_DATA,
});

export const saveData = formattedData => ({
    type: actionTypes.INIT_SAVE_DATA,
    formattedData
});

export const localStorageWasUpdated = () => ({
    type: actionTypes.SAVE_DATA,
});