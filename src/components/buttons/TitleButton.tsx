import React from 'react';
import {TouchableOpacity, Text, ViewStyle, StyleSheet} from 'react-native';

interface TitleButtonProps {
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

export const TitleButton: React.FC<TitleButtonProps> = ({
  title = 'Add New Field',
  onPress,
  style,
}: TitleButtonProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity style={[styles.buttonStyle, style]} onPress={handlePress}>
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
  },
  textStyle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
