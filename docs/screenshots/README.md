# Screenshot provenance

These are **real application screenshots**, captured in headless Microsoft Edge from the public source with a disposable SQLite installation. No personal database, profile, image, observation, API key or Windows/browser activity was used.

- Viewport: **1600 × 1000** for all 14 screen captures; walkthrough: 1800 × 1420.
- Fixed synthetic clock: October 20, 2026, UTC. All visible accounts and stored moments are fictional fixture data, not AI-generated observations from a real camera.
- Homepage V2 uses its existing clearly labeled synthetic interactive demonstrations.
- Live Observation is an **explicitly enabled generated canvas preview**, with Auto Monitoring OFF. No real webcam is opened; local detection is a synthetic test adapter, not a claim of physical OpenCV acceptance.
- Desktop/Browser Context screenshots show the actual opt-in controls. No real foreground application, browser tab, pairing token or window title was collected.
- Monthly archive UI contains a real locally generated PDF derived from fictional September observations; PDF generation makes no AI request.
- Usage shows no billed provider activity and keeps its hypothetical estimator separate. No artificial paid-usage totals are invented.
- A visible synthetic-fixture banner is added by the documentation test. It is a capture label, not a production application feature.
- Capture assertions: **0 provider calls, 0 real camera calls, 0 real desktop samples and 0 page errors**.

`tools/capture-docs.cjs` captures the UI after explicit fixture setup and blocks external browser requests. `tools/prepare_doc_images.py` converts those captures to WebP without EXIF and composes the walkthrough without generating/replacing UI content. No AI image editing is used. The original captures and disposable database are excluded from the release. The public tree contains only the reviewed documentation images.

To reproduce in a development copy with Node, Python, ReportLab, Pillow, Playwright and Edge installed:

```powershell
npm install
python -m pip install -r requirements-dev.txt -r requirements-report.txt
node tools/capture-docs.cjs
python tools/prepare_doc_images.py
```

The browser script chooses an ephemeral port and temporary database, refuses the production port through its fixture, mocks hardware and rejects any provider call. It neither starts Auto Monitoring nor changes Task Scheduler. Generated intermediate captures go to ignored `.test-output/docs`. Install development dependencies only when reproducing documentation; they are unnecessary for ordinary browsing.

## Gallery

| File | Screen |
| --- | --- |
| [00-walkthrough.webp](00-walkthrough.webp) | Nine-step product journey |
| [01-homepage.webp](01-homepage.webp) | Homepage V2 hero |
| [02-setup.webp](02-setup.webp) | First-run welcome |
| [03-cameras.webp](03-cameras.webp) | Cameras, Area and orientation |
| [04-live.webp](04-live.webp) | Synthetic preview, explicit controls |
| [05-overview.webp](05-overview.webp) | Main dashboard with fictional history |
| [06-history.webp](06-history.webp) | Timeline |
| [07-observation.webp](07-observation.webp) | Point-in-time record detail |
| [08-analytics.webp](08-analytics.webp) | Analytics Explorer |
| [09-ask.webp](09-ask.webp) | Local Ask workspace |
| [10-desktop.webp](10-desktop.webp) | Desktop Context consent |
| [11-browser.webp](11-browser.webp) | Browser Context controls |
| [12-reports.webp](12-reports.webp) | Monthly archive |
| [13-usage.webp](13-usage.webp) | Usage & Cost |
| [14-settings.webp](14-settings.webp) | Settings and retention |
