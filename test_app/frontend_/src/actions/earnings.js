import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {
  GET_EARNINGS,
  ADD_EARNINGS,
} from './types';


export const getEarnings = (link, budget_id) => (dispatch, getState) => {
    const params = {budget_id: budget_id};

    if (link == '') {
      link = "/api/earnings"
    }
    axios
        .get(link, {params: params}, tokenConfig(getState, 'access'))
        .then((res) => {
        dispatch({
            type: GET_EARNINGS,
            payload: res.data,
        });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addEarnings = (earnings, budget_id) => (dispatch, getState) => {
  const params = {budget_id: budget_id};
  axios
  .post('/api/earnings',  earnings, {params: params}, tokenConfig(getState))
  .then((res) => {
    dispatch(createMessage({ addEarnings: 'Earnings add' }));
    dispatch({
      type: ADD_EARNINGS,
      payload: res.data,
    });
  })
  .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};