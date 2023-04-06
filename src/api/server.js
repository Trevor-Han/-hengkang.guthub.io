import axios from 'axios';
import {message} from 'antd';
import qs from 'qs';
import baseURL from './envConfig';

const config = {
  baseURL: baseURL || '',
  timeout: 60 * 1000 // Timeout
};

const _axios = axios.create(config);

_axios.interceptors.request.use((con) => {
  const token = '123';
  if (token) {
    con.headers.token = `${token}`;
  }
  if (con.method === 'get') {
    con.paramsSerializer = function (params) {
      return qs.stringify(params, {arrayFormat: 'repeat'});
    };
  }
  return con;
}, (error) =>
  // Do something with request error
  Promise.reject(error));
_axios.interceptors.response.use(
  (response) => {
    if (+response.status === 200) {
      if (+response.data.code === 401 && response.data.msg === '登录超时!') {
        window.localStorage.setItem('ctmStorage', '');
        return;
      }
      return response.data;
    }
    if (_axios.reject) {
      return _axios.reject(response);
    }
    message.error('请求失败');
    return Promise.reject(response);

    // Do something with response data
    // return response;
  },
  (error) => {
    // Do something with response error
    if (_axios.reject) {
      return _axios.reject(error.response);
    }
    if (error && error.response && error.response.statusText) {
      message.error(error.response.statusText || '请求失败');
    }
    return Promise.reject(error);
  }
);
export default _axios;
