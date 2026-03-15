import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { IUser } from "@/types/auth.types";

type TProtectedRoute = {
  children: ReactNode;
  roles?: string[]; // optional allowed roles
};

const PrivateRoute = ({ children, roles }: TProtectedRoute) => {
  const token = useAppSelector(selectCurrentToken);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user: IUser | null = null;
  try {
    user = verifyToken(token);
  } catch (error) {
    console.error("Invalid token:", error);
    return <Navigate to="/login" replace />;
  }

  // Defensive: user might be null or role undefined
  const userRole = user?.activeRole ?? "";

  // Check role-based access only if roles are defined
  if (roles && roles.length > 0 && !roles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
