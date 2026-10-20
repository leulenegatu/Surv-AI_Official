# Privacy, consent and retained evidence

Surv-AI is a local-first personal observation application. It is not fully offline: selected image analysis and optional attached desktop/browser metadata may be sent to the configured OpenAI API. Provider retention is governed separately; `store:false` is not a promise that every external copy is erased.

## What is stored

`.local-data` contains accounts, Argon2id password material, sessions, owned camera settings, observations, context, source images, exports/report journals and optional provider configuration. `.env` may contain a provider key. `.local-launcher` holds private control state and logs. Treat the entire installation and any backup as private. Local files are not a substitute for Windows account/disk security, and the provider configuration is not an encrypted vault.

The public source distribution contains none of those runtime directories or personal records. A fresh launch initializes new local storage. No sample account or factory password is created. Synthetic screenshots and homepage demos are presentation examples, not imported history.

## Explicit controls

Fresh installation defaults leave camera capture, Auto Monitoring, Desktop Context, Independent Context, Browser Context and monthly reports off. Camera permission/device confirmation and preview enablement are explicit. A saved enabled preview may restore later with already-granted browser permission; Auto Monitoring requires a separate activation after refresh. Independent Context has its own saved opt-in: ON may reconnect on authenticated login/refresh, while manual Pause/Stop is respected for the visit. Disabling the saved preference prevents later automatic reconnection.

Window/tab titles require separate consent. Browser pairing is explicit and revocable. The companion queries only the focused normal browser's active tab when requested; it excludes incognito and restricted/credential-bearing URLs. URLs are reduced to exact hostnames without path, query or fragment. The implementation has no content scripts, cookies/history permissions, page-body reading, keystrokes or screen capture.

Use the application with the informed consent of people in view. Shared camera scenes and window/tab titles can disclose sensitive information. Optional supporting context sent with an eligible AI image follows the same external-request boundary; other context stays local until intentionally exported.

## Retention, exports and deletion

History defaults to indefinite retention, sources follow observation history and monthly reports start OFF. Explicit finite policies support 30/90 days, six months or one year; source image policies can expire images independently or stop saving new ones. Expired images do not imply text was deleted. Active sessions and their linked observations remain protected until completion.

Account export includes owned configuration/history and available referenced sources, not credentials, provider keys or authentication sessions. Monthly PDFs download separately. Password-confirmed history reset retains account/cameras/preferences and can optionally remove archived monthly reports. Account deletion has its own confirmation and owner protections. Manual/external backups, already-exported documents and provider copies are outside local deletion.

Camera or context session spans describe confirmed runtime/context evidence and gaps; they do not measure a person's continuous activity, attention or intent. AI labels and person detections can be wrong.

## Hosting boundary

The server binds to 127.0.0.1. Keep it local. Changing the port does not provide internet security. A reverse-proxy HTTPS origin can be configured, but public hosting, multi-tenant deployment and external security assurance are not certified by this source release. Do not forward the plain service through a public tunnel or publish your installation/data directories.
