# Optional Browser Companion

This unpacked Manifest V3 Chrome/Edge extension connects only to your local Surv-AI server at `127.0.0.1`. It needs no cloud account, store publication or native-messaging installation. It is optional and remains experimental across browser/Windows combinations.

1. Start Surv-AI and sign in. Under Settings → Desktop Context, explicitly enable Desktop Context and, if wanted, window/tab title sharing. Enable Browser Context and select the correct Chrome/Edge family.
2. Open `chrome://extensions` or `edge://extensions`, enable Developer mode, choose **Load unpacked**, and select **this repository's `browser-companion/` folder**.
3. Keep the supplied manifest public key unchanged. The extension ID is `bndekblhpdjogjgoemidnaiohccjncfj`. This RSA public key stabilizes the origin; it is not a private signing key or authentication credential.
4. In authenticated Surv-AI Settings, choose **Create pairing code**. In the extension popup, enter the server's loopback port (normally 4173), paste the single-use code within two minutes and explicitly pair. Verify the local installation/account fingerprints. No pairing code or saved credential ships in this package.
5. Choose the collection mode you want: camera-associated Auto Monitoring, or explicitly enabled Independent Context. Pairing alone does not open cameras or start monitoring. Independent Context has its separate saved opt-in/reconnect behavior.

Popup **Pause** stops this extension connection. **Resume / reconnect** restores it. **Disconnect locally** removes its saved credential; **Revoke / disconnect** in authenticated Surv-AI Settings invalidates it server-side. Disabling Browser Context leaves other permitted collection independent. Re-pair after revocation or account/installation changes. Reconnect alarms/cooldowns can take roughly 45 seconds.

Only the active tab in a focused normal browser window is sampled when requested. HTTP(S) URLs are reduced locally to a canonical exact hostname; paths, queries, fragments and credentials are never sent. Incognito and privileged/file/credential-bearing URLs are excluded. Permitted titles are bounded and share the explicit desktop title consent. No page bodies, history, cookies, forms, clipboard, keystrokes or screenshots are read.

The manifest requests `tabs` metadata, local `storage`, reconnect `alarms`, and loopback host access. It has no content scripts or broad website host permission. Its credential is scoped separately from ordinary login cookies and never contains the OpenAI key. Optional metadata attached to an already-eligible image analysis can leave the computer in that same provider request. Other retained history remains local until intentionally exported.

Windows foreground state is authoritative. Browser metadata is supporting evidence, not proof of attention, productivity or continuous content consumption. See [privacy](../docs/PRIVACY.md) and [installation](../docs/INSTALLATION.md).
