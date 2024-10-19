import { z } from 'zod';

export const transactionSchema = z.object({
    amount: z.string().min(1, 'Amount is required').refine(value => !isNaN(parseFloat(value)), { message: 'Amount must be a valid number' }),
    category: z.string().min(1,'Category is required'),
    description: z.string().optional(),
  });