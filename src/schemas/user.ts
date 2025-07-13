import { z } from 'zod'

export const usuarioSchema = z.object({
  nome: z.string().min(2, 'Nome é obrigatório'),
  genero: z.enum(['masculino', 'feminino', 'outro'], {
    errorMap: () => ({ message: 'Selecione um gênero' }),
  }),
  termos: z.literal(true, {
    errorMap: () => ({ message: 'Você deve aceitar os termos' }),
  }),
  telefones: z
    .array(
      z.object({
        numero: z
          .string()
          .min(10, 'Número inválido')
          .max(15, 'Número muito longo'),
      })
    )
    .min(1, 'Adicione ao menos um telefone'),
})

export type UsuarioFormData = z.infer<typeof usuarioSchema>