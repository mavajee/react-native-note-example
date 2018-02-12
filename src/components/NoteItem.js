/* @flow */

import React, { Component } from "react";
import { View, TouchableWithoutFeedback, StyleSheet } from "react-native";

import ImageContent from './ImageContent';
import { TextContent } from './TextContent';
import type { Note } from "../utils/typeDefenition";

type Props = {
  note: Note,
  onPress: (noteId: number) => void
};

export default class NoteItem extends Component< Props> {

  handlePress = () => {
    this.props.onPress(this.props.note.id);
  };

  render() {
    const { note: { title, text, image } } = this.props;

    return <TouchableWithoutFeedback onPress={this.handlePress}>
      <View style={styles.listItem}>
        <ImageContent
          image={image}
        />

        <TextContent title={title} text={text}/>
      </View>
    </TouchableWithoutFeedback>;
  }
}


const styles = StyleSheet.create({
  listItem: {
    backgroundColor: "white",
    marginBottom: 8,
    elevation: 2,
  }
});
