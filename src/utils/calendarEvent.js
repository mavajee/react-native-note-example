/* @flow */

import RNCalendarEvents from 'react-native-calendar-events';
import { Platform } from 'react-native';

import { APP_NAME } from "./constants";

type Args = {
  id?: string,
  title: string,
  text: string,
  date: Date
};

/**
 * Create new or update exist calendar event.
 * @promise {string} - created event's ID.
 */
export function saveCalendarEvent({
  id = undefined,
  title = APP_NAME,
  text = '',
  date
}: Args): Promise<string> {

  let settings = {
    id,
    startDate: date,
    endDate: date,
    alarms: [{
      date: 0
    }]
  };

  if (Platform.OS === 'android') {
    settings.description = text;
  } else if (Platform.OS === 'IOS') {
    settings.notes = text;
  }

  return RNCalendarEvents.saveEvent(title, settings);
}
