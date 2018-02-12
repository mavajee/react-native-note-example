/* @flow */

import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

import NoteItem from '../components/NoteItem'
import { ActionCreators } from '../actions/index';
import type { Note } from "../utils/typeDefenition";
import type { NoteState } from "../reducers/note";

type Props = {
  notes: NoteState
}

class NotesScreen extends React.PureComponent<Props> {
  editNote = (id: number) => {
    const note = this.props.notes.byIds[id];

    this.props.navigation.navigate('Note', { note, title: 'Edit' });
  };

  addNote = () => {
    this.props.navigation.navigate('Note', { title: 'Add note' });
  };

  renderNote = ({ item: id }) => {
    let { notes } = this.props;

    return <NoteItem note={notes.byIds[id]} onPress={this.editNote}/>
  };

  render() {
    let noteIds = this.props.notes.ids.slice().reverse();

    return <View style={styles.container}>
      <FlatList
        data={noteIds}
        keyExtractor={item => item}
        renderItem={this.renderNote}
      />

      <View style={styles.buttonWrap}>
        <TouchableOpacity style={styles.button} onPress={this.addNote}>
          <EvilIcons name={'pencil'} size={32} style={styles.icon}/>
        </TouchableOpacity>
      </View>
    </View>;
  }

  static navigationOptions = {
    header: null
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonWrap: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    height: 48,
    width: 48,
    backgroundColor: 'red',
    borderRadius: 50,
    elevation: 3,
    margin: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  icon: {
    color: 'white'
  },
});

function mapStateToProps(state) {
  return {
    notes: state.notes
  }
}

function mapDispatchToPros(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToPros)(NotesScreen);
