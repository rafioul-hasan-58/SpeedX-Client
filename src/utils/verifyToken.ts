import { IUser } from "@/types/auth.types";
import { jwtDecode } from "jwt-decode";


export const verifyToken = (token: string): IUser => {
  return jwtDecode<IUser>(token);
};
