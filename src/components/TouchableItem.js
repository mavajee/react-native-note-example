/* @flow */

import * as React from 'react';
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';

import { ANDROID_VERSIONS } from './../utils/constants';
import type { ViewStyleProp } from '../utils/typeDefenition';

type Props = {
  onPress?: () => void,
  delayPressIn?: number,
  borderless?: boolean,
  pressColor?: string,
  pressOpacity?: number,
  children?: React.Node,
  style?: ViewStyleProp,
};

export default class TouchableItem extends React.Component<Props> {
  static defaultProps = {
    borderless: true,
    pressColor: 'rgba(255, 255, 255, .4)',
    onPress: () => {}
  };

  handlePress = () => {
    global.requestAnimationFrame(this.props.onPress);
  };

  render() {
    const { style, pressOpacity, pressColor, borderless, ...rest } = this.props;

    if (Platform.OS === 'android' && Platform.Version >= ANDROID_VERSIONS.LOLLIPOP) {
      return (
        <TouchableNativeFeedback
          {...rest}
          onPress={this.handlePress}
          background={TouchableNativeFeedback.Ripple(pressColor, borderless)}
        >
          <View style={style}>
            {React.Children.only(this.props.children)}
          </View>
        </TouchableNativeFeedback>
      );
    } else {
      return (
        <TouchableOpacity
          {...rest}
          onPress={this.handlePress}
          style={style}
          activeOpacity={pressOpacity}
        >
          {React.Children.only(this.props.children)}
        </TouchableOpacity>
      );
    }
  }
}
