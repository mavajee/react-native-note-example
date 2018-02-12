/* @flow */

import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

type Props = {
  title?: string,
  text?: string
}

type EditProps = {
  onChange: ({ title: string } | { text: string }) => void
}

export class TextContent extends React.Component<Props> {
  render() {
    const { title, text } = this.props;

    return <View style={styles.container}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.text} numberOfLines={5}>
        {text}
      </Text>
    </View>
  }
}

export class EditTextContent extends React.Component<Props & EditProps> {

  render() {
    const { title, text, onChange } = this.props;

    return <View style={styles.container}>
      <TextInput
        onChangeText={(title) => onChange({ title })}
        value={title}
        placeholder={"Title"}
        style={styles.title}
        underlineColorAndroid='transparent'
      />

      <TextInput
        multiline={true}
        onChangeText={text => onChange({ text })}
        value={text}
        placeholder={"Note"}
        style={styles.text}
        underlineColorAndroid='transparent'
      />
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16
  },
  title: {
    marginBottom: 8,
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16
  },
  text: {
    marginBottom: 8,
  }
});
