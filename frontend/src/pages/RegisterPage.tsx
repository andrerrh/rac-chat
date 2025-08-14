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
import { registerSchema, type RegisterInput } from "@/schemas/user.schema";
import { useCreateUser } from "@/hooks/useCreateUser";

export function RegisterPage() {
  const {
    mutate: createUser,
    isPending,
  } = useCreateUser();

  const handleSubmit = async (data: any) => {
    const formData = new FormData()
    formData.append("username", data.username);
    formData.append("password", data.password);
    if(data.avatar) formData.append("avatar", data.avatar[0]);
    createUser(formData);
  }

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      avatar: undefined,
    }
  })

  return (
    <div className="space-y-4 flex flex-col items-center m-auto">
      <h2
        className="text-xl"
      >Cadastre um novo usuário</h2>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmação de senha</FormLabel>
              <FormControl>
                <PasswordInput field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={(e) => field.onChange(e.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="text-white"
          disabled={isPending}
          type="submit"
        >
          Cadastrar
        </Button>
      </form>
    </Form>
    </div>
  )
}
