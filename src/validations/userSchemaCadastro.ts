import {z} from 'zod';

export const userSchemaCadastro = z.object({
  name: z.string().min(2, 'O nome deve conter no minimo 2 caracteres.'),
  email:z.email("O e-mail deve ser valido."),
  password: z.string().min(6, "A senha deve conter no minimo 6 caracteres.")
});
