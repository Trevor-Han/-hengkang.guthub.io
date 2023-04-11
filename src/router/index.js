import { useRoutes,useNavigate  } from 'react-router-dom' // 引入所需要路由的页面
// import { Redirect } from '@/router/redirect'
import { useEffect } from "react";
import App from '../App'
import Home from '../page/home/home';
import System from '../page/system/system';
import NotFound from '../page/notFound';

function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
        navigate(to);
    });
    return null;
}

const routerMenu = [
    {path: "home", element: <Home/>, children: []},
    { path: "app", element: <App/> },
    { path: "/404", element: <NotFound/> },
    {path: '/system', element: <System/>},
    { path: "*", element: <Redirect to="/404" /> },
    { path: "/", element: <Redirect to="/home" /> }
]
function Router(){
    return useRoutes(routerMenu)
}
export default Router
