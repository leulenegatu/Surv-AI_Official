# Install and run on Windows

## Prerequisites

- A writable folder, a modern camera-capable browser and [Node.js 24.7+](https://nodejs.org/en/download). Native SQLite/Argon2id are required; older Node versions fail explicitly. There are no npm runtime packages to install.
- [Python 3.10+](https://www.python.org/downloads/windows/) on PATH for local detection or PDF generation. Python 3.12 and Node 24 were used for release checks. Package wheel support may vary with Python/Windows architecture.
- A local webcam only if you want camera capture. Multiple-device performance depends on CPU, USB bandwidth and browser support.
- Your own API key/billing only if you want image interpretation. The homepage, local accounts and empty workspace run without it.

Download the ZIP and extract its `surv-ai` folder. The root must contain `server.mjs`, `package.json`, `src/` and `dist/`. There is no dependency on a parent development directory, a Codex installation, a preexisting database or a startup task. Use a normal writable folder rather than Program Files.

## Basic setup

Open PowerShell in that folder:

```powershell
node --version
python --version
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1
npm start
```

`setup.ps1` checks Node, records its verified executable in private `.local-runtime/node-path.txt`, and creates `.env` from the empty example **only if it does not exist**. Pinning the runtime prevents Task Scheduler's older cached PATH from selecting an incompatible Node. It does not start collection, register a task, install optional packages or overwrite an existing key. `npm start` runs `node server.mjs`. `powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\start.ps1` is an equivalent Windows entry point. Press Ctrl+C in its terminal for a graceful foreground stop. Run setup again after moving the installation to another PC or changing/removing the selected Node executable; that local path is never included in a release.

Open [http://localhost:4173/](http://localhost:4173/), then Get started. Use the same hostname on later visits because localhost/127.0.0.1 browser sessions differ. The server binds only to 127.0.0.1.

1. Create the installation's local owner with a unique password. This is a new ADMIN account, not a cloud account. Account email is not verified and no recovery email is sent.
2. Configure your own optional AI key or defer. Do not use fixture passwords from tests as real credentials.
3. Review interval and snapshot preferences. Confirm camera devices only when ready.
4. Reach the workspace. New history is empty. Camera capture, Auto Monitoring, Desktop Context, Independent Context and Browser Context do not start from fresh defaults. Monthly archives start OFF.

Owner/ADMIN password recovery is not implemented. Choose and retain credentials responsibly. Normal USER password reset requires a local ADMIN. Back up the installation securely with the server stopped; backups contain private information.

## Optional person detection and PDFs

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\setup.ps1 -LocalDetection -Reports
```

This explicitly downloads OpenCV/NumPy into `.local-python`, checksum-verifies MobileNet-SSD files in `.local-models` and installs ReportLab into `.local-python`. Downloads use the package/model hosts and your network. They do not call OpenAI. Review [dependency terms](THIRD-PARTY.md). No Python environment, model weights or copied site-packages are bundled in the source ZIP.

For detector-only setup use `setup-local.ps1` or the `-LocalDetection` switch. For PDF-only setup use `setup.ps1 -Reports`. The Python workers load this installation's `.local-python`. Optional `SURV_PYTHON` and `SURV_REPORT_PYTHON` environment settings can select explicit interpreter paths; use an interpreter compatible with the installed packages. Browsing and manual image interpretation do not require the detector, but Auto Monitoring does.

The download/install scripts were reviewed and syntax checked, without reinstalling dependencies during release preparation. Runtime workers and PDFs were exercised using already-available test dependencies; a brand-new physical PC's package downloads remain an installation acceptance check.

## Your API key

Create a key in your own API project using the [official OpenAI quickstart](https://developers.openai.com/api/docs/quickstart). Review your project's API access and [spend controls](https://developers.openai.com/api/docs/guides/spend-limits). Configuring a key does not verify its billing, model access or validity through a paid call.

Preferred: enter it in the server-backed onboarding form. It is stored privately at `.local-data/ai-provider.json` and is not returned to the browser. The file is local configuration, not an encrypted vault. Restrict access to your Windows account. Alternatively edit `.env`:

```dotenv
OPENAI_API_KEY=
OPENAI_MODEL=gpt-4.1-mini
PORT=4173
```

Fill only the API-key value on your computer. Never upload `.env` or `.local-data`. Environment credentials take precedence over saved onboarding configuration. Restart after environment changes. Do not paste real credentials into bug reports, screenshots, browser code or commands you intend to share.

The preserved model default is documented by OpenAI as deprecated. Confirm [current model access](https://developers.openai.com/api/docs/models/gpt-4.1-mini) for your project; a different `OPENAI_MODEL` must support image input, Responses and this application's strict structured-output contract. Model migration and paid access validation were not performed for the public release.

Only explicit Test Lab analysis and eligible Auto-ON observations invoke the provider. Selected images and opted-in supporting context may leave the computer. Local Ask, chart browsing, pairing and PDF generation do not add AI requests.

## Camera, context and background controls

Configure cameras in Cameras; explicitly grant permission and enable a preview. Auto Monitoring is separate and starts OFF. Saved enabled preview mappings may restore later if permission remains granted; Auto Monitoring still requires activation after reload. Camera Areas share one automatic interval and saved rotation order.

Desktop Context is optional Windows foreground metadata. Title sharing requires a separate opt-in. Independent Context can run without a camera; once its saved permission is ON, it can start/reconnect on authenticated login/refresh. Explicit Pause/Stop remains respected during that visit. Turn off the saved permission to keep it disabled after reopening.

For Browser Context, read the [companion instructions](../browser-companion/README.md). Load the included unpacked extension, verify the stable extension ID, and explicitly pair it from your authenticated Settings. No pairing credential is included. Pairing does not enable cameras.

For optional hidden login startup and manual Start/Stop/Restart, see [Windows startup](WINDOWS-STARTUP.md). Nothing registers it automatically. The setup preserves process-scoped `-ExecutionPolicy Bypass` and does not change the system-wide policy.

## Troubleshooting

| Symptom | Action |
| --- | --- |
| `node` not found / unsupported SQLite or Argon2id | Install Node 24.7+ and reopen the terminal; check `node --version`. |
| Port 4173 in use | Stop the other server gracefully, or set another `PORT` in `.env` and restart. Do not run multiple copies against one data directory. |
| PowerShell blocks scripts | Use the shown per-process Bypass commands or `npm start`; no machine-wide policy change is needed. |
| Python opens Microsoft Store / cannot be found | Install Python and make its real `python.exe` available on PATH, or set the relevant interpreter variable. |
| OpenCV/models unavailable | Run explicit detector setup, check download hashes/network access, and verify interpreter/package compatibility. |
| PDF renderer unavailable | Run `setup.ps1 -Reports`; verify `SURV_REPORT_PYTHON` if set. |
| AI unavailable, rejected key or billing error | Check your own server-side credential, configured model access and API account billing. Do not share the key. |
| Camera denied or missing | Review browser permissions and physical device mapping. Choose Retry connection or Change device. Hardware cannot be configured by a download alone. |
| Companion disconnected | Check loopback port, enabled settings, matching Chrome/Edge family and fresh explicit pairing; no browser metadata is available in incognito. |
| Startup task update denied | The task may need one administrator registration approval; keep its runtime user Interactive/Limited. |

Use only one installation's private data directory per server. Do not expose the plain HTTP service publicly. See [privacy](PRIVACY.md) before collecting, sharing exports or retaining sources.
