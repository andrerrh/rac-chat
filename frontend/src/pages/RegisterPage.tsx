import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  username: z.string().min(5, {
    message: "O nome de usuário deve conter ao menos 5 letras",
  }),
  password: z
    .string()
    .min(5, {
      message: "A senha deve conter mais que 5 caracteres"
    })
    .refine((password) => /[A-Z]/.test(password), {
      message: "A senha deve conter letras maiusculas"
    })
    .refine((password) => /[0-9]/.test(password), {
      message: "A senha deve conter números"
    })
    .refine((password) => /[`!@#$%^&*()_\-+=§\[\]{};':"\\|,.<>\/?~ ]/.test(password), {
      message: "A senha deve conter caracteres especiais",
    }),
  confirmPassword: z.string()
})
  .check(z.refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassword"]
  }))

export function RegisterPage() {

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    }
  })

  return (
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
        <div>
          <Label>Avatar</Label>
          <Input className="mt-2" type="file" />
        </div>
        <Button type="submit">Cadastrar</Button>
      </form>
    </Form>
  )
}
