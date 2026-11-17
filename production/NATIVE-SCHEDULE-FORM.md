# Native schedule booking (PHP on your host)

Use this when you want booking requests handled **on your own site** instead of Formspree.

## Why PHP

The modal cannot send email from the browser alone. With PHP available on your FTP/`public_html` hosting, a small script on the same domain accepts the POST and sends you an email.

## Flow

1. User submits the schedule modal.
2. `schedule.js` POSTs form data to `schedule-submit.php` (same origin).
3. PHP validates input, sends mail, returns JSON `{ "ok": true }` or an error.
4. Existing success UI in the modal runs when the response is OK.

## Files to add

### `schedule-submit.php` (site root, next to `index.html`)

- Read POST: `date`, `name`, `email`, `phone`, `message`, optional `_subject` (ignore or use for email subject line).
- Optional **honeypot** field (e.g. `website`): hidden with CSS; if filled, return 400 without sending (spam bots).
- Validate:
  - `name` and `email` required; email format sanity check.
  - `date` must match `YYYY-MM-DD`.
  - Reasonable max lengths on all fields.
- Set header: `Content-Type: application/json`.
- On success: `http_response_code(200); echo json_encode(['ok' => true]);`
- On error: appropriate 4xx + `json_encode(['error' => 'message'])`.
- Send email with PHP **`mail()`** first. Set **Reply-To** to the customer’s email so you can reply in one click.
- **Include** a local config file for secrets (see below).

### `schedule-config.local.php` (create on your machine, upload with deploy)

Do not commit real addresses if you use git. Example shape:

```php
<?php
return [
    'to' => 'you@yourdomain.com',
    'from' => 'noreply@yourdomain.com', // must be allowed by host
    'subject_prefix' => 'Schedule request – Kat Team Events',
];
```

`schedule-submit.php` should `require` or `include` this file and read the array. If the file is missing, return a clear JSON error so you notice misconfiguration.

## Front-end changes

### `index.html`

Find the schedule form (`id="scheduleBookingForm"`). Set:

```html
action="schedule-submit.php"
```

Remove the Formspree URL (`https://formspree.io/f/YOUR_FORM_ID`).

Optional: add a honeypot input (name e.g. `website`), `tabindex="-1"`, `autocomplete="off"`, and hide it in CSS (class already used for “screen reader only” or add `.schedule-form__hp { position:absolute;left:-9999px; }`).

### `schedule.js`

Remove the check that blocks submit when `action` contains `YOUR_FORM_ID`. Keep using `fetch(action, { method: 'POST', body: fd, headers: { Accept: 'application/json' } })`.

Parse JSON on response: if body has `ok`, treat as success; if `error`, show it or a generic message.

## Deploy

Upload:

- `schedule-submit.php`
- `schedule-config.local.php` (with real `to` / `from`)
- Updated `index.html`, `schedule.js`, and `style.css` if you added honeypot styles

Use your usual process ([DEPLOY.md](./DEPLOY.md)).

## After go-live

- Test from the **live** URL (not only `file://`).
- If mail never arrives, check spam and your host’s docs; some hosts require SMTP instead of `mail()`—that can be a second step (e.g. PHPMailer + SMTP).

## Booked dates (unchanged)

Which days show as available vs booked is still controlled in `schedule.js` (`BOOKED_DATES` or `BOOKED_DATES_SOURCE_URL`). See [SCHEDULE-UPDATE.md](./SCHEDULE-UPDATE.md).
