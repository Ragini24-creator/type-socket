## Type-Socket 
schema-safe typed RPC system on WebSockets with an auto-generated client

```

## High-level architecture 

┌──────────────────────┐         ┌─────────────────────────┐
│   Developer writes   │  ────▶  │   Server (Node.js)      │
│   event/router file  │         │  - router + handlers    │
│   (events.ts)        │         │  - zod validation       │
└──────────────────────┘         │  - runtime (ws server)  │
         ▲                        │  - broadcast/rooms      │
         │ generate client        └───────┬─────────────────┘
         │                                  │ ws messages
         │                                  ▼
┌──────────────────────┐         ┌─────────────────────────┐
│ Generated client lib │  ◀───── │    Browser / Node app   │
│ (ts file)            │         │  - typed calls:         │
│ - typed functions    │         │    client.chat.send()   │
│ - types (from zod)   │         │  - event listeners      │
└──────────────────────┘         └─────────────────────────┘

```
Data-flow for one call:

Frontend calls client.chat.sendMessage(payload).

Generated client serializes { event, payload, meta } and sends over ws.

Server runtime receives, decodes, validates via schema (Zod).

Server runs handler, optionally broadcasts.

Server replies / emits events; generated client on other side decodes and types payload.


## Core components (what to implement, conceptually)

Event Schema / Router — single source of truth where events + payload schema are declared.

Runtime (WS Server) — accepts WS connections, decodes messages, runs router, validates, returns responses, broadcasts.

Client Generator — reads the router/schema and emits a small TypeScript client file that exports typed functions & listeners.

Client Runtime — small runtime used by generated client for connection, send/receive, reconnection, heartbeats.

Demo App — small app that uses the generated client to show chat/presence or editor sync.

## Folder structure

```
type-socket/
├─ packages/
│  ├─ server/               # server runtime + router definitions
│  │   ├─ src/
│  │   │  ├─ events.ts      # event schema + handlers
│  │   │  ├─ runtime.ts     # ws server, router execution
│  │   │  └─ index.ts       # start server
│  ├─ client-gen/           # generator script (reads events.ts)
│  │   └─ src/generate.ts
│  └─ demo-client/          # demo web app that imports generated client
│      └─ src/
├─ package.json
└─ README.md
```

## tech stack & libs to use
```

Node.js (latest LTS)

TypeScript

ws (bare WebSocket server) or socket.io (if you prefer transport fallback)

zod for schemas & runtime validation

uuid for request IDs

esbuild or ts-node for quick runs

simple templating or ts-morph for codegen
```
