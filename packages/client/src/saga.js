import { all } from 'redux-saga/effects';

import landingSagas from './landing/saga';
import personSagas from './person/saga';

export default function* rootSaga() {
    yield all([
        ...landingSagas,
        ...personSagas,
    ]);
}
