import React from 'react';
import {TextInput, ViewStyle, TextStyle, StyleSheet} from 'react-native';

interface TextFieldProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const TextField: React.FC<TextFieldProps> = ({
  placeholder = 'Enter text...',
  value = 'hello',
  onChangeText,
  containerStyle,
  inputStyle,
}) => {
  const handleTextChange = (text: string) => {
    if (onChangeText) {
      onChangeText(text);
    }
  };

  return (
    <TextInput
      style={[styles.input, containerStyle]}
      placeholder={placeholder}
      value={value}
      onChangeText={handleTextChange}
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

export default TextField;
