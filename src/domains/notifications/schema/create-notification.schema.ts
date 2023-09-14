import z from 'zod';

export const CreateNotificationSchema = z.object({
  body: z
    .object({
        header: z.string().optional(),
        content: z.string().optional(),
        userId: z.string(),
        sender: z.object({
            id: z.string().optional(),
            email: z.string().optional(),
            fullName: z.string().optional(),
            avatar: z.string().optional(),
        }).optional(),
    }),
  query: z.object({}).strict(),
  params: z.object({
      userId: z.string().optional()
  }).strict(),
});
