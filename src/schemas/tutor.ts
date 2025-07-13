import { z } from 'zod'

export const TutorSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.email(),
  fones: z.array(z.object({
    number: z.string()
  })),
  addresses: z.array(
    z.object({
        address: z.string(),
        number: z.string(),
        complement: z.string(),
        zipCode: z.string(),
        distric: z.string(),
        city: z.string(),
        state: z.string(),
        main: z.boolean()
      })
    )
})

export type TutorFormData = z.infer<typeof TutorSchema>