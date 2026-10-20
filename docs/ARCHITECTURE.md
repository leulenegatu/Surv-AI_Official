# Architecture and engineering

`server.mjs` is the root HTTP/CLI entry point. Backend domain modules are under `src/`, static browser files under `dist/`, and the optional Manifest V3 companion under `browser-companion/`. No generated build directory or npm runtime install is required.

| Boundary | Responsibilities |
| --- | --- |
| Browser | Camera permission/capture/orientation, application-level monitoring runtime, route UI, explicit controls and local homepage demonstrations |
| Node server | Authentication/CSRF, per-user ownership, validation, gate tickets, scheduling policy, request lock, provider integration and persistence |
| Python detector | Bounded CPU person checks, frame validity and confidence; no API credential or outbound inference |
| Windows collector | Foreground executable, optional caption, active/idle/locked state; no screen capture or keystrokes |
| Browser companion | Explicitly paired active-tab hostname and optional title, scoped local credential, reconnect/pause lifecycle |
| SQLite and private files | Local accounts, settings, observations, monitoring/context sessions, snapshots, report archives and recovery journals |
| PDF worker | Deterministic layout from retained structured records, without new AI requests |
| Windows supervisor | Hidden startup, private installation lock/control pipe, logs and existing graceful shutdown handling |

## Camera and provider workflow

Each explicitly enabled camera has one browser stream and its actual detection state. OpenCV checks can continue with Auto OFF. Smart Surv ON gates eligible requests on fresh valid person evidence. Cameras sharing an Area share one interval and saved round-robin cursor; Detection-Only Rotation can narrow participants to positive cameras. Unassigned cameras retain independent eligibility. The server binds single-use tickets to frames and validates them again before submission. A shared analysis lock prevents concurrent manual/automatic provider work. Missed intervals do not produce a catch-up burst.

Only eligible images and selected optional supporting context are sent through the OpenAI Responses API. Strict structured fields describe visible activity/location/objects and uncertainty. Provider output is validated before owned records and source references commit. Returning to Live after internal navigation shows the same application-level runtime/session. Refresh and loss of actual capture have separate lifecycle semantics.

## Context and evidence

Context metadata supports a saved moment; it is not evidence of attention, content consumption or productivity. Independent Context sessions do not require a camera or AI call. A shared collector and explicit owner/session lifecycle prevent duplicate workers. Independent run leases, browser pairing and user authentication have separate credentials. Revocation, sign-out and account changes are handled through the existing authorization boundary.

Local Ask answers supported day/week questions deterministically over stored data and returns evidence links. Analytics counts recorded observations/context spans. A camera-session span does not establish an activity's duration; gaps remain unknown. Reports reuse the same owned stored evidence and bounded available source images.

## Integrity and privacy lifecycle

Transactions and foreign keys protect linked observations/sessions. Core schema remains version 5 with feature-specific additive tables/columns. Startup recovery handles unfinished sessions. Retention and history reset protect active sessions and their linked observations. Required monthly PDFs are written and verified before eligible deletion; failure conservatively preserves required history. File journals and atomic replacement support retry/recovery.

Local credentials use native Argon2id and opaque HTTP-only sessions. Server-side account scoping applies to records, source files, queries, reports, cameras and context; ADMIN account management does not grant access to another account's private history. Owner/last-ADMIN deletion remains protected.

## Shutdown

The optional GUI entry launches a hidden resident PowerShell/.NET supervisor, which calls `start.ps1`. A hidden real top-level window receives confirmed Windows session-end messages. An authenticated local named pipe invokes the server's existing JavaScript SIGTERM handler rather than terminating Node. That path closes collectors, awaits pending work and closes storage. The task installer is explicit and separate from application setup.

## Tests and boundaries

The Node suite uses temporary databases, synthetic collectors/frames and mock providers. Public release checks additionally boot an extracted ZIP, verify first-run defaults and exercise actual HTTP/UI behavior. Browser captures replace camera APIs with an explicit synthetic canvas and block external requests. Physical multi-camera, hardware lighting/performance, long sleep/resume, another physical PC and a live paid provider account remain manual acceptance areas. This project has not undergone external penetration testing or independent accessibility certification.
