/* @flow */

import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  text: string,
  placeholder?: string,
  onChangeText: (text: string) => void,
  onSearch: () => void
};

export default class SearchBar extends React.Component<Props> {

  static defaultProps = {
    placeholder: ''
  };

  handleChangeText = (text: string) => {
    this.props.onChangeText(text);
  };

  handleSearch = () => {
    this.props.onSearch();
  };

  render() {
    return <View style={styles.searchBar}>
      <TouchableOpacity onPress={this.back}>
        <Ionicons
          name={'ios-arrow-round-back-outline'}
          size={32}
          style={[styles.icon, { marginLeft: 24, marginRight: 16 }]}
        />
      </TouchableOpacity>

      <TextInput
        value={this.props.text}
        placeholder={this.props.placeholder}
        onChangeText={this.handleChangeText}
        style={styles.searchField}
        underlineColorAndroid='transparent'
      />

      <TouchableOpacity onPress={this.handleSearch}>
        <Ionicons
          name={'ios-search-outline'}
          size={26}
          style={[styles.icon, { marginLeft: 8, marginRight: 16 }]}
        />
      </TouchableOpacity>
    </View>
  }
}

const styles = StyleSheet.create({
  searchBar: {
    alignSelf: 'stretch',
    margin: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0
  },
  searchField: {
    flex: 1,
    height: 60,
    borderColor: 'gray',
    borderWidth: 0
  },
  icon: {
    color: 'red'
  }
});
