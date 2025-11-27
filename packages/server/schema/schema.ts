import * as z from 'zod';

export const ping = z.object({
  event: z.literal("ping"),
  data: z.object({
    payload: z.any()
  }).optional(),
});

export const echo = z.object({
  event: z.literal("echo"),
  data: z.object({
    payload: z.any()
  }),
});


export const schemas = {
    ping:ping,
    echo:echo
};


