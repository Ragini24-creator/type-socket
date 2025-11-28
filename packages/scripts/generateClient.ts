

import fs from "fs";
import path from "path";

const schemaPath = path.resolve(__dirname, "../.wsrpc/schema.json");
const outputPath = path.resolve(__dirname, "../demo-client/generated/client.ts");


console.log("Looking for schema at:", schemaPath);

// 1. Load schema.json
const raw = fs.readFileSync(schemaPath, "utf-8");
const schema = JSON.parse(raw);

// 2. Start building output
let out = `// AUTO-GENERATED FILE — DO NOT EDIT\n\n`;
out += `export class WSClient {\n`;
out += `  constructor(private socket: WebSocket) {}\n\n`;


// 3. For each event in schema.json, generate a send method
for (const eventName of Object.keys(schema)) {
  const fnName = "send_" + eventName;

  // Create a simple send function
  out += `  ${fnName}(data) {\n`;
  out += `    this.socket.send(JSON.stringify({ event: "${eventName}", data }));\n`;
  out += `  }\n\n`;
}

out += `}\n`;

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, out);

console.log("Generated client at:", outputPath);
