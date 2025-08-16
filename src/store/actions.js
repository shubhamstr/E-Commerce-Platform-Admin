// action - account reducer
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_USER = 'SET_USER';
export const MENU_OPEN = '@customization/MENU_OPEN';
export const MENU_TYPE = '@customization/MENU_TYPE';

export function login(data) {
  return {
    type: LOGIN,
    payload: { data }
  };
}

export function logout(data) {
  return {
    type: LOGOUT,
    payload: { data }
  };
}

export function setUser(data) {
  return {
    type: SET_USER,
    payload: { data }
  };
}
