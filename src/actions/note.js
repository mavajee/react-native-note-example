import RNCalendarEvents from 'react-native-calendar-events';
import PushNotification from 'react-native-push-notification';

import * as types from './types';

function addCalendarEvents(date, title, message) {
  RNCalendarEvents.saveEvent(title, {
    location: 'location',
    notes: title,
    startDate: date,
    endDate: date,
    alarms: [{
      date: 0 // or absolute date - iOS Only
    }]
  }).then(data => console.log(data));
}

function addReminder(date, title, message) {
  		PushNotification.localNotificationSchedule({
 			title: title,
 			message: message, // (required)
 			bigText: message, // (optional) default: "message" prop
 			subText: "This is a subText", // (optional) default: none
 			date: date, // in 60 secs
 			smallIcon: "ic_launcher",
 			// actions: '["Yes", "No"]'
 		});
}

export function addNote(note) {
  return function (dispatch, getState) {
    let state = getState();

    const newId = state.notes.ids.length ? Math.max(...state.notes.ids) + 1 : 1;
    note.id = newId; 

    if (note.reminderDate) {
      addReminder(note.reminderDate, note.title, note.text)
    }

    if (note.calendarEventDate) {
      addCalendarEvents(note.calendarEventDate, note.title, note.text)
    }
    
    
    dispatch({
      id: newId,
      note: Object.assign({}, note, {id: newId}),
      type: types.ADD_NOTE,
    })
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
