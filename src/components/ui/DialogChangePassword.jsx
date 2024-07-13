import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "react-toastify";

function DialogChangePassword({ password, setPassword, handleUpdatePassword }) {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handlePasswordChange = () => {
    if (
      password === confirmPassword &&
      (password !== "" || confirmPassword !== "")
    ) {
      handleUpdatePassword();
    } else if (password === "" || confirmPassword === "") {
      toast.error("Please fill in all fields");
    } else {
      toast.error("Passwords do not match");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="py-3 px-3 mt-4 rounded cursor-pointer justify-center items-center">
          <span className="text-black">You can change your password</span>
          <span className="font-bold text-dark-green"> here</span>
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change your Password</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Enter your new password
            </Label>
            <div className="relative col-span-3">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10" // Add padding to prevent the text from going under the image
              />
              <img
                src="/assets/show_password.png"
                alt="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer max-h-6 max-w-6" // Position the image
              />
            </div>
            <Label htmlFor="description" className="text-right">
              Confirm your new password
            </Label>
            <div className="relative col-span-3">
              <Input
                id="password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pr-10" // Add padding to prevent the text from going under the image
              />
              <img
                src="/assets/show_password.png"
                alt="Toggle password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer max-h-6 max-w-6" // Position the image
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-dark-green hover:bg-custom-green"
            type="submit"
            onClick={handlePasswordChange}
          >
            Change
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { DialogChangePassword };
