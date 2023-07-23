import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Card from '../../components/card/Card';
import {AddButton} from '../../components/buttons/AddButton';
import RemoveButton from '../../components/buttons/RemoveButton';
import AddFieldButton from '../../components/buttons/AddFieldButton';
import {
  addCategory,
  addProperty,
  removeCategory,
  removeProperty,
  updateCategory,
  updateProperty,
} from '../../store/reducers/data.reducer';
import {RootState} from '../../store/reducers';
import {ICategory, ICategoryProperty} from '../../types';

type Field = {
  type: string;
  name: string;
};

const ManageCategories: React.FC = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.app.categories);
  const [cards, setCards] = useState<Field[][]>([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [catName, setCatName] = useState('Category Name');
  const fieldOptions = ['Text', 'Number', 'Date', 'Checkbox'];

  const handleAddCard = () => {
    const newCategory: ICategory = {
      name: '',
      properties: [],
      // items: [],
    };
    dispatch(addCategory(newCategory));
  };

  const toggleDropdownVisibility = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleRemoveCard = (index: number, categoryName: string) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1);
    setCards(updatedCards);
    dispatch(removeCategory(categoryName)); // Dispatch the "removeCategory" action with the category ID to remove it from the store
  };

  const handleAddField = (
    type: string,
    cardIndex: number,
    categoryName: string,
  ) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex]?.push({type, name: ''});
    setCards(updatedCards);
    const newProperty: ICategoryProperty = {
      field: '',
      name: '',
      value: '',
      placeholder: '',
    };
    dispatch(addProperty({categoryName, property: newProperty})); // Dispatch the "addProperty" action with the new property object and the categoryName to associate it with the category
  };

  const handleRemoveField = (
    cardIndex: number,
    fieldIndex: number,
    categoryName: string,
    propertyName: string,
  ) => {
    const updatedCards = [...cards];
    updatedCards[cardIndex]?.splice(fieldIndex, 1);
    setCards(updatedCards);
    dispatch(removeProperty({categoryName, propertyName})); // Dispatch the "removeProperty" action with the categoryName and propertyName to remove the property from the store
  };

  const updateField = (index: number, value: string) => {
    const newProperty: ICategoryProperty = {
      field: '',
      name: '',
      value: '',
      placeholder: '',
    };
    setCatName(index, value);
    dispatch(updateCategory({name: value}));
  };

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <Card key={category.name} style={styles.card}>
          <Text style={styles.label}>{catName}</Text>
          <TextInput
            style={styles.input}
            value={category.name ? category.name : catName}
            onChangeText={value => updateField(index, value)}
            placeholder="Enter Category Name"
          />

          <Text style={styles.label}>Fields</Text>
          <FlatList
            data={category.properties}
            keyExtractor={item => item.name}
            renderItem={({item, fInd}) => (
              <View style={styles.fieldContainer}>
                <View style={styles.fieldRow}>
                  <View style={styles.fieldNameContainer}>
                    <TextInput
                      style={styles.fieldName}
                      value={item.name}
                      onChangeText={value =>
                        dispatch(
                          updateProperty({
                            categoryName: category.name,
                            propertyName: item.name,
                            updatedProperty: {...item, field: value},
                          }),
                        )
                      }
                      placeholder="Field"
                    />
                  </View>
                  <Text style={styles.fieldType}>{item.type}</Text>
                  <RemoveButton
                    style={styles.removeFieldBtn}
                    onPress={() =>
                      handleRemoveField(fInd, index, category.name, item.type)
                    }
                  />
                </View>
              </View>
            )}
          />

          <View style={styles.titleButtonContainer}>
            <TouchableOpacity
              style={styles.titleButton}
              onPress={toggleDropdownVisibility}>
              <Text style={styles.titleButtonText}>Show Fields</Text>
            </TouchableOpacity>
            {isDropdownVisible && (
              <View style={styles.dropdownContainer}>
                <FlatList
                  data={fieldOptions}
                  keyExtractor={item => item}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      style={styles.fieldOption}
                      onPress={() => {
                        handleAddField(item, index, category.name);
                        toggleDropdownVisibility();
                      }}>
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            )}
          </View>

          <View style={styles.buttonRow}>
            <AddFieldButton
              onSelect={(type: string) =>
                handleAddField(type, index, category.name)
              }
            />
            <RemoveButton
              style={styles.removeCardBtn}
              onPress={() => handleRemoveCard(index, category.name)}
              title="Remove"
            />
          </View>
        </Card>
      ))}

      <AddButton title="ADD" onPress={handleAddCard} style={styles.addButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  card: {
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  fieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldNameContainer: {
    flex: 1,
    marginRight: 8,
  },
  fieldType: {
    marginRight: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fieldName: {
    flex: 1,
    fontSize: 16,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
  },
  removeFieldBtn: {
    // flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  removeCardBtn: {
    // flex: 1,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    width: '100%',
  },
  titleButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  titleButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '100%',
  },
  titleButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    elevation: 5,
    zIndex: 1,
  },
  fieldOption: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default ManageCategories;
