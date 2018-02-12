/* @flow */

import * as React from 'react';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { View, TouchableWithoutFeedback } from 'react-native';

type Props = {
  date?: Date,
  onSelectDate?: () => Date,
  children: React.Node
};

export default class DateTimeSelectIcon extends React.Component<Props> {
  state = {
    isDateTimePickerVisible: false
  };

  static defaultProps = {
    date: new Date(),
    onSelectDate: () => undefined
  };

  showDatetimePicker = () => {
    this.setState({
      isDateTimePickerVisible: true
    });
  };

  closeDatetimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false
    });
  };

  handleSelectDate = (date) => {
    this.closeDatetimePicker();
    this.props.onSelectDate(date);
  };

  render() {
    return <View>
      <DateTimePicker
        isVisible={this.state.isDateTimePickerVisible}
        onConfirm={this.handleSelectDate}
        onCancel={this.closeDatetimePicker}
        mode={'datetime'}
        date={this.props.date}
      />

      <TouchableWithoutFeedback onPress={this.showDatetimePicker}>
        <View>{this.props.children}</View>
      </TouchableWithoutFeedback>
    </View>
  }
}
