import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import Verifyemail from './Pages/Verifyemail';
import Home from './Pages/Home';
import MainLayout from './Pages/MainLayout';
import ProtectedRoutes from './components/ProtectedRoutes';
import VerificationSuccessful from './Pages/VerificationSuccessful';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Iqama from './Pages/Iqama';
import Salah from './Pages/Salah';
import Athan from './Pages/Athan';

function App() {
  const routes = createBrowserRouter([
    {
      path: '/login',
      element: <LoginPage />,
      errorElement: <div>404 Not Found</div>
    },
    {
      path:'/forgotpassword',
      element:<ForgotPassword/>,
      errorElement:<div>404 not found</div>
    },
    {
      path:`/resetpassword/:token`,
      element:<ResetPassword/>,
      errorElement:<div>404 not found</div>,
    },
    {
      path:`/:token`,
      element:<VerificationSuccessful/>,
      errorElement:<div>4004 not found</div>
    },

    {
      path: '/signup',
      element: <SignupPage />,
    },
    {
      element: <ProtectedRoutes />, // Wrap all protected routes with ProtectedRoutes
      children: [
        {
          element: <MainLayout />, // MainLayout will wrap all child routes below
          children: [
            { path: '/', element: <Home /> ,name:'Home'},
            { path: '/verifyemail', element: <Verifyemail /> },
            { path: '/timings/iqama', element: <Iqama />  },
            { path: '/timings/salah', element: <Salah />  },
            { path: '/timings/athan', element: <Athan />  },
            
          ]
        }
      ]
    }
  ]);

  return <RouterProvider router={routes} />;
}

export default App;
