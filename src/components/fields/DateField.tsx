import React from 'react';
import {TextInput, ViewStyle, TextStyle, StyleSheet} from 'react-native';

interface DateFieldProps {
  placeholder?: string;
  value?: string;
  onChangeDate?: (date: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const DateField: React.FC<DateFieldProps> = ({
  placeholder = 'YYYY-MM-DD',
  value = '',
  onChangeDate,
  containerStyle,
  inputStyle,
}) => {
  const handleDateChange = (text: string) => {
    if (onChangeDate) {
      onChangeDate(text);
    }
  };

  return (
    <TextInput
      style={[styles.input, containerStyle]}
      placeholder={placeholder}
      value={value}
      keyboardType="numeric"
      maxLength={10}
      onChangeText={handleDateChange}
      placeholderTextColor="#999999"
      underlineColorAndroid="transparent"
      {...(inputStyle ? {style: [styles.textInput, inputStyle]} : null)}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderBottomWidth: 1,
    borderColor: '#CCCCCC',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  textInput: {
    color: '#000000',
    fontSize: 16,
  },
});

export default DateField;
