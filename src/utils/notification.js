/* @flow */

import PushNotification from 'react-native-push-notification';

import { APP_NAME } from "./constants";

type Args = {
  date: Date,
  title: string,
  text: string
}

/**
 * Add local notifications by the time for IOS and Android. Work when app in background.
 */
export function addReminder({
  date,
  title = APP_NAME,
  text = ''
}: Args ) {

  return PushNotification.localNotificationSchedule({
    title: title,
    message: text,
    bigText: text,  // for android
    date: date,
    smallIcon: "ic_launcher",
  });
}

export function deleteReminder(id) {
  return PushNotification.cancelLocalNotifications({id});
}
