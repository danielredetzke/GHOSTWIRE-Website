# GHOSTWIRE Website

The one-page website for [GHOSTWIRE](https://github.com/danielredetzke/GHOSTWIRE),
the self-hosted WireGuard server manager, served at
[ghostwi.re](https://ghostwi.re).

It is plain static HTML, CSS and a small script: no build step, no framework,
no tracking, and no requests to other sites.

## Files

| File | Purpose |
| --- | --- |
| `index.html` | The page, with title, description, Open Graph and JSON-LD metadata |
| `site.css` | Styles, using the same colours and type as the GHOSTWIRE web interface |
| `site.js` | Copy buttons for the install commands, and the latest release number |
| `dashboard.png` | Dashboard screenshot of the current release |
| `og.png` | Preview image for links shared on social sites and in chats |
| `favicon.svg`, `apple-touch-icon.png` | Icons |
| `ShipporiMinchoB1-ExtraBold.woff2` | The wordmark's font, under the SIL Open Font License (`OFL-ShipporiMincho.txt`) |
| `robots.txt`, `sitemap.xml` | For search engines |

## Server

nginx serves the files and adds two routes that are not in this repository:

- `/install` redirects to `install.sh` on GitHub's main branch, so
  `curl -fsSL https://ghostwi.re/install | sh` always fetches the current
  script.
- `/latest.json` forwards GitHub's latest GHOSTWIRE release. `site.js` reads
  `tag_name` from it for the version badge, so the page makes no requests to
  other sites.
