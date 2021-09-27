import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {
  GET_WASTE_MONEY,
  ADD_WASTE_MONEY,
} from './types';


export const getWasteMoney = (link, budget_id, start_date, end_date) => (dispatch, getState) => {
    const params = {budget_id: budget_id, start_date: start_date, end_date: end_date};

    if (link == '') {
      link = "/api/waste_money"
    }
    axios
        .get(link, {params: params}, tokenConfig(getState, 'access'))
        .then((res) => {
        dispatch({
            type: GET_WASTE_MONEY,
            payload: res.data,
        });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addWasteMoney = (waste_money, budget_id) => (dispatch, getState) => {
  const params = {budget_id: budget_id};
  axios
  .post('/api/waste_money',  waste_money, {params: params}, tokenConfig(getState))
  .then((res) => {
    dispatch(createMessage({ addWasteMoney: 'Waste money add' }));
    dispatch({
      type: ADD_WASTE_MONEY,
      payload: res.data,
    });
  })
  .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};