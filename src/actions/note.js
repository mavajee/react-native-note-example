/* @flow */

import * as types from './types';
import { saveCalendarEvent } from './../utils/calendarEvent';
import { addReminder } from './../utils/notification';

export function addNote(note) {
  return function (dispatch, getState) {
    let state = getState();

    note.id = state.notes.ids.length ? Math.max(...state.notes.ids) + 1 : 1;

    if (note.reminderDate) {
      addReminder({
        date: note.reminderDate,
        title: note.title,
        text: note.text
      });
    }

    if (note.calendarEventDate) {
      saveCalendarEvent({
        date: note.calendarEventDate,
        title: note.title,
        text: note.text
      });
    }

    dispatch({
      id: note.id,
      note: Object.assign({}, note),
      type: types.ADD_NOTE,
    });
  }
}

export function editNote(note) {
  return {
    note,
    type: types.EDIT_NOTE,
  }
}

export function deleteNote(id) {
  return {
    id,
    type: types.DELETE_NOTE
  }
}
