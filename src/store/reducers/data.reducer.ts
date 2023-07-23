import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, ICategoryProperty } from '../../types';

interface InitialState {
  categories: ICategory[];
}

const initialState: InitialState = {
  categories: [],
};

// Common function to find a category by its name
const findCategoryByName = (categories: ICategory[], categoryName: string): ICategory | undefined => {
  return categories.find(category => category.name === categoryName);
};

const Database = createSlice({
  name: 'Database',
  initialState,
  reducers: {
    addCategory(state, action: PayloadAction<ICategory>) {
      state.categories.push(action.payload);
    },
    updateCategory(state, action: PayloadAction<string>) {
      const { name } = action.payload;
      const category = findCategoryByName(state.categories, name);
      if (category) {
        category.name = name;
      }
    },
    removeCategory(state, action: PayloadAction<string>) {
      const categoryName = action.payload;
      state.categories = state.categories.filter(category => category.name !== categoryName);
    },
    addProperty(
      state,
      action: PayloadAction<{
        categoryName: string;
        property: ICategoryProperty;
      }>,
    ) {
      const { categoryName, property } = action.payload;
      const category = findCategoryByName(state.categories, categoryName);
      if (category) {
        category.properties.push(property);
      }
    },
    updateProperty(
      state,
      action: PayloadAction<{
        categoryName: string;
        propertyName: string;
        updatedProperty: ICategoryProperty;
      }>,
    ) {
      const { categoryName, propertyName, updatedProperty } = action.payload;
      const category = findCategoryByName(state.categories, categoryName);
      if (category) {
        const propertyIndex = category.properties.findIndex(property => property.name === propertyName);
        if (propertyIndex !== -1) {
          category.properties[propertyIndex] = updatedProperty;
        }
      }
    },
    removeProperty(
      state,
      action: PayloadAction<{ categoryName: string; propertyName: string }>,
    ) {
      const { categoryName, propertyName } = action.payload;
      const category = findCategoryByName(state.categories, categoryName);
      if (category) {
        category.properties = category.properties.filter(property => property.name !== propertyName);
      }
    },
  },
});

export const {
  addCategory,
  updateCategory,
  removeCategory,
  addProperty,
  updateProperty,
  removeProperty,
} = Database.actions;

export default Database.reducer;
