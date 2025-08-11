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

export function LoginPage() {

  const {mutate: loginUser, data: loginData} = useLogin();

  const handleLogin = async (data: any) => {
    await loginUser(data);
    if(!loginData?.register.success) return;

    localStorage.setItem('token', loginData.token);
  }

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
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
          type="submit"
        >
          Entrar
        </Button>
      </form>
    </Form>
  )
}
