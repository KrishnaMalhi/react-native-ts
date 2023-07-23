import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import Dashboard from '../screens/dashboard';
import ManageCategories from '../screens/manage-categories';
// import {Categories} from '../constants/dummy-data';
import Category from '../screens/category';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers';

const Drawer = createDrawerNavigator();

const Navigation: React.FC = () => {
  const categories = useSelector((state: RootState) => state.app.categories);
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Dashboard">
        <Drawer.Screen name="Dashboard" component={Dashboard} />
        <Drawer.Screen name="Manage Categories" component={ManageCategories} />
        {categories.map(category => {
          if (category.name) {

            return <Drawer.Screen
              key={category.id}
              name={category.name}
              component={Category}
            />

          }
        })}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export type RootDrawerParamList = {
  Dashboard: undefined;
  'Manage Categories': undefined;
};
export type RootDrawerNavigationProp<T extends keyof RootDrawerParamList> =
  DrawerNavigationProp<RootDrawerParamList, T>;
export default Navigation;
