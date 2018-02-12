/* @flow */

import * as React from 'react';

import type { StyleObj } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export type ViewStyleProp = StyleObj;
export type TextStyleProp = StyleObj;

export type Note = {
  title?: string,
  text?: string,
  image?: NoteImage,
  location?: NoteLocation,
  reminderDate?: Date,
  calendarEventDate?: Date
}

export type NoteImage = {
  imageUri: string
}

export type NoteLocation = {
  address?: string,
  formattedAddress: string,
  coordinates: {
    latitude: number,
    longitude: number
  },
  viewPort?: {
    latitudeDelta: number,
    longitudeDelta: number
  }
}
