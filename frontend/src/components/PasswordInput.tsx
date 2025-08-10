import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import type { ControllerRenderProps } from "react-hook-form";
import { cn } from "@/lib/utils";

interface PasswordInputProps {
  field: ControllerRenderProps<{
    username: string;
    password: string;
    confirmPassword: string;
  }>
}

export function PasswordInput({ field }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className="relative">
      <Input
        className={cn('hide-password-toggle pr-10')}
        type={showPassword ? "text" : "password"}
        {...field}
      />
      <Button
        type="button"
        size="sm"
        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <EyeIcon className="h-4 w-4" aria-hidden="true" />
        ) : (
          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
        )}
      </Button>
    </div>
  )
}
