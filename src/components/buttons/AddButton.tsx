import React from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';

interface AddButtonProps {
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const AddButton: React.FC<AddButtonProps> = ({
  title = 'Add New Field',
  onPress,
  style,
}: AddButtonProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const windowWidth = useWindowDimensions().width;

  return (
    <TouchableOpacity
      style={[styles.buttonStyle(windowWidth), style]}
      onPress={handlePress}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: (windowWidth: number) => ({
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: windowWidth > 400 ? 20 : 16,
    alignItems: 'center',
  }),
  textStyle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
