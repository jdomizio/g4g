import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import * as personsActions from '../reducers/persons';

export const mounted = createAction('landing/mounted');

async function ajax(url, params) {
    const response = await fetch(url, params);
    if (response.headers.get('Content-Type') === 'application/json') {
            return response.json();
    }
    return response.text();
}

function* nada() {
    const response = yield call(ajax, 'http://localhost:8080/persons');

    yield put(personsActions.personsChanged(response.records));
}

export default [
    takeLatest(mounted, nada),
]