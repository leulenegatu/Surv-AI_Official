# Development and contributions

License terms remain undecided. Discuss contribution/distribution terms with the owner before submitting code; no contributor license agreement or open-source grant is implied.

Use Node.js 24.7+ and work from the repository root. Backend modules live in `src/`; `server.mjs` is the root entry point; `dist/` contains editable frontend source with no build step. Test fixtures use temporary storage and mock providers. Never point tests at a personal `.local-data` directory or reuse a real API key.

```powershell
npm test
python tools/verify_public.py
python tools/package_release.py
```

The public allowlist is `public-files.json`. Add intentional new source/docs files to it after reviewing them. Do not add runtime directories, real screenshots, logs, `.env`, keys or exports. The release ZIP contains only allowlisted paths and a generated per-file checksum manifest; `.gitignore` is an additional safeguard, not the packaging policy.

Optional browser QA uses Playwright with Edge, declared in `package.json` development dependencies. Install dev dependencies explicitly with `npm install`; browser scripts require an installed supported browser. No npm install is necessary to run the application or its Node tests. Documentation captures use generated canvas frames, temporary accounts and a blocked provider. [Screenshot provenance](docs/screenshots/README.md) describes the process.

When reporting bugs, include the feature, reproduction steps, Node/Python/browser versions and sanitized error category. Exclude credentials, cookies, titles, camera footage, personal observations and complete runtime directories. Keep changes focused and preserve consent, ownership, request spacing and active-session integrity.
