import { z } from 'zod'

export const FoodSchema = z.object({
  type: z.string(),
  name: z.string(),
  referenceAmount: z.number(),
  referenceCost: z.number(),
  ic: z.number(),
  rawAmount: z.number(),
  produzedAmount: z.number(),
  defaultSupplier: z.string(),
  defaultNf: z.string()
})

export type FoodFormData = z.infer<typeof FoodSchema>