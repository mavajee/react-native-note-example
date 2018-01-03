import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from '../actions/types';
import createReducer from "./createReducer";

// export type counterStateType = {
//   +counter: number
// };

// type actionType = {
//   +type: string
// };

export const byIds = createReducer({}, {
    [ADD_NOTE](state, action) {
        return Object.assign({}, state, {[action.id]: action.note});
    },

    [EDIT_NOTE](state, action) {
        return Object.assign({}, state, {[action.note.id]: action.note});
    },

    [DELETE_NOTE](state, action) {
        // state = Object.assign({}, state);
        // delete state[action.id];
        return Object.keys(state).reduce((result, key) => {
            if (key !== action.id) {
                result[key] = state[key];
            }
            return result;
        }, {})
    },
});

export const ids = createReducer([], {
    [ADD_NOTE](state, action) {
        return [...state, action.note.id];
    },

    [DELETE_NOTE](state, action) {
        return state.filter(id =>
            id !== action.id
        );
    }
});

