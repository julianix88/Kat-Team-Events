# KAT Team Events

The website source is in **`production/`**. Edit files there, including
`production/index.html`, `production/style.css`, and `production/schedule.js`.

## Production deployment

The `main` branch is the production branch for https://katteamevents.com.
Coolify builds the Git-based Docker Compose application from
`ops/coolify/compose.git.yaml`, using `ops/vps/Dockerfile`.
Pushes to `main` trigger deployment once the repository webhook is configured.
Other branches do not update the public website.

The PHP image, private runtime mounts, resource limits, and booking proxy must
be preserved. Credentials and runtime configuration are kept outside Git.
The older fixed-image Compose files are retained for operational rollback;
they are not the automatic deployment definition.

## Videos

Install Git LFS before cloning or updating this repository:

```sh
git lfs install
git clone git@github.com:julianix88/Kat-Team-Events.git
cd Kat-Team-Events
git lfs pull
```

Files in `production/video/*.mp4` use Git LFS. Coolify must have Git LFS enabled
so the deployed site contains the videos, rather than LFS pointer files.

Do not commit `.env` files, private keys, FTP profiles, or private PHP settings.
