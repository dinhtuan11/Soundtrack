import { createBrowserRouter } from 'react-router-dom';
import AuthLayout from 'src/layouts/AuthLayout';
import LoginContainer from 'src/pages/client/auth/Login/LoginContainer';
import RegisterContainer from 'src/pages/client/auth/Register/RegisterContainer';
import { CLIENT_ROUTE } from './ClientRouter';
import { ADMIN_ROUTE } from './AdminRouter';
import PrivateRoute from './PrivateRouter';
import PrivateAdminRoute from './PrivateAdminRouter';
import { ADMIN_URL } from 'src/config/constants';
import LoginAdminContainer from 'src/pages/admin/LoginAdminContainer';
import Page500 from 'src/pages/exeption/Page500';
import Page404 from 'src/pages/exeption/Page404';
import Premium from 'src/pages/client/premium/Premium';

export const router = createBrowserRouter([
  {
    element: <PrivateRoute/>,
    errorElement: <Page500/>,
    children: [CLIENT_ROUTE, {
      element: <Premium/>,
      path: '/premium'
    }],
  },
  {
    children:[
      {
        path: ADMIN_URL.ADMIN_LOGIN,
        element: <LoginAdminContainer/>
      },
      {
        element: <PrivateAdminRoute/>,
        path: '/admin',
        children: [ADMIN_ROUTE],
      }
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: '/login',
        element: <LoginContainer/>
      },
      {
        path: '/register',
        element: <RegisterContainer/>
      },
    ]
  },
  {
    path:'*',
    element: <Page404/>,
  },
]);
