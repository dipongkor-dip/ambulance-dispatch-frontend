import Login, { type AuthMode } from "../components/auth/Login";
import { Dialog, DialogContent } from "../components/ui/dialog";

interface AuthProps {
  open: boolean;
  mode: AuthMode;
  onOpenChange: (open: boolean) => void;
  onModeChange: (mode: AuthMode) => void;
  onAuthSuccess: () => void;
  notice?: string;
}

const Auth = ({
  open,
  mode,
  onOpenChange,
  onModeChange,
  onAuthSuccess,
  notice,
}: AuthProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto p-0">
        <Login
          mode={mode}
          onModeChange={onModeChange}
          onOpenChange={onOpenChange}
          onAuthSuccess={onAuthSuccess}
          notice={notice}
        />
      </DialogContent>
    </Dialog>
  );
};

export default Auth;
