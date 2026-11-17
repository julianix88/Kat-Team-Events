# Updating the Schedule (Booked Dates) From the Web

You can manage which dates are **booked** or **available** in two ways.

---

## Option 1: Edit a Google Sheet (no code)

1. **Create a Google Sheet** (e.g. “Kat Team – Booked dates”).
2. In the first column, put one date per row in this format: **YYYY-MM-DD**
   - Example: `2025-03-15` for 15 March 2025.
   - You can use a header in row 1 (e.g. “Date”) – it will be ignored.
3. **Publish the sheet:**
   - **File → Share → Publish to web**
   - Choose the sheet (e.g. “Sheet1”), format **CSV**
   - Click **Publish** and copy the link (it looks like  
     `https://docs.google.com/spreadsheets/d/.../export?format=csv&gid=0`).
4. **Connect the website to the sheet:**
   - Open **schedule.js** in a text editor.
   - Find the line: `var BOOKED_DATES_SOURCE_URL = '';`
   - Paste your CSV link between the quotes, for example:  
     `var BOOKED_DATES_SOURCE_URL = 'https://docs.google.com/spreadsheets/d/ABC123.../export?format=csv&gid=0';`
   - Save the file and upload the updated **schedule.js** to your site.

After that, **any change you make in the Google Sheet** (add or remove a date, save) will be reflected on the website the next time someone loads or refreshes the Schedule page. You don’t need to edit the code again.

---

## Option 2: Edit the code (schedule.js)

If you prefer not to use a Google Sheet:

- Leave **BOOKED_DATES_SOURCE_URL** as: `var BOOKED_DATES_SOURCE_URL = '';`
- Edit the **BOOKED_DATES** list at the top of **schedule.js**: add or remove dates in `'YYYY-MM-DD'` format.

---

## Summary

| What you want              | What to do                                                                 |
|----------------------------|----------------------------------------------------------------------------|
| Change dates from the web  | Use **Option 1**: set `BOOKED_DATES_SOURCE_URL` to your sheet’s CSV link.  |
| Change dates in the code   | Use **Option 2**: edit the `BOOKED_DATES` array in **schedule.js**.         |
