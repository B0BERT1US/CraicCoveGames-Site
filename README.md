# CraicCove Games website

Static site built with Eleventy, hosted on GitHub Pages, edited through Pages CMS.

- Live site: built from the `main` branch (root of the domain, or /repo-name/ until a domain is attached)
- Preview site: built from the `preview` branch, served at `/preview/`
- Edit at https://app.pagescms.org (log in with GitHub, pick this repo)
- Publish: the "Publish preview to live site" button in Pages CMS, or run the
  "Publish preview to live site" workflow in the Actions tab

## Where things live

| What | File |
| --- | --- |
| Home page text | `src/_data/home.json` |
| Identity Protocol page text | `src/_data/game.json` |
| Email, links, logo, form IDs | `src/_data/site.json` |
| News posts | `src/posts/*.md` |
| Images | `src/assets/img/` |
| Colours and fonts | `src/assets/css/style.css` |
| Page layouts | `src/_includes/`, `src/*.html` |

## Run it on your own computer (optional)

```
npm install
npm start
```

Then open http://localhost:8080
