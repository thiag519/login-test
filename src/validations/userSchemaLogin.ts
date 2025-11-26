import {z} from 'zod';

export const userSchemaLogin = z.object({
  email:z.email("O e-mail deve ser valido."),
  password: z.string().min(6, "A senha deve conter no minimo 6 caracteres.")
})
