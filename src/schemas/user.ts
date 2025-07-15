import { z } from 'zod'
import companySchema from './company

export const usuarioSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.email(),
  type: z.enum(['Administrador', 'Afiliado', 'outro'], {
    errorMap: () => ({ message: 'Selecione um tipo' }),
  }),
  companies: z.array(companySchema).optional(),
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
}).superRefine((data, ctx) => {
  if (data.type == 'Afiliado' && data.companies.empty()) {
    ctx.addIssue(
      path: ['companies'],
      code: z.ZodIssueCode.custom,
      message: 'Afiliado deve ter ao menos um empresa associada a ele',
      )
    
  }
})

export type UsuarioFormData = z.infer<typeof usuarioSchema>