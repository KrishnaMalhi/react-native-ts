import React from 'react';
import {View, StyleSheet, ViewStyle, Dimensions} from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({children, style}) => {
  const {width} = Dimensions.get('window');
  const cardWidth = width - 32; // Adjust the card width according to your requirement

  return (
    <View style={[styles.cardContainer, {width: cardWidth}, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
});

export default Card;
