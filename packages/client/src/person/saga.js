import { takeLatest, put, all, call, select } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import * as personsActions from '../reducers/persons';

export const mounted = createAction('person/mounted');

async function ajax(url, params) {
    const response = await fetch(url, params);
    if (response.headers.get('Content-Type') === 'application/json') {
        return response.json();
    }
    return response.text();
}

function* nada(action) {
    const response = yield call(ajax, `http://localhost:8080/persons/${encodeURIComponent(action.payload)}`);

    yield put(personsActions.personDetailsFetched({ id: action.payload, ...response }));
}

export default [
    takeLatest(mounted, nada),
]