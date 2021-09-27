import {
    GET_EARNINGS,
    ADD_EARNINGS
  } from '../actions/types';
  
  const initialState = {
    earnings: [],
    budget_id: 1,
    next: '',
    previous: '',
  };
  
  export const earningsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_EARNINGS:
        return {
            ...state,
            earnings: action.payload.results,
            next: action.payload.next,
            previous: action.payload.previous,
        };
      case ADD_EARNINGS:
        return {
          ...state,
          earnings: [...state.earnings, action.payload],
        };
      default:
        return state;
    }
  }