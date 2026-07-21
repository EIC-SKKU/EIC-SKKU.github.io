# EIC Lab Website

The official website of **EIC Lab** (Efficient & Intelligent Computing Laboratory) at Sungkyunkwan University, built with [Astro](https://astro.build) and deployed to GitHub Pages at [eic-skku.github.io](https://eic-skku.github.io).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Editing content

Pages CMS provides the visual content editor. Open
[`eic-skku.github.io/admin/`](https://eic-skku.github.io/admin/) and use an
authorized GitHub account. The editor is configured by `.pages.yml`; setup,
publishing, media, access, and recovery instructions are in
[`docs/CMS.md`](docs/CMS.md).

All site content remains in `src/content/` as plain Markdown files with
frontmatter, one file per item. To edit manually, add, update, or remove the
matching `.md` file. CMS saves create normal Git commits and trigger the same
GitHub Pages deployment workflow.

### News — `src/content/news/`

The four most recent items are shown on the home page. The full news page opens
each item in a pop-up; optional images appear there as a swipeable slideshow.

```yaml
---
title: "Paper accepted to ICCAD 2026"
date: 2026-07-02
description: "One or two sentences shown under the title."
images:                         # optional; up to 10 images
  - "/images/news/iccad-team.webp"
  - "/images/news/iccad-talk.webp"
---

Optional full story written in Markdown. If omitted, the pop-up uses the
description above.
```

### Members — `src/content/members/`

```yaml
---
name: "Minjun Park"
role: phd            # professor | phd | msphd | ms | undergrad | alumni
gameEligible: true   # show this active member on the private /game page
image: "/images/members/minjun-park.svg"
interests: "LLM quantization, efficient inference systems"
links:               # shown on hover (desktop) / as buttons (mobile)
  about: "#"
  website: "#"
  scholar: "#"
order: 1             # sort position within the role section
---
```

Alumni entries skip `image`/`links` and use these instead:

```yaml
role: alumni
formerPosition: "M.S. Student (2023–2025)"
current: "Engineer, Samsung Electronics — Memory Division"
```

The professor's Markdown body (below the frontmatter) is rendered as a short bio.

### Publications — `src/content/publications/`

Grouped by `year` (newest first), sorted by `order` within a year.

```yaml
---
title: "Paper title"
authors: "First Author, Second Author, and Yulwha Kim"
venue: "Design Automation Conference"
venueShort: "DAC"    # small tag next to the venue
year: 2026
links:               # all optional — omit any you don't have
  paper: "#"
  code: "#"
  project: "#"
  doi: "#"
order: 1
---
```

### Gallery — `src/content/gallery/`

```yaml
---
title: "Spring Group Photo 2026"
image: "/images/gallery/group-photo-2026.svg"
category: "Group Photo"   # free text; filters are generated automatically
date: 2026-04-10
featured: true            # featured photos appear in the home page carousel
---
```

### Research areas — `src/content/research/`

The Markdown body is the team description (currently Lorem Ipsum placeholder).

```yaml
---
title: "Efficient AI"
icon: llm            # llm | eda | arch
tagline: "One-line summary shown on cards."
order: 1
---
```

Funded projects are managed in `src/content/projects/`. Longer event recaps,
paper studies, group studies, and resources are managed in
`src/content/notes/`. Both collections are available in Pages CMS.

## Images

Static images live in `public/images/` (`members/`, `gallery/`, `news/`,
`publications/`, and `notes/`).
Current member and gallery images are generated SVG placeholders — replace them
with real photos and update the matching paths. Member photos display square
(1:1), gallery photos display 4:3, and news slideshow images preserve their full
frame inside a 4:3 viewing area.

## Design

Colors, fonts, spacing, and shared styles are defined as CSS custom properties in [`src/styles/global.css`](src/styles/global.css). The palette derives from the lab logo: navy `#00265F` + charcoal `#303438`. Typography uses Inter, self-hosted via Fontsource.

Placeholder details to update when known: footer/contact email, phone, and room number.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys it to GitHub Pages.

**One-time setup:** in the GitHub repo, go to *Settings → Pages* and set **Source** to **GitHub Actions**. No custom domain is configured yet, so the site serves from the default `eic-skku.github.io` URL. To add one later, create `public/CNAME` with the domain and update `site` in `astro.config.mjs` to match.
