import {
    GET_WASTE_MONEY,
    ADD_WASTE_MONEY
  } from '../actions/types';
  
  const initialState = {
    waste_money: [],
    budget_id: 1,
    next: '',
    previous: '',
  };
  
  export const wasteMoneyReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_WASTE_MONEY:
        return {
            ...state,
            waste_money: action.payload.results,
            next: action.payload.next,
            previous: action.payload.previous,
        };
      case ADD_WASTE_MONEY:
        return {
          ...state,
          waste_money: [...state.waste_money, action.payload],
        };
      default:
        return state;
    }
  }