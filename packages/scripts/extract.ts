import { writeFileSync } from "fs";
import { schemas} from "../server/schema/schema";

const output : Record<string,any> = {};

for (const [event, schema] of Object.entries(schemas)) {
  output[event] = (schema as any)._def;
}


writeFileSync("packages/.wsrpc/schema.json", JSON.stringify(output, null, 2));
