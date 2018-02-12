/* @flow */

import React from 'react';
import FitImage from 'react-native-fit-image';
import { View, StyleSheet } from 'react-native';

import type { NoteImage } from '../utils/typeDefenition';

type Props = {
  image: NoteImage,
  imageHeight?: 'small' | 'large' | number
};

export default class ImageContent extends React.Component<Props> {
  static defaultProps = {
    image: {
      imageUri: undefined
    }
  };

  render() {
    let { image: { imageUri }, imageHeight } = this.props;

    if (!imageUri) {
      return null;
    }

    let imageStyle = {};

    if (imageHeight) {
      switch (imageHeight) {
        case 'large':
          imageStyle.height = 400;
          break;
        case 'small':
          imageStyle.height = 200;
          break;
        default:
          imageStyle.height = imageHeight;
      }

      imageStyle.width = '100%';
    }

    return <View>
      <FitImage
        indicator={true}
        indicatorColor='gray'
        indicatorSize='small'
        source={{ uri: imageUri }}
        resizeMode="cover"
        style={[
          styles.image,
          imageStyle
        ]}
      />
    </View>
  }
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignSelf: 'stretch'
  }
});
