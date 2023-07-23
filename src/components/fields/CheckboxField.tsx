import React, {useState} from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleSheet,
  View,
  Text,
} from 'react-native';

interface CheckboxFieldProps {
  checked?: boolean;
  onChange?: (isChecked: boolean) => void;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  checkedButtonStyle?: ViewStyle;
  textStyle?: TextStyle;
  checkedTextStyle?: TextStyle;
  uncheckedText?: string;
  checkedText?: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  checked = false,
  onChange,
  containerStyle,
  buttonStyle,
  checkedButtonStyle,
  textStyle,
  checkedTextStyle,
  uncheckedText = 'Off',
  checkedText = 'On',
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleToggle = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  const getButtonStyle = () => {
    if (isChecked) {
      return [styles.button, styles.checkedButton, checkedButtonStyle];
    }
    return [styles.button, buttonStyle];
  };

  const getTextStyle = () => {
    if (isChecked) {
      return [styles.text, styles.checkedText, checkedTextStyle];
    }
    return [styles.text, textStyle];
  };

  return (
    <TouchableOpacity
      style={[styles.container, containerStyle]}
      onPress={handleToggle}>
      <View style={getButtonStyle()}>
        <View style={isChecked ? styles.toggle : null} />
      </View>
      <Text style={getTextStyle()}>
        {isChecked ? checkedText : uncheckedText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    width: 40,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedButton: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  toggle: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
  },
  checkedText: {
    color: '#007bff',
  },
});

export default CheckboxField;
