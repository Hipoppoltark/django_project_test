  
import axios from 'axios';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'


let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  })
  
  failedQueue = [];
};

axios.interceptors.response.use(response => {
    return response;
  }, error => {

  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise(function(resolve, reject) {
          failedQueue.push({resolve, reject})
        }).then(token => {
          originalRequest.headers['Authorization'] = 'Bearer ' + token;
          return axios(originalRequest);
        }).catch(err => {
          return Promise.reject(err);
        })
      }

    originalRequest._retry = true;
    isRefreshing = true;

    const refresh = localStorage.getItem('refresh');
    return new Promise(function (resolve, reject) {
       axios.post('/api/token/refresh/', { refresh })
        .then(({data}) => {
            localStorage.setItem('access', data.access);
            localStorage.setItem('refresh', data.refresh);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.access;
            originalRequest.headers['Authorization'] = 'Bearer ' + data.access;
            processQueue(null, data.access);
            resolve(axios(originalRequest));
        })
        .catch((err) => {
            processQueue(err, null);
            reject(err);
        })
        .finally(() => { isRefreshing = false })
    })
  }

  return Promise.reject(error);
});



/*axios.interceptors.response.use(response => {
    return response;
  }, err => {
    if (localStorage.getItem('refresh') == '') {
        return;
    }
    return new Promise((resolve, reject) => {
        const originalReq = err.config;
        if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
        {
            originalReq._retry = true;
  
            let res = fetch('/api/token/refresh/', {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json',
                    'Device': 'device'
                },
                redirect: 'follow',
                referrer: 'no-referrer',
                body: JSON.stringify({
                    refresh: localStorage.getItem("refresh")
                }),
            }).then(res => res.json()).then(res => {
                console.log(res);
                localStorage.setItem('access', res.access);
                localStorage.setItem('refresh', res.refresh);
                originalReq.headers['Authorization'] = `Bearer ${res.access}`;
                originalReq.headers['Device'] = "device";
  
                return axios(originalReq);
            }).catch((err) => {
              return;
            });
  
  
            resolve(res);
        }
  
        return Promise.reject(err);
    });
  });*/


ReactDOM.render(<App />, document.getElementById('root'));