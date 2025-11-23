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

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root></Root>, // this will be my layout (Navbar + Outlet + Footer)
      errorElement: <NotFound></NotFound>,
      children:[
        {
          index: true,
          element: <Home></Home>
        },
        {
          path: "login",
          element: <Login></Login>
        },
        {
          path: "register",
          element: <Register></Register>
        },
        {
          path: "forget-password",
          element: <ForgetPassword></ForgetPassword>
        },
        {
          path: "toy/:id",
          element: (
            <PrivateRoute>
              <ToyDetails>
              </ToyDetails>
            </PrivateRoute>
          ),
        },
        {
          path: "my-profile",
          element: (
            <PrivateRoute>
              <MyProfile></MyProfile>
            </PrivateRoute>
          ),
        },
        {
          path:"extra",
          element: (
            <PrivateRoute>
              <ExtraPrivatePage></ExtraPrivatePage>
            </PrivateRoute>
          )
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
