import { jwtDecode } from "jwt-decode";

export interface IUser {
  email?: string;
  exp?: number;
  iat?: number;
  activeRole: "admin" | "customer" | undefined;
}

export const verifyToken = (token: string): IUser => {
  return jwtDecode<IUser>(token);
};
