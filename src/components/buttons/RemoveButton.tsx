import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  useWindowDimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface RemoveButtonProps {
  title?: string;
  onPress?: () => void;
  style?: ViewStyle;
}

const RemoveButton: React.FC<RemoveButtonProps> = ({
  title = '',
  onPress,
  style,
}: RemoveButtonProps) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  const windowWidth = useWindowDimensions().width;

  return (
    <TouchableOpacity
      style={[
        styles.buttonStyle,
        style,
        {paddingHorizontal: windowWidth > 400 ? 20 : 16},
      ]}
      onPress={handlePress}>
      <Icon name="delete" size={25} color="#fff" />
      {title && <Text style={styles.textStyle}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: '#870000',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default RemoveButton;
