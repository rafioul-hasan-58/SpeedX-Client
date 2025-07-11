import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddBike from "../pages/admin/AddBike";
import UpdateBike from "../pages/admin/UpdateBike";
import Register from "../pages/authentication/Register";
import Login from "../pages/authentication/Login";
import Home from "../pages/Customer/Home";
import ProductDetails from "../pages/universal/ProductDetails";
import Users from "../pages/admin/Users";
import AllBikesAdmin from "../pages/admin/AllBikesAdmin";
import MyProfile from "../pages/universal/MyProfile";
import PrivetRoute from "./PrivateRoute";
import VerifyOrder from "../pages/Customer/VerifyOrder";
import MyOrders from "../pages/Customer/MyOrders";
import About from "../pages/universal/About";
import MainLayout from "../Layout/MainLayout";
import AdminLayout from "../Layout/AdminLayout";
import AllOrdersAdmin from "@/pages/admin/AllOrdersAdmin";
import AllBikes from "@/pages/universal/AllBikes";
import Cart from "@/pages/universal/Cart";
import CustomerLayout from "@/Layout/CustomerLayout";
import MyAddedBikes from "@/pages/Customer/MyAddedBikes";
import CheckOut from "@/pages/Customer/CheckOut";


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
        path: 'add-bike',
        element: <PrivetRoute role="admin"><AddBike /></PrivetRoute>
      },
      {
        path: 'update-bike/:id',
        element: <PrivetRoute role="admin"><UpdateBike /></PrivetRoute>
      },
      {
        path: 'users',
        element: <PrivetRoute role="admin"><Users /></PrivetRoute>
      },
      {
        path: 'all-bikes',
        element: <PrivetRoute role="admin"><AllBikesAdmin /></PrivetRoute>
      },
      {
        path: 'all-orders',
        element: <PrivetRoute role="admin"><AllOrdersAdmin /></PrivetRoute>
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
        path: 'check-out',
        element: <PrivetRoute role="customer"><CheckOut /></PrivetRoute>
      },
      {
        path: 'cart',
        element: <Cart />
      },
      {
        path: 'product-details/:id',
        element: <ProductDetails />
      },
      {
        path: 'verify-order',
        element: <VerifyOrder />
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
    path: '/customer/dashboard',
    element: <PrivetRoute role="customer"><CustomerLayout /></PrivetRoute>,
    children: [
      {
        path: 'add-bike',
        element: <PrivetRoute role="customer"><AddBike /></PrivetRoute>
      },
      {
        path: 'my-added-bikes',
        element: <PrivetRoute role="customer"><MyAddedBikes /></PrivetRoute>
      },
      {
        path: 'update-bike/:id',
        element: <PrivetRoute role="customer"><UpdateBike /></PrivetRoute>
      },
      {
        path: 'my-orders',
        element: <PrivetRoute role="customer"><MyOrders /></PrivetRoute>
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