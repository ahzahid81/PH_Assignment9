import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Root from './Components/Root'
import NotFound from './Pages/NotFound'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ForgetPassword from './Pages/ForgetPassword'
import PrivateRoute from './Routes/PrivateRoute'
import ToyDetails from './Pages/ToyDetails'
import MyProfile from './Pages/MyProfile'
import ExtraPrivatePage from './Pages/ExtraPrivatePage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthProvider from './Providers/AuthProvider'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
      {
        path: "toy/:id",
        element: (
          <PrivateRoute>
            <ToyDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "extra",
        element: (
          <PrivateRoute>
            <ExtraPrivatePage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
