// components/ui/RoleSwitchButton.tsx
import { Repeat } from "lucide-react";
import { UserRole } from "@/components/constants/namingConstant";
import { useGetMyProfileQuery } from "@/lib/api/userApi";

interface RoleSwitchButtonProps {
  onClick: () => void;
  className?: string;
}

export const RoleSwitchButton = ({ onClick, className = "" }: RoleSwitchButtonProps) => {
  const { data: myProfile } = useGetMyProfileQuery();
  const activeRole = myProfile?.data?.activeRole;

  // Only show if user has multiple roles
  if (!myProfile?.data?.roles || myProfile.data.roles.length <= 1) {
    return null;
  }

  const switchToText = activeRole === UserRole.CUSTOMER ? "Seller" : "Customer";

  return (
    <li
      onClick={onClick}
      className={`hover:bg-sky-400 hover:text-white py-1 px-2 w-full flex items-center gap-2 cursor-pointer rounded-sm ${className}`}
    >
      <Repeat size={18} /> Switch to {switchToText}
    </li>
  );
};