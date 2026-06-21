# Pakistan Swedish Institute of Technology — Website

A redesigned static website for PSIT, Landhi, Karachi. Plain HTML/CSS/JS — no build step, no framework, no server required to run it.

## What's inside

```
index.html                       Homepage
departments/                     One page per department
  cit.html
  electrical.html
  mechanical.html
  related-studies.html
  graphic-and-printing.html
  garments.html
  civil.html
assets/
  css/style.css                  All styling
  js/site.js                     Navigation, carousels, tabs, gallery
  img/                           Campus and gallery photography
  img/dept/                      Department-specific photography
```

## Viewing it locally

Just open `index.html` in a browser — there is no build process. For the best results (so relative paths behave exactly as they will in production), serve it from a local web server rather than opening the file directly:

```
cd path/to/this/folder
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploying it live

This is a static site, so it will run on virtually any web host:

- **Shared hosting / cPanel** — upload the entire contents of this folder to `public_html` (or your site root) via FTP/File Manager.
- **Netlify / Vercel / GitHub Pages** — drag-and-drop this folder, or connect a Git repository containing it. No build command is needed; the publish directory is the project root.
- **Government / institutional server** — copy the folder to the web root of an Apache or Nginx server. No special server modules are required.

There is nothing to install and no environment variables to configure.

## Updating content

- **Text** — edit the relevant `.html` file directly. Each department page is self-contained.
- **Photos** — replace the image file in `assets/img/` (or `assets/img/dept/`) with a new file of the *same name*, or add a new file and update the `src=` path in the HTML.
- **Faculty / scheme of studies** — these are plain HTML tables and definition lists inside each department page; edit the rows directly.
- **Contact details, social links, map** — found in the "Contact" section at the bottom of `index.html`.

## Notes on content accuracy

A few small corrections were made from the original materials during this redesign:

- The **Related/General Studies** department page previously displayed an Electrical Engineering curriculum and a biography that did not match its head of department's name. This has been corrected to show only genuinely general-education subjects, with a name-accurate (if brief) biography.
- A few head-of-department biographies elsewhere referenced a different person's name than the one listed (a copy-paste artifact from the original files) — these have been corrected to refer consistently to the named person.
- The Mechanical department's faculty list had a few teachers duplicated; duplicates were removed.

If any of these individuals' actual details differ from what's shown, please update the relevant `<dl>` entry in that department's HTML file.

## Browser support

Built with standard, broadly-supported CSS and JS (flexbox, grid, `aspect-ratio`). Works in all current versions of Chrome, Edge, Firefox and Safari, and is responsive down to small mobile screens.
