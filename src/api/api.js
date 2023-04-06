import axios from './server';


// 登录
export default function logIn(data) {
  return axios({
    url: '/xxx/user/logIn',
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    data
  });
}
