import {combineReducers} from '@reduxjs/toolkit';
import Database from './data.reducer';

const rootReducer = combineReducers({
  app: Database,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
