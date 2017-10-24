import { createAction, handleActions } from 'redux-actions';

const init = {
    persons: [],
    person: {},
};

export const personsChanged = createAction('personsChanged');
export const personDetailsFetched = createAction('personDetailsFetched');

export default handleActions({
    [personsChanged]: (state, { payload }) => ({
        ...state,
        persons: payload,
    }),
    [personDetailsFetched]: (state, { payload }) => ({
        ...state,
        person: {
            ...state.person,
            [payload.id]: payload,
        },
    })
}, init);
