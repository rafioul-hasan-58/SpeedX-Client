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
import PrivateRoute from "./PrivateRoute";
import VerifyOrder from "../pages/Customer/VerifyOrder";
import MyOrders from "../pages/Customer/MyOrders";
import About from "../pages/universal/About";
import MainLayout from "../Layout/MainLayout";
import AdminLayout from "../Layout/AdminLayout";
import AllOrdersAdmin from "@/pages/admin/AllOrdersAdmin";
import AllBikes from "@/pages/universal/AllBikes";
import Cart from "@/pages/universal/Cart";
import CustomerLayout from "@/Layout/UserLayout";
import MyAddedBikes from "@/pages/Customer/MyAddedBikes";
import CheckOut from "@/pages/Customer/CheckOut";
import { UserRole } from "@/components/constants/namingConstant";
import Settings from "@/pages/universal/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "dashboard",
        element: (
          <PrivateRoute roles={[UserRole.ADMIN]}>
            <AdminDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "users",
        element: (
          <PrivateRoute roles={[UserRole.ADMIN]}>
            <Users />
          </PrivateRoute>
        ),
      },
      {
        path: "all-bikes",
        element: (
          <PrivateRoute roles={[UserRole.ADMIN]}>
            <AllBikesAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: "all-orders",
        element: (
          <PrivateRoute roles={[UserRole.ADMIN]}>
            <AllOrdersAdmin />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "settings",
        element: (
          <PrivateRoute roles={[UserRole.ADMIN]}>
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/customer",
    element: <MainLayout />,
    children: [
      {
        path: "check-out",
        element: (
          <PrivateRoute roles={[UserRole.CUSTOMER]}>
            <CheckOut />
          </PrivateRoute>
        ),
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "verify-order",
        element: <VerifyOrder />,
      },
      {
        path: "all-bikes",
        element: (
          <PrivateRoute roles={[UserRole.CUSTOMER, UserRole.SELLER]}>
            <AllBikes />
          </PrivateRoute>
        ),
      },
      {
        path: "about",
        element: (
          <PrivateRoute roles={[UserRole.CUSTOMER, UserRole.SELLER]}>
            <About />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/customer/dashboard",
    element: (
      <PrivateRoute roles={[UserRole.CUSTOMER, UserRole.SELLER]}>
        <CustomerLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-orders",
        element: (
          <PrivateRoute roles={[UserRole.CUSTOMER, UserRole.SELLER]}>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "add-bike",
        element: (
          <PrivateRoute roles={[UserRole.CUSTOMER]}>
            <AddBike />
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute roles={[UserRole.ADMIN, UserRole.CUSTOMER]}>
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/seller/dashboard",
    element: (
      <PrivateRoute roles={[UserRole.CUSTOMER, UserRole.SELLER]}>
        <CustomerLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-added-bikes",
        element: (
          <PrivateRoute roles={[UserRole.CUSTOMER, UserRole.SELLER]}>
            <MyAddedBikes />
          </PrivateRoute>
        ),
      },
      {
        path: "my-orders",
        element: (
          <PrivateRoute roles={[UserRole.CUSTOMER, UserRole.SELLER]}>
            <MyOrders />
          </PrivateRoute>
        ),
      },
      {
        path: "add-bike",
        element: (
          <PrivateRoute roles={[UserRole.SELLER]}>
            <AddBike />
          </PrivateRoute>
        ),
      },
      {
        path: "settings",
        element: (
          <PrivateRoute roles={[UserRole.SELLER]}>
            <Settings />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/common",
    children: [
      {
        path: "update-bike/:id",
        element: (
          <PrivateRoute roles={[UserRole.ADMIN, UserRole.SELLER]}>
            <UpdateBike />
          </PrivateRoute>
        ),
      },
      {
        path: "add-bike",
        element: (
          <PrivateRoute roles={[UserRole.ADMIN, UserRole.SELLER]}>
            <AddBike />
          </PrivateRoute>
        ),
      },

    ]
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
