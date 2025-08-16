// action - state management
import * as actionTypes from './actions';

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

export const initialState = {
  isAuthenticated: false,
  userData: {
    userId: '',
    email: '',
    firstName: '',
    lastName: '',
    userType: ''
  }
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        isAuthenticated: false
      };
    case actionTypes.SET_USER:
      return {
        ...state,
        userData: action.payload
      };
    default:
      return state;
  }
};

export default authReducer;
