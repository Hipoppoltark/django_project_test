import {
    GET_BUDGETS
  } from '../actions/types';
  
  const initialState = {
    budgets: [],
    next: '',
    previous: '',
  };
  
  export const budgetsReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BUDGETS:
        console.log(action.payload.next);
        return {
            ...state,
            budgets: action.payload.results,
            next: action.payload.next,
            previous: action.payload.previous,
        };
      default:
        return state;
    }
  }