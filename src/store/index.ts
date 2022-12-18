import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { combineReducers } from 'redux';
import reducers from './reducers';

const rootReducer = combineReducers(reducers);

export default configureStore({
  reducer: rootReducer,
  middleware: [thunkMiddleware],
});
