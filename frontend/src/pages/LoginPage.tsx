import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input'

import { PasswordInput } from "@/components/PasswordInput";
import { loginSchema, type LoginInput } from "@/schemas/user.schema";

import { useLogin } from "@/hooks/useLogin";
import { useNavigate } from "react-router-dom";

type User = {
  username: string | null;
  avatar: string | null;
};

interface LoginPageProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export function LoginPage({ user, setUser }: LoginPageProps) {
  const navigate = useNavigate();

  const { mutate: loginUser, data: loginData } = useLogin();

  if (localStorage.getItem("token")) {
    setUser({
      username: loginData!.register.user.username,
      avatar: loginData!.register.user.avatarPath,
    })
    navigate("/", { replace: true });
  }


  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  return (
    <div className="space-y-4 flex flex-col items-center m-auto">
      <h2
        className="text-xl"
      >Login de usuário</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => loginUser(data))} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuário</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <PasswordInput field={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="text-white"
            type="submit"
          >
            Entrar
          </Button>
        </form>
      </Form>
    </div>
  )
}
