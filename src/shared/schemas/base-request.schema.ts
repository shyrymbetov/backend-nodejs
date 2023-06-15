import z from 'zod';

// Use this schema on requests without any validators, to make sure it's an empty request
export const BaseRequestSchema = z.object({
  body: z.object({}).strict(),
  params: z.object({}).strict(),
  query: z.object({}).strict(),
});
