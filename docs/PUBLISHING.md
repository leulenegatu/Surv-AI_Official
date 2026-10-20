# Publish only the clean public root

No repository or release has been created by this preparation. The parent project and its development Git history must remain private. License terms and publication still require the owner's decision.

## Before creating a repository

1. Review the [README](../README.md), [audit](SECURITY-AUDIT.md), [verification](RELEASE-VERIFICATION.md), [privacy](PRIVACY.md) and [license status](THIRD-PARTY.md). Choose/approve a project license before calling it open source; no license has been chosen for you.
2. Use the delivered **clean `github-public/` tree**, before running it for personal use. Run `python tools/verify_public.py --clean-tree`. This must pass; `.gitignore` alone is insufficient.
3. Confirm that `.env`, `.local-data`, `.local-launcher`, `.local-models`, `.local-python`, logs, exports and test outputs are absent. The only images should be reviewed synthetic documentation assets. Never drag the parent folder into GitHub.

## When you explicitly decide to publish

Create a new empty GitHub repository yourself. Upload **the contents of `github-public/`**, so `README.md`, `package.json`, `src/`, `dist/` and `docs/` are at the new repository root. Do not upload a containing `github-public/` directory layer, the parent application, `.public-release-work`, personal data or the existing development `.git` folder.

No remote URL is preconfigured. If you later use Git locally, initialize it only inside this clean root after explicit approval, inspect the staged filenames/diff and run a credential scan before any first push. A new repository does not need the private development history.

The generated release archive and checksum are delivered separately from the clean upload tree. Attach `surv-ai-1.0.0-github-public.zip` and its matching `.sha256` to a future GitHub Release only after approving its release description and terms. Do not upload audit/test logs or the parent source ZIP.

## Rebuild a release

From the public repository root:

```powershell
python tools/verify_public.py
python tools/package_release.py
# Optional output folder outside the repository:
python tools/package_release.py --output-dir ..\public-release
```

Default output is ignored `output/releases/`. The ZIP has one `surv-ai/` top-level folder and contains only explicit allowlisted files plus `release-manifest.json`. Extract it and follow the [installation guide](INSTALLATION.md). Add intentionally changed source/docs to `public-files.json` after review; never regenerate the allowlist from a used installation without checking every addition.

An actual application run creates private local state. For another public upload, use a fresh clean source tree or the allowlisted release workflow, rather than uploading a used folder. Check GitHub's secret scanning after an approved push; any real leaked credential requires rotation as well as appropriate history remediation.

[Draft release description](RELEASE-NOTES.md).
