# Proposed GitHub release description

**Draft only — nothing has been published.** Suggested title: **Surv-AI 1.0 — clean public source distribution**. Choose the actual tag/repository only after owner approval; this package does not create either.

Surv-AI is a locally hosted personal observation and recall platform combining optional camera snapshots, local person gating and Windows/browser context with owned history, analytics, local Ask and PDF reports.

This distribution includes:

- Complete backend source in `src/`, root server/startup files and editable frontend in `dist/`.
- Local accounts/onboarding, multiple local cameras, Smart Surv, Camera Areas, rotation/orientation, persistent history, optional desktop/browser context and deterministic evidence views.
- Usage estimates, local PDFs, retention/export/deletion and optional hidden Windows login startup.
- Beginner installation docs, 14 sanitized synthetic screenshots and a combined walkthrough.
- Public tests, an explicit source allowlist, deterministic ZIP packaging and per-file hashes.

**Download:** `surv-ai-1.0.0-github-public.zip` plus the matching `.sha256`. Extract the included `surv-ai/` folder, install Node.js 24.7+, run `setup.ps1`, then `npm start`. Python/local detection/PDF packages and model files are optional explicit setup downloads. Bring your own API account/key if you choose image interpretation. No npm runtime dependencies or build step is required.

The source ZIP contains no personal database, saved history, snapshots, credentials, launcher state, logs or preconfigured account. It does not install a startup task or open cameras. All documentation data is fictional. Images and selected supporting context may leave the computer only through configured analysis; the system is not fully offline.

Limitations: Windows-specific collection/startup; synthetic automated acceptance is separate from physical multi-camera and prolonged-use validation. Paid API access was not tested. The preserved `gpt-4.1-mini` default is currently documented as deprecated, so verify model access/compatibility before use. Usage estimates are not provider invoices. No approved project license is included; resolve terms before presenting this as an open-source release.

See [installation](INSTALLATION.md), [verification](RELEASE-VERIFICATION.md), [audit](SECURITY-AUDIT.md), [privacy](PRIVACY.md) and [license status](THIRD-PARTY.md).
