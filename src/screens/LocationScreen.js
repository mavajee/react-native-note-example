/* @flow */

import * as React from 'react';
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { NavigationScreenProp } from 'react-navigation/src/TypeDefinition';

import SearchBar from './../components/SearchBar';
import { resolveByAddress, resolveByCoordinates } from './../utils/geocode';
import type { NoteLocation } from '../utils/typeDefenition';

const UNKNOWN_ERROR_MSG = 'Unknown error.';

const NAVIGATOR_ERROR_CODE = {
  SERVICE_UNAVAILABLE: 1
};

const DEFAULT_REGION = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.0022,
  longitudeDelta: 0.0421,
};

type NavigationState = {
  params: {
    onSetLocation: ({location: NoteLocation}) => void,
  },
};

type Props = {
  navigation: NavigationScreenProp<NavigationState, *>,
};

type State = {
  searchText: string,
	location: NoteLocation,
	isError: boolean,
	errorMsg: string
};

export default class LocationScreen extends React.Component<Props, State> {
	state = {
	  searchText: '',
		location: {
	  	address: undefined,
	  	formattedAddress: undefined,
			coordinates: {
	  		latitude: undefined,
				longitude: undefined
			},
			viewport: {}
		},

    isError: false,
    errorMsg: null
  };

	mapRef: ?React.Ref<typeof MapView>;

  handleChangeSearchText = (text: string) => {
		this.setState({
      searchText: text,
    });
	};

  handelChangeLocation = (location: NoteLocation) => {
  	this.setState({
      location: { ...location, address: this.state.searchText },
      isError: false,
			errorMsg: undefined
		})
	};

	handleAddLocation = () => {
		let { onSetLocation } = this.props.navigation.state.params;

		onSetLocation(this.state.location);

    this.props.navigation.goBack();
	};

  handleGetCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {

        this.setState({
          coordinates: {
            lat: latitude,
            lng: longitude,
            latDelta: 0,
            lngDelta: 0
          }
        });

				this.mapRef.fitToCoordinates([{ latitude, longitude }], {}, false);
			}, error => {
        if (error.code === NAVIGATOR_ERROR_CODE.SERVICE_UNAVAILABLE) {
          Alert.alert(
            'Location services is unavailable.',
            'To get your location, turn on location on your device.',
            [{ text: 'OK' }],
            { cancelable: false }
          )
        }
      }, {
				enableHighAccuracy: false
			}
		);
  };

  handleMapTouch = (e) => {
    let { latitude, longitude } = e.nativeEvent.coordinate;

    resolveByCoordinates({ latitude, longitude })
      .then(locations => {  // TODO: remove duplicate
        if (!locations.length) {
          this.setState({
            isError: true,
            errorMsg: 'Address not found.'
          })
        } else {
          this.handelChangeLocation(locations[0]);
        }
      })
      .catch(error => {
        this.setState({
          isError: true,
          errorMsg: error.message
        })
      })
  };

  setError = () => {
  };

  searchLocation = () => {
    resolveByAddress(this.state.searchText)
      .then(locations => {
        if (!locations.length) {
          this.setState({
            isError: true,
            errorMsg: 'Address not found.'
          })
        } else {
          this.handelChangeLocation(locations[0]);
        }
      })
      .catch(error => {
        this.setState({
          isError: true,
          errorMsg: error.message
        })
      })
  };

  render() {
    const { location } = this.state;

    return (
      <View style={styles.container}>

        <SearchBar
          text={this.state.address}
          placeholder='Enter an address or place.'
          onChangeText={this.handleChangeSearchText}
          onSearch={this.searchLocation}
        />

        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
						ref={ref => { this.mapRef = ref } }
            onPress={this.handleMapTouch}
            region={{
              latitude: location.coordinates.latitude || DEFAULT_REGION.latitude,
              longitude: location.coordinates.longitude || DEFAULT_REGION.longitude,
              latitudeDelta: location.viewport.latitudeDelta || DEFAULT_REGION.latitudeDelta,
              longitudeDelta: location.viewport.longitudeDelta || DEFAULT_REGION.longitudeDelta,
            }}
            maxZoomLevel={18}
          />

          {
            this.state.isError &&

            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{this.state.errorMsg || UNKNOWN_ERROR_MSG}</Text>
            </View>
          }
        </View>

        <View style={[styles.buttonWrap, styles.buttonCentred]}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.handleAddLocation}
          >
            <Text style={styles.buttonText}>ADD LOCATION</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.buttonWrap, styles.buttonPullRight]}>
          <TouchableOpacity
            style={styles.getCurrentLocationButton}
            onPress={this.handleGetCurrentLocation}
          >
            <Ionicons
              name={'ios-locate-outline'}
              size={26}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

      </View>
		);
	};

  static navigationOptions = {
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  errorContainer: {
    position: 'absolute',
    height: 40,
    left: 0,
    right: 0,
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 0, 0, 0.6)',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
  },
  icon: {
    color: '#fff'
  },
	buttonWrap: {
    position: 'absolute',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
	},
	buttonCentred: {
  	left: 0,
  	right: 0
	},
	buttonPullRight: {
  	right: 0
	},
  button: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: 'red',
    borderRadius: 25,
    elevation: 3,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  getCurrentLocationButton: {
    height: 40,
    width: 40,
    backgroundColor: 'red',
    borderRadius: 25,
    elevation: 3,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  // TODO: add disabled btn;
  // disabledBtn: {
  // 	backgroundColor:
  // },
  buttonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  mapContainer: {
    alignSelf: 'stretch',
    flex: 1
  },
  map: {
    flex: 1
  },
});
