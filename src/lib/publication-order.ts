export interface PublicationOrderEntry {
  id: string;
  data: {
    year: number;
    order?: number;
  };
}

export type OrderedPublication<T extends PublicationOrderEntry> = T & {
  data: T["data"] & { order: number };
};

/** Higher numbers are newer; keep publication years newest first as well. */
export const comparePublicationsNewestFirst = (
  a: PublicationOrderEntry,
  b: PublicationOrderEntry
) =>
  b.data.year - a.data.year ||
  (b.data.order ?? 0) - (a.data.order ?? 0) ||
  a.id.localeCompare(b.id);

/**
 * Blank CMS orders are assigned after the highest explicit number at build
 * time. Git addition history keeps consecutive additions in the same order
 * across builds. Uncommitted files come last, with filenames breaking ties.
 * This does not write the computed values back into the Markdown files.
 */
export function resolvePublicationOrders<T extends PublicationOrderEntry>(
  entries: readonly T[],
  addedAt: (entry: T) => number = () => 0
): OrderedPublication<T>[] {
  const maximum = Math.max(0, ...entries.map((entry) => entry.data.order ?? 0));
  const pending = entries
    .filter((entry) => entry.data.order === undefined)
    .map((entry) => ({ entry, added: addedAt(entry) || Number.POSITIVE_INFINITY }))
    .sort((a, b) => a.added - b.added || a.entry.id.localeCompare(b.entry.id));
  const assigned = new Map(
    pending.map(({ entry }, index) => [entry.id, maximum + index + 1])
  );

  return entries.map((entry) => ({
    ...entry,
    data: {
      ...entry.data,
      order: entry.data.order ?? assigned.get(entry.id)!,
    },
  }));
}
