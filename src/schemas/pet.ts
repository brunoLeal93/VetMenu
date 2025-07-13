import { z } from 'zod'

export const petSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  gender: z.enum(['Cachorro', 'Gato', 'outro'], {
    errorMap: () => ({ message: 'Selecione um gênero' }),
  })
})

export type PetFormData = z.infer<typeof petSchema>