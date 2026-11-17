# Kat Team Events website — reference for other chats

Use this file with @PROJECT-REFERENCE.md when continuing work in a new chat.

## Location

`c:\Users\ACER\Desktop\Kat Team Events website` — static site (HTML, CSS, vanilla JS), no build step.

## FTP deploy (WinSCP + PowerShell)

| Item | Details |
|------|---------|
| Script | `scripts\deploy.ps1` |
| WinSCP template | `scripts\deploy.winscp.txt` |
| Config | Copy `.env.deploy.example` → **`.env.deploy.local`** (secret; gitignored). Variables: `FTP_PROTOCOL`, `FTP_HOST`, `FTP_PORT`, `FTP_USERNAME`, `FTP_PASSWORD`, `FTP_REMOTE_PATH`. |
| Remote root | `/public_html/` (script adds trailing `/` if missing so WinSCP treats path as a directory). |
| Command | From project root: `powershell -ExecutionPolicy Bypass -File .\scripts\deploy.ps1` |
| `-FirstRun` | Full `put` of site files (use for first deploy or intentional full push). |
| Default | Differential sync (changed/new files only). |
| `-DryRun` | Preview only. |
| `-DeleteRemote` | Can delete remote files not present locally — **off by default**; use only for intentional mirroring. |
| WinSCP install | Standard paths + `%LOCALAPPDATA%\Programs\WinSCP\WinSCP.com` (winget install). |
| Excludes | `.git/`, `.vscode/`, `scripts/`, `deploy-logs/`, `.env*`, `*.coreftp`, `Thumbs.db`, `desktop.ini`, `.well-known/`, `nc_assets/` |

### Important: `Images/` vs `images/`

- On disk the folder may be **`images`** (lowercase). WinSCP on Windows often syncs it to the server as **`Images/`**.
- **`index.html` uses `Images/...` in URLs** so Linux hosting (case-sensitive) matches the deployed tree.

### Docs & logs

- **`DEPLOY.md`** — full instructions and troubleshooting.
- **`deploy-logs\`** — timestamped WinSCP logs per run.

## Media performance (implemented)

| Piece | Path / behavior |
|-------|------------------|
| Hero background video | `video/hero-banner-720p.mp4` (~720p, short loop, faststart, no audio). |
| Hero background poster | `Images/hero-banner-poster.webp` — `poster` + `preload="metadata"` + `fetchpriority="high"` on hero `<video>`. |
| Hero side / promo video | `video/hero-promo-loop.mp4` + `Images/hero-promo-poster.webp`. |
| Gallery carousel | Thumbs: `Images/Gallery/thumbs/Image-1.webp` … `Image-17.webp` (~1000px WebP). |
| Gallery full size | Originals still under `Images/Gallery/` (e.g. `Image 1.jpg`, `Image 14.JPG`). |
| Lightbox | `gallery-lightbox.js`: carousel code + click handler on `img[data-full-src]` opens `#gallery-lightbox`; Escape / backdrop closes. |
| Audit snapshot | `media-performance-audit.txt` — original vs generated file sizes. |
| Encoding | Done with **FFmpeg** (e.g. H.264 `-movflags +faststart`, WebP thumbs). |

**Artist section videos** still point at full files: `video/DJ Kat.mp4`, `Diana Onofrei.mp4`, `MC Iulian Arama.mp4` (large sources may remain on server until manually cleaned up).

## Audio

- Hero background: `hero-audio.js` + `<audio id="heroBackgroundAudio" preload="none">`.
- Schedule section: `schedule.js` + `<audio id="scheduleBackgroundAudio" preload="none">` with `audio.load()` when section enters view before `play()`.

## Other scripts (headline)

- `lang-switcher.js`, `welcome.js`, `schedule.js`, `gallery-typing.js`, `hero-audio.js`, `logo-animation.js`, `mobile-nav.js`, etc. — loaded from `index.html` in order.

## Security note

FTP password has appeared in shell history during assisted deploys. Prefer **`.env.deploy.local`** only, and rotate the FTP password in hosting if it was ever shared in chat or logs.
