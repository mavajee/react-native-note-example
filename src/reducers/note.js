/* @flow */

import createReducer from "./createReducer";
import { ADD_NOTE, EDIT_NOTE, DELETE_NOTE } from '../actions/types';
import type { Note } from "../utils/typeDefenition";

export type NoteByIds = {
  +[note_id: number]: Note
} | {};

export type NoteIds = Array<?number>

export type NoteState = {
  +byIds: NoteByIds,
  +ids: NoteIds
}

export type NoteActions =
  | { type: "ADD_NOTE", id: number, note: Note }
  | { type: "EDIT_NOTE", note: Note }
  | { type: "DELETE_NOTE", id: number, note: Note };

export const byIds = createReducer({}, {
  [ADD_NOTE](state: NoteByIds, action:NoteActions) {
    return Object.assign({}, state, { [action.id]: action.note });
  },

  [EDIT_NOTE](state: NoteByIds, action:NoteActions) {
    return Object.assign({}, state, { [action.note.id]: action.note });
  },

  [DELETE_NOTE](state: NoteByIds, action:NoteActions) {
    return Object.keys(state).reduce((result, key) => {
      if (key !== action.id) {
        result[key] = state[key];
      }
      return result;
    }, {})
  },
});

export const ids = createReducer([], {
  [ADD_NOTE](state: NoteIds, action:NoteActions) {
    return [...state, action.note.id];
  },

  [DELETE_NOTE](state: NoteIds, action:NoteActions) {
    return state.filter(id =>
      id !== action.id
    );
  }
});
