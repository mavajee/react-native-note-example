/* @flow */

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { StackNavigator, TabNavigator, View } from "react-navigation";

import NoteScreen from "./screens/NoteScreen";
import Location from "./screens/LocationScreen";
import NotesScreen from "./screens/NotesScreen";
import { ActionCreators } from "./actions";

const Stacks = StackNavigator({
  Root: {
    screen: NotesScreen
  },
  Note: {
    screen: NoteScreen,
    // navigationOptions: {
    //   title: 'Edit',
    // },
  },
  LocationScreen: {
    screen: Location
  }
});

function mapDispatchToPros(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

export default connect(
  state => ({ ...state }),
  mapDispatchToPros
)(Stacks);
