import * as actions from '../actions/localStorage';
import {put} from 'redux-saga/effects';
import {clearLocalStorage, saveDataToLocalStorage} from '../../utils/utils';

export function* clearLocalStorageSaga() {
    clearLocalStorage();
    yield put(actions.localStorageWasCleaned());
}

export function* saveDataToLocalStorageSaga({formattedData}) {
    saveDataToLocalStorage(formattedData);
    yield put(actions.localStorageWasUpdated());
}
