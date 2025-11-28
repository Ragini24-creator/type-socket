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

export const join_room = z.object({
  event: z.literal("join_room"),
  roomId: z.string(),
});


export const schemas = {
    ping:ping,
    echo:echo,
    join_room : join_room
};


