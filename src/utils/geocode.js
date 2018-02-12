/* @flow */

import queryString from 'query-string';

import { LANG, GMAPS_API_KEY } from './../utils/constants'
import type { NoteLocation } from './typeDefenition'

const API_STATUS = {
	CLEAR: 'ZERO_RESULTS'
};

// /**
//  * Get extended geo info by address or place name.
//  */
// export function getCoordinatesByAddress(
// 	address:string,
// 	language:string = LANG
// ): Promise<Array<?NoteLocation>> {
//
//   return fetchGmaps({
//     address,
//     language
//   })
// }

/**
 * Get extended geo info by coordinates.
 */
export function resolveByCoordinates(
	{ latitude, longitude }: {latitude: number, longitude: number}
): Promise<Array<?NoteLocation>> {

  return fetchGmaps({
    latlang: [latitude, longitude].join(',')
  })
}

/**
 * Get extended geo info by address or place name.
 */
export function resolveByAddress(address: string): Promise<Array<?NoteLocation>> {

  return fetchGmaps({
    address
  })
}

/**
 * Make request to google maps api
 */
function fetchGmaps(params: Object): Array<?NoteLocation> {
  let qs = queryString.stringify({
    key: GMAPS_API_KEY,
    language: LANG,
    ...params
  });

  return fetch(`https://maps.google.com/maps/api/geocode/json?${qs}`)
    .then(data => data.json())
    .then(json => {
      if (json.status === API_STATUS.CLEAR) {
        return Promise.resolve(Array());
      }

      return Promise.resolve(serializeGmapsApiResults(json.results));
    })
    .catch(error => Promise.reject(error))
}

/**
 * Serialize results from google maps api to type NoteLocation
 */
function serializeGmapsApiResults(results: Array): Array<NoteLocation> {
  return results.map(result => ({
    formattedAddress: result.formatted_address,
    coordinates: {
      latitude: result.geometry.location.lat,
      longitude: result.geometry.location.lng,
    },
    viewport: {
      latitudeDelta: (
        result.geometry.viewport.northeast.lat - result.geometry.viewport.southwest.lat
      ),
      longitudeDelta: (
        result.geometry.viewport.northeast.lng - result.geometry.viewport.southwest.lng
      ),
    }
  }));
}
