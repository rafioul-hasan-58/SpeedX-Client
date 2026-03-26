// components/ui/RoleSwitchDialog.tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface RoleSwitchDialogProps {
  open: boolean;
  targetRole: string | null;
}

export const RoleSwitchDialog = ({ open, targetRole }: RoleSwitchDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-[300px] text-center"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-center text-sky-500">
            Switching Role
          </DialogTitle>
          <DialogDescription className="text-center">
            Switching you to{" "}
            <span className="font-semibold text-sky-500">{targetRole}</span>...
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-3 py-4">
          <Loader2 className="h-10 w-10 animate-spin text-sky-500" />
          <p className="text-sm text-gray-500">Please wait, reloading shortly</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};