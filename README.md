# "Islamec Center" Website

Professional project README with testing and GitHub Pages deployment instructions.

---

## Project Overview
- **Name:** Islamec Center
- **Type:** Static website (HTML / CSS / JS)
- **Important files:** `index.html` at the repository root; assets in `css/`, `js/`, `Images/`, `webfonts/`.

## What I fixed / prepared
- Added `data-time="HH:MM"` attributes to the time elements (`<div class="time">`) so `js/js.js` can read the schedule.
- Fixed the script path in `index.html` to load `js/js.js`.
- Fixed a mismatched closing `</div>` in the "Contact" section that caused an HTML syntax error.

## Folder structure (summary)
- `index.html` — main page (must remain in repository root)
- `css/` — stylesheets (`all.min.css`, `style.css`)
- `js/` — JavaScript files (`js.js`)
- `Images/` — site images
- `webfonts/` — web fonts (if used)

## Pre-publish checklist
- Make sure `index.html` is in the repository root.
- Confirm file paths are correct (case-sensitive on GitHub):
  - Script: `<script src="js/js.js"></script>`
  - CSS: `css/style.css` and `css/all.min.css`
  - Images: files under `Images/` with the exact names used in the HTML
- Ensure every `<div class="time">` includes a `data-time="HH:MM"` attribute using 24-hour format (e.g. `04:19`, `16:18`).

## Quick local test (PowerShell on Windows)
1. Open PowerShell in the project folder (`e:\مشاريع\css&html\Islamec Center`).
2. Start a simple local server with Python 3:

```powershell
python -m http.server 5500
```

3. Open your browser at `http://localhost:5500` and check:
- The page renders correctly
- The countdown (remaining time) shows for the next prayer inside `.time` elements
- Open DevTools Console — no JS errors or 404s (missing files)

Alternative if Python is not available:
- If you have Node.js installed: `npx http-server -p 5500`
- Or use the Live Server extension in VS Code.

## Deploy to GitHub Pages
1. Create a new repository on GitHub and push your project files. Example commands:

```powershell
git init
git add .
git commit -m "Initial site upload"
git branch -M main
git remote add origin https://github.com/<username>/<repo>.git
git push -u origin main
```

2. On GitHub: go to Settings → Pages, select branch `main` and folder `/ (root)`, then Save/Publish.
3. After a few minutes your site will be available at `https://<username>.github.io/<repo>/` (or at the root if the repo is `username.github.io`).

## Pre-publish checklist (short)
- [ ] `index.html` in root
- [ ] `js/js.js` exists and script path is correct
- [ ] All images exist in `Images/` and names match (case-sensitive)
- [ ] `data-time` present for all `.time` elements
- [ ] No Console errors when testing locally
- [ ] `webfonts/` included if fonts are used

## Troubleshooting
- 404 for images/CSS/JS: check file name, path and case sensitivity.
- Countdown not working: open DevTools Console for errors; ensure `.time` elements have `data-time` in `HH:MM` format.
- HTML errors: use an HTML validator or check for mismatched/missing closing tags.

## Notes
- GitHub Pages is case-sensitive for file paths.
- To use a custom domain, add a `CNAME` file to the repository root.

## License & Author
- Author: MOHAMMED AL-NATSHA
- Copyright: all rights reserved (add a license like `MIT` if you want to open-source)

---

If you want I can also:
- Add a `.gitignore` file to exclude IDE files and dependencies.
- Run a local server and report Console errors.
- Help create the GitHub repository and push the site (I will need your GitHub username and repo name or permission to create it).

Choose one: "run local test", "add .gitignore", or "push to GitHub" and I'll proceed.