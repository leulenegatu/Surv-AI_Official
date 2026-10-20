# Optional hidden Windows login startup

Automatic startup is never installed by `setup.ps1`, `npm start` or onboarding. Run this only if you explicitly want a login task for this installation:

Run `setup.ps1` first. It records this installation's verified Node executable privately, so a Task Scheduler process with an older cached PATH cannot choose an incompatible version. Re-run setup after moving to another PC or changing that runtime. No machine/user PATH or execution-policy change is made.

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\configure-startup.ps1
# Review the displayed action, then explicitly install:
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\configure-startup.ps1 -Action Install
```

Run from the extracted application folder. The script resolves its own path, so it works after copying the folder to another Windows PC. It creates/updates **Surv-AI Auto Start**, saving existing XML to `.local-launcher\task-backups`. It does not stop an existing process. Do not update a task belonging to another installation; choose an explicit different `-TaskName` when appropriate, and never run two servers against the same private data directory or port.

An existing administrator-owned task may need one administrator registration approval. The server itself should run as the normal user, **Interactive/Limited**, with **Run only when user is logged on**. Do not select Run with highest privileges just to hide the window. Interactive login preserves Desktop Context and shutdown notifications.

## Exact action fields

`configure-startup.ps1` displays the exact absolute values for your actual folder. For an installation extracted to **`C:\Apps\Surv-AI`**, the three fields are:

**Program/script:**

```text
C:\Windows\System32\wscript.exe
```

**Arguments:**

```text
//B //NoLogo "C:\Apps\Surv-AI\start-hidden.vbs" -NoProfile -NonInteractive -ExecutionPolicy Bypass -WindowStyle Hidden -File "C:\Apps\Surv-AI\background.ps1" -Action Run
```

**Start in**, without quotes:

```text
C:\Apps\Surv-AI
```

Replace the example folder in both paths and the working directory with your actual extracted root. Use the logon trigger for your Windows account. Keep IgnoreNew, unlimited execution time, no forced termination, battery operation allowed and three one-minute failure retries, as the installer configures.

**`-ExecutionPolicy Bypass` is preserved** explicitly in the action and both PowerShell launches. It is process-scoped; no system/user execution policy is changed. Windows Script Host is the GUI entry point, which avoids the console flash possible with starting PowerShell directly. It waits for the hidden resident supervisor so Scheduler tracks process lifetime and exit status.

## Manual controls

From the application folder:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\background.ps1 -Action Status
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\background.ps1 -Action Start
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\background.ps1 -Action Stop
powershell.exe -NoProfile -ExecutionPolicy Bypass -File .\background.ps1 -Action Restart
```

Start waits for readiness. Stop waits for existing cleanup; Restart stops first. These control only instances started by this background launcher. A foreground `npm start`/`start.ps1` process must first be stopped in its original terminal with Ctrl+C. No unrelated Node process is killed. For ordinary managed shutdown use Stop rather than Task Scheduler End or Task Manager. Double-clicking `start-hidden.vbs` also starts a hidden instance.

## Logs and shutdown

Timestamped stdout, stderr and supervisor logs remain under `.local-launcher\logs`. Early PowerShell errors go to `.local-launcher\launcher-errors.log`; GUI bootstrap failures go to `logs\bootstrap-errors.log`. Status reports the log location. Logs/state are private runtime data and excluded from source releases. Do not publish them without review.

Scheduler IgnoreNew, an exclusive per-installation lock and the server's pre-storage occupied-port guard prevent duplicates. The hidden supervisor receives confirmed Windows session-end messages and uses an authenticated local named pipe to invoke the existing server SIGTERM handler. That handler closes collectors, finalizes sessions, awaits pending work and closes storage. Canceling Windows shutdown leaves the server running. Production launcher code does not force-kill the server.

The copied application is tested with actual Scheduler launches and Windows shutdown messages. The release checks do not reboot the computer. Forced power loss, explicit force termination or OS-enforced timeouts cannot guarantee graceful cleanup. Windows Script Host, Windows PowerShell and .NET Framework must be available/enabled; no third-party service manager is required.

To restore an earlier task definition, use its XML backup through Task Scheduler or `Register-ScheduledTask -Xml` with appropriate registration permission. This changes future launches, not current processes.
