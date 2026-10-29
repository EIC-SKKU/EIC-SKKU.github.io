import { getCollection } from "astro:content";
import { execFileSync } from "node:child_process";
import { resolvePublicationOrders, comparePublicationsNewestFirst } from "./publication-order";

export { comparePublicationsNewestFirst } from "./publication-order";

const additionTimes = new Map<string, number>();

/** Full history is available in deployment so edits do not change recency. */
export function publicationAddedAt(filePath?: string): number {
  if (!filePath) return 0;
  const cached = additionTimes.get(filePath);
  if (cached !== undefined) return cached;

  let added = 0;
  try {
    const stamps = execFileSync(
      "git",
      ["log", "--follow", "--diff-filter=A", "--format=%ct", "--", filePath],
      { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }
    ).trim();
    const first = stamps.split("\n").at(-1);
    added = first ? Number(first) : 0;
  } catch {
    // Archives without Git history still receive deterministic filename ties.
  }
  additionTimes.set(filePath, added);
  return added;
}

export async function getOrderedPublications() {
  return resolvePublicationOrders(
    await getCollection("publications"),
    (publication) => publicationAddedAt(publication.filePath)
  ).sort(comparePublicationsNewestFirst);
}
