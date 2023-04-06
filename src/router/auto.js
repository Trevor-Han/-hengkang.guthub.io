import React, {memo} from 'react';
import {Redirect} from 'react-router-dom';

function Auth() {
  const pathname = 'tt';
  const isLogin = true;
  const targetRouterConfig = true;
  // 这部分代码，是为了在非登陆状态下，访问不需要权限校验的路由
  // const targetRouterConfig = config.find((v) => v.path === pathname);
  // if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
  //   const {component} = targetRouterConfig;
  //   return <Route exact path={pathname} component={component} />;
  // }

  if (isLogin) {
    // 如果是登陆状态，想要跳转到登陆
    if (pathname === '/login') {
      return <Redirect to="/login" />;
    }
    if (targetRouterConfig && pathname !== '/404') {
      return <Redirect to="/home/taskSearch" />;
    }
    return <Redirect to="/404" />;
  }
  // 非登陆状态下，重定向到登陆页
  return <Redirect to="/login" />;
}
export default memo(Auth);
