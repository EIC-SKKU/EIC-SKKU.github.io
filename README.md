# EIC Lab Website

The official website of **EIC Lab** (Efficient & Intelligent Computing Laboratory) at Sungkyunkwan University, built with [Astro](https://astro.build) and deployed to GitHub Pages. The production domain is configured as [eic.skku.edu](https://eic.skku.edu); the external domain setup is described in [`docs/DOMAIN.md`](docs/DOMAIN.md).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Editing content

Pages CMS provides the visual content editor. Open
[`eic.skku.edu/admin/`](https://eic.skku.edu/admin/) after the domain switch and use an
authorized GitHub account. The editor is configured by `.pages.yml`; setup,
publishing, media, access, and recovery instructions are in
[`docs/CMS.md`](docs/CMS.md).

During the domain transition, editors can open [Pages CMS](https://app.pagescms.org/)
directly and select the `EIC-SKKU/EIC-SKKU.github.io` repository.

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

For welcome news, use the confirmed enrollment term (for example,
`date: 2026-03-01`) and add `datePrecision: month`. The News page shows **March**
under its year heading, while the homepage shows **March 2026**. The stored
first day is only for sorting. Other news keeps its full date by default. The
CMS exposes this as **Show date as**.

### Members — `src/content/members/`

```yaml
---
name: "Minjun Park"
role: phd            # professor | phd | msphd | ms | undergrad | alumni
gameEligible: true   # show this active member on the private /game page
image: "/images/members/minjun-park.svg"
interests: "LLM quantization, efficient inference systems"
links:               # optional; omit profiles the member does not have
  scholar: "https://scholar.google.com/citations?user=PROFILE_ID"
  linkedin: "https://www.linkedin.com/in/profile-id/"
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
Use **Professor profile** in Pages CMS to edit that biography, academic history,
and contact details; those faculty-only controls are omitted from the general
Members form. The underlying member file and author references stay unchanged.
Their `facultyTitle` can be `Assistant Professor`, `Associate Professor`, or
`Professor`; the section heading stays `Principal Investigator`. Their profile
pop-up includes `interests`, `education` entries (`degree`, `institution`, `year`),
and `experience` entries (`period`, `position`, `organization`), followed by contact
details. Keep education and experience in newest-first order.

Student pop-ups automatically include matching papers from the
Publications collection; `publications` can contain additional free-form entries.
The LinkedIn icon appears only when `links.linkedin` contains a full profile URL.
Leave it empty to hide the icon.

### Publications — `src/content/publications/`

Grouped by `year` (newest first), sorted by descending `order` within a year.
Order 1 is oldest; higher numbers are newer. Omit `order` for a new paper and the
build assigns the next number above the existing maximum using Git addition
history. Computed values stay out of the source files/CMS. The manual order
field is hidden in Pages CMS; an explicit frontmatter number can still be
supplied in GitHub when needed.

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
# order: 37         # optional; leave out for automatic numbering
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

**Domain setup:** keep *Settings → Pages → Source* set to **GitHub Actions**.
At the scheduled switch, set **Custom domain** to `eic.skku.edu`, then have the
SKKU DNS administrator replace its existing Google Sites CNAME with
`eic-skku.github.io`. Enable **Enforce HTTPS** once GitHub's certificate is ready.
See [`docs/DOMAIN.md`](docs/DOMAIN.md) for the exact records and handover steps.

The Astro `site` setting drives canonical URLs, social metadata, the sitemap,
and RSS links. `public/robots.txt` points to the same domain. This Actions
deployment does not use a `CNAME` file; the domain is configured in GitHub's
repository settings.
