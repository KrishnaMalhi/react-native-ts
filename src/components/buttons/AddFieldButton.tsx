import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {AddButton} from './AddButton';

type AddFieldButtonProps = {
  onSelect: (type: string) => void;
};

const AddFieldButton: React.FC<AddFieldButtonProps> = ({onSelect}) => {
  const options = ['Text', 'Number', 'Date', 'Checkbox'];
  const [isOptionsVisible, setOptionsVisible] = useState(false);
  const windowWidth = useWindowDimensions().width;

  const handleSelectOption = (option: string) => {
    setOptionsVisible(false);
    onSelect(option);
  };

  const toggleOptionsVisibility = () => {
    setOptionsVisible(!isOptionsVisible);
  };

  return (
    <View style={styles.container}>
      <View style={styles.addButtonContainer}>
        <AddButton
          title="ADD NEW"
          onPress={toggleOptionsVisibility}
          style={{paddingHorizontal: windowWidth > 400 ? 20 : 16}}
        />
      </View>

      {isOptionsVisible && (
        <View style={styles.optionsContainer}>
          <FlatList
            data={options}
            keyExtractor={item => item}
            renderItem={({item}) => (
              <TouchableOpacity
                key={item}
                style={styles.option}
                onPress={() => handleSelectOption(item)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  optionsContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  option: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  addButtonContainer: {
    marginBottom: 5,
  },
});

export default AddFieldButton;
