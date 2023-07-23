import React from 'react';
import {TextInput, ViewStyle, TextStyle, StyleSheet} from 'react-native';

interface NumberFieldProps {
  placeholder?: string;
  value?: number;
  onChangeNumber?: (number: number) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const NumberField: React.FC<NumberFieldProps> = ({
  placeholder = 'Enter a number...',
  value = 0,
  onChangeNumber,
  containerStyle,
  inputStyle,
}) => {
  const handleNumberChange = (text: string) => {
    const numberValue = parseFloat(text);
    if (!isNaN(numberValue) && onChangeNumber) {
      onChangeNumber(numberValue);
    }
  };

  return (
    <TextInput
      style={[styles.input, containerStyle]}
      placeholder={placeholder}
      value={value.toString()}
      keyboardType="numeric"
      onChangeText={handleNumberChange}
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

export default NumberField;
