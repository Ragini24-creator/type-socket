import {z} from "zod";
import {schemas} from "../../schema/schema";

export type Events = {
    [K in keyof typeof schemas] : z.infer<(typeof schemas)[K]>
}


// export type Events = {
//     ping: {message: string},
//     join_room:{roomId: string},
// };

