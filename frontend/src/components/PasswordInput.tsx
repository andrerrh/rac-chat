import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export function PasswordInput({ field }: any) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        {...field}
      />
      <Button
        type="button"
        size="sm"
        className="absolute right-0 top-0 h-full !bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeIcon className="text-white" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="text-white" aria-hidden="true" />
        )}
      </Button>
    </div>
  )
}
