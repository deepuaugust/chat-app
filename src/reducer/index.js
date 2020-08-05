import { combineReducers } from 'redux';
import userListReducer from './userListReducer';

/**
 * @description - Core reducers combining all other reducers.
 */
const coreReducer = combineReducers({
  userListReducer,
});

export default coreReducer;
