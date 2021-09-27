import axios from 'axios';
import { returnErrors } from './messages';
import { tokenConfig } from './auth';

import {
  GET_CATEGORIES,
} from './types';


export const getCategories = () => (dispatch, getState) => {
    axios
        .get('api/categories', tokenConfig(getState, 'access'))
        .then((res) => {
        dispatch({
            type: GET_CATEGORIES,
            payload: res.data,
        });
        })
        .catch((err) => dispatch(returnErrors(err.response.data, err.response.status)));
};