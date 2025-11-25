import * as z from 'zod';

export const ping = z.object({
    event: z.string() ,
    data: z.object({
        payload: z.any()
    }),
});

export const pingOptionalMessage = ping.partial({
    data: true,
})

export const echo = z.object({
    event:z.string(),
    data: z.object({
        payload:z.any()
    }),
})

