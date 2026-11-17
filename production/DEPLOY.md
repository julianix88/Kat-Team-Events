# Website Deployment (Differential FTP Sync)

This project deploys with WinSCP + PowerShell:
- first run uploads everything from local site,
- normal runs upload only changed/new files,
- remote deletion is off by default for safety.

## 1) Prerequisites

1. Install WinSCP: [https://winscp.net/](https://winscp.net/)
2. Confirm `WinSCP.com` is available (installed in Program Files or in PATH).
3. Use PowerShell in the project root:
   `c:\Users\ACER\Desktop\Kat Team Events website`

## 2) Configure credentials safely

1. Copy `.env.deploy.example` to `.env.deploy.local`.
2. Fill real values in `.env.deploy.local`.
3. Keep `.env.deploy.local` private (never share/commit).

Supported variables:
- `FTP_PROTOCOL` (`ftp`, `ftps`, or `sftp`; default `ftp`)
- `FTP_HOST`
- `FTP_PORT` (default `21`)
- `FTP_USERNAME`
- `FTP_PASSWORD`
- `FTP_REMOTE_PATH` (default `/public_html` if unset)

## 3) Commands

Run from project root:

### First deploy (upload all local files)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy.ps1 -FirstRun
```

### Normal deploy (differential sync)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy.ps1
```

### Preview only (no upload changes)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy.ps1 -DryRun
```

### Mirror mode (dangerous: can delete remote files)
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\deploy.ps1 -DeleteRemote
```

Use `-DeleteRemote` only when you intentionally want remote files removed.

## 4) What gets excluded from deploy

The script excludes:
- `.git/`
- `.vscode/`
- `scripts/`
- `deploy-logs/`
- `.env*`
- `*.coreftp`
- `Thumbs.db`
- `desktop.ini`
- `.well-known/` (leave hosting SSL/verification files untouched)
- `nc_assets/` (leave existing site builder assets untouched)

## 5) Logs and validation

- Logs are saved in `deploy-logs/` with timestamps.
- After each run, verify:
  - first run uploaded all local site files,
  - second run uploads only modified/new files,
  - remote-only files are untouched unless `-DeleteRemote` is used.

## 6) Troubleshooting

- Authentication fails:
  - verify username/password in `.env.deploy.local`,
  - confirm account permissions on hosting.
- Connection fails:
  - verify host and port,
  - try `FTP_PROTOCOL=ftps` if plain FTP is blocked.
- Wrong folder updates:
  - adjust `FTP_REMOTE_PATH` (for example `/public_html` if needed).
