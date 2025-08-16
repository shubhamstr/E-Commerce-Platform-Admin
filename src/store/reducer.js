// third party
import { combineReducers } from 'redux';

// project import
import customizationReducer from './customizationReducer';
import authReducer from './authReducer';

// ==============================|| REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  auth: authReducer
});

export default reducer;
