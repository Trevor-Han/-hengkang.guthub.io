// 全局配置

let baseUrl = '';
if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://60.1.36.187:81';
} else if (process.env.NODE_ENV === 'production') {
  baseUrl = 'http://60.1.36.187:81';
}

export default baseUrl;

