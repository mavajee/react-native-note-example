/* @flow */

import * as React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import ImagePicker from 'react-native-image-picker';
import { NavigationActions } from 'react-navigation';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BottomBar from './../components/BottomBar';
import DateTimeSelectItem from '../components/DateTimeSelectItem'
import ImageContent from './../components/ImageContent';
import { ActionCreators } from '../actions/index';
import { EditTextContent } from './../components/TextContent';
import { TIME_ZONE } from './../utils/constants'
import type { Note, NoteImage, NoteLocation } from '../utils/typeDefenition'
import type { NavigationScreenProp } from "react-navigation/src/TypeDefinition";

type NavigationState = {
  params: {
    note?: Note,
  },
};

type Props = {
  navigation: NavigationScreenProp<NavigationState, *>,
};

type State = {
  note: ?Note,
  isEdit: boolean
};

class NoteScreen extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    const { params = {} } = this.props.navigation.state;
    const { note = {} } = params;

    this.state = {
      note: { ...note },
      isEdit: !!note.id,
    }
  }

  componentDidMount() {
    this.props.navigation.setParams({
      handleSaveNote: this.handleSaveNote,
    });
  }

  handleSaveNote = () => {
    if (this.state.isEdit) {
      this.props.editNote(this.state.note);
    } else {
      this.props.addNote(this.state.note);
    }

    this.props.navigation.goBack();
  };

  handleNoteDelete = () => {
    this.props.deleteNote(this.state.note.id);

    this.props.navigation.goBack();
  };

  openImagePicker = () => {
    ImagePicker.showImagePicker(
      {
        title: 'Select Picture',
        storageOptions: {
          skipBackup: true,
          path: 'images'
        }
      },
      response => {
        if ('error' in response) {
          // connect sentry
          console.error(response.error);
          return;
        } else if ('didCancel' in response) {
          return;
        }

        this.handleChangeImage({
          imageUri: response.uri
        });
      });
  };

  openLocationScreen = () => {
    this.props.navigation.navigate('LocationScreen', { onSetLocation: this.handleChangeLocation });
  };

  handleChangeForm = (note: $Shape<Note>) => {
    this.setState({
      note: { ...this.state.note, ...note }
    });
  };

  handleChangeLocation = (location: NoteLocation) => {
    this.setState({
      note: { ...this.state.note, location }
    })
  };

  handleChangeImage = (image: NoteImage) => {
    this.setState({
      note: { ...this.state.note, image }
    })
  };

  render() {
    const { note } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1 }}>

            <ImageContent
              image={note.image}
              imageHeight={'small'}
            />

            <EditTextContent
              title={note.title}
              text={note.text}
              onChange={this.handleChangeForm}
            />

            {
              note.location &&

              <View style={styles.serviceItem}>
                <SimpleLineIcons
                  name={'location-pin'}
                  size={12}
                  style={styles.serviceIcon}
                />
                <Text style={styles.serviceText}>
                  {note.location.address || note.location.formattedAddress}
                </Text>
              </View>
            }

            {
              note.reminderDate &&

              <View style={styles.serviceItem}>
                <SimpleLineIcons
                  name={'clock'}
                  size={12}
                  style={styles.serviceIcon}
                />
                <Text style={styles.serviceText}>
                  {note.reminderDate.toLocaleString(TIME_ZONE)}
                </Text>
              </View>
            }

            {
              note.calendarEventDate &&

              <View style={styles.serviceItem}>
                <SimpleLineIcons
                  name={'calendar'}
                  size={12}
                  style={styles.serviceIcon}
                />
                <Text style={styles.serviceText}>
                  {note.calendarEventDate.toLocaleString(TIME_ZONE)}
                </Text>
              </View>
            }

          </ScrollView>
        </View>

        <BottomBar>
          <BottomBar.Item
            icon={<EvilIcons name={'camera'} size={32} style={styles.barIcon}/>}
            onPress={this.openImagePicker}
          />
          <BottomBar.Item
            icon={<EvilIcons name={'location'} size={32} style={styles.barIcon}/>}
            onPress={this.openLocationScreen}
          />
          <BottomBar.Item
            icon={
              <DateTimeSelectItem
                onSelectDate={reminderDate => this.handleChangeForm({ reminderDate })}
              >
                <EvilIcons name={'clock'} size={32} style={styles.barIcon}/>
              </DateTimeSelectItem>
            }
          />
          <BottomBar.Item
            icon={
              <DateTimeSelectItem
                onSelectDate={calendarEventDate => this.handleChangeForm({ calendarEventDate })}
              >
                <EvilIcons name={'calendar'} size={32} style={styles.barIcon}/>
              </DateTimeSelectItem>
            }
          />
          {
            this.state.isEdit &&

            <BottomBar.Item
              icon={<EvilIcons name={'trash'} size={32} style={styles.barIcon}/>}
              onPress={this.handleNoteDelete}
            />
          }
        </BottomBar>
      </View>
    );
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      // title: 'Add note',
      title: params.title,

      headerLeft:
        <TouchableOpacity onPress={() => {
          navigation.dispatch(NavigationActions.back())
        }}>
          <Ionicons
            name={'ios-close-outline'}
            size={32}
            style={{ color: 'red', marginLeft: 16 }}
          />
        </TouchableOpacity>,

      headerRight:
        <TouchableOpacity onPress={params.handleSaveNote}>
          <Ionicons
            name={'ios-checkmark-outline'}
            size={32}
            style={{ color: 'red', marginRight: 16 }}
          />
        </TouchableOpacity>,
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 6,
    margin: 8,
    backgroundColor: '#D4D4D4',
    borderRadius: 4
  },
  serviceText: {
    color: '#333',
    fontSize: 12
  },
  serviceIcon: {
    color: '#333',
    paddingHorizontal: 8
  },
  barIcon: {
    color: 'red'
  }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  state => ({ ...state }),
  mapDispatchToProps
)(NoteScreen);
