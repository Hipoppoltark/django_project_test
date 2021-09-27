import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
  } from '../actions/types';
  
  const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case USER_LOADING:
        return {
          ...state,
          isLoading: true,
        };
      case USER_LOADED:
        return {
          ...state,
          isAuthenticated: true,
          isLoading: false,
          user: action.payload,
        };
      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        localStorage.setItem('access', action.payload.access);
        localStorage.setItem('refresh', action.payload.refresh);
        return {
          ...state,
          ...action.payload,
          isAuthenticated: true,
          isLoading: false,
        };
      case AUTH_ERROR:
      case LOGIN_FAIL:
      case LOGOUT_SUCCESS:
      case REGISTER_FAIL:
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        return {
          ...state,
          access: null,
          refresh: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        };
      default:
        return state;
    }
  }