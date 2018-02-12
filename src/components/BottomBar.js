/* @flow */

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TouchableItem from './TouchableItem'
import { ViewStyleProp } from '../utils/typeDefenition'

type BarItemProps = {
  icon: React.Node,
  title?: string,
  onPress?: () => void
};

class BottomBarItem extends React.Component<BarItemProps> {
  render() {
    return <TouchableItem borderless onPress={this.props.onPress} style={styles.iconWrap}>
      <View>
        <View style={styles.icon}>
          {this.props.icon}
        </View>
        {
          this.props.title &&

          <Text>{this.props.title}</Text>
        }
      </View>
    </TouchableItem>
  }
}

type BarProps = {
  children: React.Node,
  barStyle?: ViewStyleProp
};

export default class BottomBar extends React.Component<BarProps> {

  static Item = BottomBarItem;

  render() {
    return <View style={[styles.bar, this.props.barStyle]}>
      {this.props.children}
    </View>
  }
}

const styles = StyleSheet.create({
  bar: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4
  },
  icon: {
    flexGrow: 1,
    justifyContent: 'center'
  }
});
