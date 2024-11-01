import React from "react";
import { Button, Dialog } from "@/components/ui";
import { signIn } from "next-auth/react";
import { LoginForm } from "./forms/login-form";
import { RegisterForm } from "./forms/register-form";

interface Props {
  open: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
  const [type, setType] = React.useState<"login" | "register">("login");

  const onSwitch = () => setType(type === "login" ? "register" : "login");
  const handleClose = () => {
    onClose();
  };
  return (
    <Dialog.Dialog open={open} onOpenChange={handleClose}>
      <Dialog.DialogContent className="w-[450px bg-white p-10]">
        {type === "login" ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}
        <hr />
        <div className="flex flex-col gap-2">
          <Button
            variant="secondary"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              })
            }
            type="button"
            className="gap-2 h-12 p-2 flex-1"
          >
            <img
              className="size-6"
              src="https://img.icons8.com/color/48/gmail-new.png"
              alt="gmail-new"
            />
            Sign in with Google
          </Button>
          <Button
            variant="outline"
            onClick={onSwitch}
            type="button"
            className="h-12"
          >
            {type === "login" ? "Register" : "Login"}
          </Button>
        </div>
      </Dialog.DialogContent>
    </Dialog.Dialog>
  );
};
