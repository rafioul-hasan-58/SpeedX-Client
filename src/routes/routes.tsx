import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateProduct from "../pages/admin/CreateProduct";
import UpdateProduct from "../pages/admin/UpdateProduct";
import SignUp from "../pages/authentication/SignUp";
import SignIn from "../pages/authentication/SignIn";
import UserDashboard from "../pages/user/userDashboard";
import AllProducts from "../pages/universal/AllProducts";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: "/admin",
    element: <App />,
    children: [
      {
        path: 'dashBoard',
        element: <AdminDashboard />
      },
      {
        path: 'create-product',
        element: <CreateProduct />
      },
      {
        path: 'update-product',
        element: <UpdateProduct />
      },
    ]
  },
  {
    path: '/customer',
    element: <App />,
    children: [{
      path: 'dashBoard',
      element: <UserDashboard />
    },
    {
      path:'allProducts',
      element:<AllProducts/>
    }
  ]
  },
  {
    path: '/signUp',
    element: <SignUp />
  },
  {
    path: '/signIn',
    element: <SignIn />
  }
]);