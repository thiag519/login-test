import z from "zod";

export const postSchemaCreate = z.object({
  title: z.string().min(5, "O titulo deve conter no minimo 5 caracteres."),
  content: z.string().min(10, "O conteudo deve conter no minimo 10 caracteres.")
});