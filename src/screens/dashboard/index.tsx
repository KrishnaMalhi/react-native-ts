import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {RootDrawerNavigationProp} from '../../navigation/Navigation';
import Card from '../../components/card/Card';
import {Categories} from '../../constants/dummy-data';
import TextField from '../../components/fields/TextField';
import NumberField from '../../components/fields/NumberField';
import DateField from '../../components/fields/DateField';
import CheckboxField from '../../components/fields/CheckboxField';
import {AddButton} from '../../components/buttons/AddButton';

type DashboardProps = {
  navigation: RootDrawerNavigationProp<'Dashboard'>; // Specify the type for the navigation prop
};

const Dashboard: React.FC<DashboardProps> = ({navigation}) => {
  const handleAddCategory = () => {
    navigation.navigate('Manage Categories');
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  const Fields = (
    item: {
      field: string;
      value: string | number | boolean;
      placeholder: string;
    },
    itemIndex: number,
  ) => {
    if (item.field === 'TextField') {
      const stringValue =
        item.value !== undefined ? String(item.value) : undefined;
      return (
        <TextField
          key={itemIndex}
          value={stringValue}
          placeholder={item.placeholder}
        />
      );
    }
    if (item.field === 'NumberField') {
      const numberValue =
        typeof item.value === 'number' ? item.value : undefined;
      return (
        <NumberField
          key={itemIndex}
          value={numberValue}
          placeholder={item.placeholder}
        />
      );
    }
    if (item.field === 'DateField') {
      const stringValue =
        item.value !== undefined ? String(item.value) : undefined;
      return (
        <DateField
          key={itemIndex}
          value={stringValue}
          placeholder={item.placeholder}
        />
      );
    }
    if (item.field === 'CheckboxField') {
      const checkedValue = !!item.value;
      return (
        <CheckboxField
          key={itemIndex}
          checked={checkedValue}
          checkedText={item.placeholder}
        />
      );
    }
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.container}>
        <AddButton
          title="ADD NEW"
          onPress={handleAddCategory}
          style={styles.addButtonContainer}
        />
        {Categories.map(category => {
          return (
            <View key={category.id}>
              <Text style={styles.categoryHeading}>{category.name}</Text>
              <Card style={styles.card}>
                {category.items.map((item, itemIndex) =>
                  Fields(item, itemIndex),
                )}
              </Card>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: '7%',
    paddingHorizontal: 16,
  },
  addButtonContainer: {
    alignSelf: 'stretch',
    marginBottom: 16,
  },
  card: {
    width: windowWidth - 32,
    marginBottom: 16,
  },
  categoryHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fieldContainer: {
    marginBottom: 10,
  },
});

export default Dashboard;
