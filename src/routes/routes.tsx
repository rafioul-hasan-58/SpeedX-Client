import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddProduct from "../pages/admin/AddProduct";
import UpdateProduct from "../pages/admin/UpdateProduct";
import Register from "../pages/authentication/Register";
import Login from "../pages/authentication/Login";
import Home from "../pages/Customer/Home";
import ProductDetails from "../pages/universal/ProductDetails";
import CheckOut from "../pages/Customer/CheckOut";
import Users from "../pages/admin/Users";
import AllProducts from "../pages/admin/AllProducts";
import MyProfile from "../pages/universal/MyProfile";
import PrivetRoute from "./PrivateRoute";
import VerifyOrder from "../pages/Customer/VerifyOrder";
import MyOrders from "../pages/Customer/MyOrders";
import About from "../pages/universal/About";
import MainLayout from "../Layout/MainLayout";
import AdminLayout from "../Layout/AdminLayout";
import AllOrders from "@/pages/admin/AllOrders";
import AllBikes from "@/pages/universal/AllBikes";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },

    ]
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: 'dashboard',
        element: <PrivetRoute role="admin"><AdminDashboard /></PrivetRoute>
      },
      {
        path: 'add-product',
        element: <PrivetRoute role="admin"><AddProduct /></PrivetRoute>
      },
      {
        path: 'update-product/:id',
        element: <PrivetRoute role="admin"><UpdateProduct /></PrivetRoute>
      },
      {
        path: 'users',
        element: <PrivetRoute role="admin"><Users /></PrivetRoute>
      },
      {
        path: 'all-products',
        element: <PrivetRoute role="admin"><AllProducts /></PrivetRoute>
      },
      {
        path: 'all-orders',
        element: <PrivetRoute role="admin"><AllOrders /></PrivetRoute>
      },
      {
        path: 'my-profile',
        element: <MyProfile />
      },
    ]
  },
  {
    path: '/customer',
    element: <MainLayout />,
    children: [
      {
        path: 'check-out/:id',
        element: <PrivetRoute role="customer"><CheckOut /></PrivetRoute>
      },

      {
        path: 'product-details/:id',
        element: <PrivetRoute role="customer"><ProductDetails /></PrivetRoute>
      },
      {
        path: 'verify-order',
        element: <VerifyOrder />
      },
      {
        path: 'my-orders',
        element: <PrivetRoute role="customer"><MyOrders /></PrivetRoute>
      },
      {
        path: 'dashboard',
        element: <PrivetRoute role="customer"><Home /></PrivetRoute>
      },
      {
        path: 'all-bikes',
        element: <PrivetRoute role="customer"><AllBikes /></PrivetRoute>
      },
      {
        path: 'about',
        element: <PrivetRoute role="customer"><About /></PrivetRoute>
      },
    ]
  },

  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
]);