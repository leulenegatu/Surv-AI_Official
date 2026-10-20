# Public release verification

Prepared October 20, 2026. This report covers the independent public source tree, not publication of a repository. No Git repository was initialized here and no push, hosted release or existing startup-task update was performed.

## Distribution boundary

The public root contains the complete application: `server.mjs`, 31 backend modules under `src/`, Python/PowerShell workers, editable frontend `dist/`, optional browser companion, setup/hidden-launcher files, public tests and documentation. Private development files and historical verification artifacts were not copied wholesale. Public source paths and installed-runtime selection were adapted only inside the new copy.

The README is redesigned around verified features and a real synthetic-data walkthrough. Documentation links are relative to this root. No project license was invented; `LICENSE` is absent and package metadata is `UNLICENSED`. See [the audit](SECURITY-AUDIT.md).

## Automated regression results

Executed against the public layout using Node.js **24.19.0** and Python **3.12.14**:

```powershell
npm test
```

**342 tests: 341 passed, 0 failed, 1 skipped.** The optional real OpenCV/model acceptance test is skipped by default; public model weights/environments are intentionally not bundled. All ordinary tests use disposable SQLite databases and synthetic/mocked provider/collector data. The suite covers accounts/ownership/CSRF, onboarding, history, local Ask, camera gating/Area rotation, context pairing/lifecycle, usage, retention/reports, recovery and startup/shutdown. No paid provider request is required.

After adding the public-only verified-Node setup record for Scheduler's cached PATH, the affected **11 startup/lifecycle regressions passed again**. No machine/user PATH or existing task was changed.

Relocating the source exposed transitive helper/copy-fixture assumptions. The public copies of those helpers were included/adapted without changing original development tests or weakening application checks. The sanitized homepage test now verifies retained attribution and omitted personal email.

## Browser and documentation acceptance

`tools/capture-docs.cjs` renders the actual public application in isolated headless Edge. It exercises first-run welcome, a real local fixture login, camera configuration, explicit synthetic preview, owned history, detail, analytics, a deterministic local Ask answer, desktop/browser settings, a locally generated completed-month archive and Usage & Cost.

**14 captures passed**, all at 1600 × 1000, with **0 provider calls, 0 real camera calls, 0 real desktop samples and 0 page errors**. External browser requests are blocked. The preview is generated canvas media and detection is a fixture, not real-camera acceptance. A 1800 × 1420 walkthrough is composed from the same screenshots. The 15 reviewed WebP images total about 1.1 MB and have no EXIF. All fictional records and capture intermediates are excluded. See [provenance](screenshots/README.md).

## Independent ZIP installation

The release validation harness extracts the ZIP into a new temporary directory, checks its file hashes, and starts that extracted copy with an unused ephemeral port. It uses only the installed test Node runtime on PATH and an empty API configuration, without referencing the private application or its data. The harness checks:

- No bundled `.env`, `.local-data`, `.local-launcher`, user account or provider key.
- Explicit `setup.ps1` preserves a preexisting local `.env` and does not install a startup task.
- Hidden Start serves the real homepage with HTTP 200; Status reports readiness.
- Fresh owner onboarding completes with AI deferred; observation/session history remains empty.
- Auto Monitoring, Desktop/Browser Context and monthly archives remain OFF.
- Duplicate Start preserves the same process; graceful Stop/Start preserves the new owner account.
- SQLite integrity/foreign-key checks pass after clean shutdown; no analysis endpoint is invoked.

**Passed:** every extracted-installation check above, including HTTP 200, preserved owner after restart, an empty observation history, OFF defaults and clean SQLite integrity/foreign keys. The test invoked **zero AI analysis endpoints and zero real cameras**. Per-file ZIP hashes matched. No second physical PC is claimed; this is an extracted-copy portability check on Windows with a different temporary root and disposable data.

## Windows launcher acceptance

The public `tests/windows-startup-check.py` uses a separate copied application, synthetic owner/history, an ephemeral port and a uniquely named temporary task. It exercises the real Scheduler service, hidden windows, duplicate protection, authenticated stop, manual restart, canceled/confirmed Windows shutdown messages, useful error logs and occupied-port data preservation. The existing personal task is not edited. Temporary task/data are removed afterward. The PC is not rebooted.

**Passed:** actual Scheduler startup was hidden and its clean stop returned **LastTaskResult=0**. Duplicate launch, incorrect stop token, canceled shutdown, confirmed shutdown, live task-definition update, restart, log retention and occupied-port data preservation checks passed. Setup pins the explicitly verified Node executable in excluded local runtime configuration, so Scheduler need not inherit the setup terminal's PATH.

## Publication checks

```powershell
python tools/verify_public.py --clean-tree
python tools/package_release.py
```

The clean-tree gate verifies the reviewed allowlist, private path/credential exclusions, required source, blank key example, local Markdown links/anchors and no unreviewed files. Packaging retains deterministic metadata, exact source bytes, a generated file/hash manifest and a ZIP SHA-256 sidecar. The release is extracted and verified before delivery. Test logs and private audit evidence stay outside the upload tree.

**Passed:** 163 allowlisted source/documentation files, valid relative links/images, no `.git` or unapproved `LICENSE`, and no known private credential/control values in candidate bytes. The final upload folder contains only reviewed source/docs; capture/test logs and intermediates are removed. The source ZIP contains those files plus its generated manifest and passes byte/hash/ZIP-integrity verification.

The original development source/configuration hashes and existing task XML are compared before/after. The live private server is checked read-only. No personal database is opened, migrated, erased or used in tests. No existing scheduled startup configuration is changed.

**Passed:** all **207** recorded original source/configuration hashes remain unchanged. Existing scheduled-task XML and the live server/listener are verified separately without stopping or restarting the user's installation. No personal data or private development files are included in the delivered ZIP.

## Remaining limits and approvals

No paid API call, model migration, new-PC physical installation, package/model redownload, actual webcam/performance or extended sleep/resume test was performed. Optional setup scripts were reviewed/parsed; PDFs and mocked workers were tested using already-available dependencies. OpenAI currently documents the preserved default model as deprecated, so model access/compatibility needs review before real AI use. There is no external security/accessibility certification.

**License selection and explicit publication approval remain pending.** They do not justify copying private data or publishing the parent project. Upload only the reviewed public folder contents after the final checks, and attach only its clean ZIP/checksum to a future release. [Publishing steps](PUBLISHING.md).
