import { combineReducers } from 'redux';
import  {authReducer } from './authReducer';
import { messages } from './messagesReducer';
import { budgetsReducer } from './budgetsReducer';
import { wasteMoneyReducer } from './waste_moneyReducer';
import { categoriesReducer } from './categoriesReducer';
import { earningsReducer } from './earningsReducer';


export const rootReducer = combineReducers({
    auth: authReducer, 
    messages: messages,
    budgets: budgetsReducer,
    waste_money: wasteMoneyReducer,
    categories: categoriesReducer,
    earnings: earningsReducer,
})