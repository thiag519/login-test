import z from "zod";

export const postSchemaCreate = z.object({
  title: z.string().min(3, "O titulo deve conter no minimo 5 caracteres.").max(100,"O titulo deve conter no maximo 100 caracteres."),
  content: z.string().min(10, "O conteudo deve conter no minimo 10 caracteres.").max(300, "O conteudo deve conter no maximo 300 caracteres.")
});