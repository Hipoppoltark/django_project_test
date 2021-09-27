import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';

import {
  GET_BUDGETS,
} from './types';


export const getBudgetsUser = (link) => (dispatch, getState) => {
    console.log(link);
    if (link == '') {
      link = "/api/budgets"
    }
    axios
        .get(link, tokenConfig(getState, 'access'))
        .then((res) => {
        dispatch({
            type: GET_BUDGETS,
            payload: res.data,
        });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};