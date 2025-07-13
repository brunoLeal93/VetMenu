import { z } from 'zod'

export const DietItemSchema = z.object({
  item: z.string(),
  amount: z.number()
})

export const DietSchema = z.object({
  portionAmount: z.number(),
  margin: z.number(),
  dietItems = z.array(DietItemSchema)
})

export const DietGroupSchema = z.object({
  name: z.string(),
  diets: z.array(DietSchema)
})

export type DietFormData = z.infer<typeof DietSchema>