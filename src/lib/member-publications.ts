import type { CollectionEntry } from "astro:content";
import {
  buildMemberMaps,
  isAuthorSeparator,
  normalizeAuthorName,
  splitAuthors,
} from "./authors.ts";

/** Match complete author names to unique member names. The supplied publication
 * order is retained, so every profile uses the same newest-first order. */
export const buildMemberPublications = (
  allMembers: CollectionEntry<"members">[],
  publications: CollectionEntry<"publications">[]
): Map<string, CollectionEntry<"publications">[]> => {
  const { membersByName } = buildMemberMaps(allMembers);
  const byMemberId = new Map<string, CollectionEntry<"publications">[]>(
    allMembers.map((member) => [member.id, []])
  );

  for (const publication of publications) {
    const authorIds = new Set<string>();
    for (const part of splitAuthors(publication.data.authors)) {
      if (isAuthorSeparator(part)) continue;
      const member = membersByName.get(normalizeAuthorName(part.trim()));
      if (member) authorIds.add(member.id);
    }
    for (const memberId of authorIds) {
      byMemberId.get(memberId)!.push(publication);
    }
  }

  return byMemberId;
};
