// hooks/useRoleSwitch.ts
import { useState } from "react";
import { useSwitchRoleMutation } from "@/lib/api/userApi";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/redux/hooks";
import { setUser } from "@/redux/features/auth/authSlice";
import { verifyToken } from "@/utils/verifyToken";
import { IUser } from "@/types/auth.types";
import { useNavigate } from "react-router-dom";

interface UseRoleSwitchReturn {
  switchRole: () => Promise<void>;
  isSwitching: boolean;
  targetRole: string | null;
}

export const useRoleSwitch = (): UseRoleSwitchReturn => {
  const [isSwitching, setIsSwitching] = useState(false);
  const [targetRole, setTargetRole] = useState<string | null>(null);
  const navigate = useNavigate();
  const [switchRoleMutation] = useSwitchRoleMutation();
  const dispatch = useAppDispatch();

  const handleSwitchRole = async () => {
    setIsSwitching(true);
    try {
      const res = await switchRoleMutation(undefined).unwrap();
      console.log("res", res)
      const message = res?.message || "Role switched successfully";
      const user = verifyToken(res.data.accessToken) as IUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      // Wait briefly so the dialog is visible and popover has closed, then show toast
      setTimeout(() => {
        toast.success(message);
      }, 500);

      // Reload after dialog has been shown
      setTimeout(() => {
        window.location.reload();
      }, 800);
      navigate(`/`);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to switch role");
      setIsSwitching(false);
      setTargetRole(null);
    }
  };

  return {
    switchRole: handleSwitchRole,
    isSwitching,
    targetRole,
  };
};