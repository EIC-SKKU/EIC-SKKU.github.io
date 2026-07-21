import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/**
 * Content collections — every entry is a plain Markdown file with
 * frontmatter, so the site stays friendly to git-based CMS editing
 * (Decap / Sveltia / etc.). To add an item, drop a new .md file into
 * the matching folder under src/content/.
 */

const news = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/news" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    images: z.array(z.string()).default([]),
  }),
});

const members = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/members" }),
  schema: z.object({
    name: z.string(),
    role: z.enum(["professor", "phd", "msphd", "ms", "undergrad", "alumni"]),
    /** controls whether this active member appears in the private roulette */
    gameEligible: z.boolean().default(true),
    /** program/track note shown after the position, e.g. "SSIT" */
    track: z.string().optional(),
    /** current lab lead — shown with a badge on their member card */
    labLead: z.boolean().default(false),
    /** major/department, shown in the About pop-up, e.g. "Computer Science" */
    major: z.string().optional(),
    image: z.string().optional(),
    interests: z.string().optional(),
    /** rough description of what they're working on right now */
    currentResearch: z.string().optional(),
    /** free-form publication entries shown in the member pop-up */
    publications: z.array(z.string()).default([]),
    email: z.string().optional(),
    links: z
      .object({
        about: z.string().optional(),
        website: z.string().optional(),
        scholar: z.string().optional(),
        orcid: z.string().optional(),
        dblp: z.string().optional(),
        cv: z.string().optional(),
      })
      .default({}),
    /** alumni only */
    formerPosition: z.string().optional(),
    current: z.string().optional(),
    order: z.number().default(99),
  }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    venueShort: z.string().optional(),
    /** groups the entry under Conference/Journal/Workshop; falls back to a
        guess from the venue text when unset */
    venueType: z.enum(["conference", "journal", "workshop"]).optional(),
    year: z.coerce.number(),
    /** true = shown in the Pre-Print section above the year groups */
    preprint: z.boolean().default(false),
    /** research area id (research collection filename) — links the paper
        to its card on the research page */
    area: z.string().optional(),
    /** shown in the publications page pop-up. papers without an abstract
        stay plain text (not clickable) — only "selected" ones get the pop-up */
    abstract: z.string().optional(),
    /** representative figure shown in the pop-up */
    image: z.string().optional(),
    links: z
      .object({
        paper: z.string().optional(),
        code: z.string().optional(),
        project: z.string().optional(),
        doi: z.string().optional(),
      })
      .default({}),
    order: z.number().default(99),
  }),
});

const gallery = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/gallery" }),
  schema: z.object({
    title: z.string(),
    /** main/cover image — shown in the grid and the home carousel */
    image: z.string(),
    /** extra photos for the event: repo uploads */
    images: z.array(z.string()).default([]),
    /** extra photos for the event: external URLs (saves repo storage) */
    imageLinks: z.array(z.string()).default([]),
    category: z.string(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
  }),
});

const research = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/research" }),
  schema: z.object({
    title: z.string(),
    icon: z.string().default("chip"),
    tagline: z.string().optional(),
    order: z.number().default(99),
  }),
});

/** ongoing funded research projects (과제) shown on the research page */
const projects = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    /** funding agency or company, e.g. IITP, NRF, 삼성전자 */
    funder: z.string(),
    /** project period, e.g. "2024.04 – 2027.12" */
    period: z.string(),
    order: z.number().default(99),
  }),
});

/** notes: longer-form writeups that don't fit News (too informal/personal) or
    Gallery (more than just photos) — event recaps, paper/group-study notes,
    presentation/template archives (자료실), etc. Body supports images
    inserted between paragraphs via normal markdown. */
const notes = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    /** short teaser shown on the notes list page */
    summary: z.string(),
    category: z.string().optional(),
    /** shown on the list page and at the top of the post */
    coverImage: z.string().optional(),
    /** authors of this post, in display order — matched against the members
        collection to show a linked, ordered byline + avatar pop-ups.
        Paper/group-study posts should always list their participants here. */
    authors: z.array(z.string()).default([]),
  }),
});

export const collections = {
  news,
  members,
  publications,
  gallery,
  research,
  projects,
  notes,
};
