import { z } from "zod";

const budgetCategorySchema = z.object({
    name: z.string().min(1, "Category name is required"),
    amount: z
      .string()
      .regex(/^\d+(\.\d{1,2})?$/, "Please enter a valid number")
      .transform((val) => parseFloat(val)),
  });

export { budgetCategorySchema };