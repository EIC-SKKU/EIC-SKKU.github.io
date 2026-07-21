import type { CollectionEntry } from "astro:content";

export interface MatchedMember {
  id: string;
  name: string;
  image?: string;
  role: string;
}

export interface ResolvedAuthor {
  name: string;
  member?: MatchedMember;
}

export interface MemberDisambiguation {
  /** Added only when equal names also share a role. */
  sameRoleOrdinal?: number;
}

export const normalizeAuthorName = (name: string) =>
  name
    .replace(/[*⁺]+$/, "") // equal-contribution / corresponding-author marks
    .replace(/\s*\(Example\)$/, "")
    .trim()
    .toLowerCase();

export const isAuthorSeparator = (part: string) =>
  /^,?\s*(and)?\s*$/i.test(part.trim());

/** split an author string into names + separators (", " / " and ") */
export const splitAuthors = (authors: string) =>
  authors.split(/(,\s*and\s+|,\s*|\s+and\s+)/);

/** Pages CMS stores Note authors by stable member entry ID (the Markdown
    filename without its extension). Accept full paths too, so manual
    references remain easy to recover. */
export const normalizeMemberReference = (reference: string) =>
  reference.trim().split("/").at(-1)?.replace(/\.md$/i, "") ?? reference;

const toMatchedMember = (
  member: CollectionEntry<"members">
): MatchedMember => ({
  id: member.id,
  name: member.data.name,
  image: member.data.image,
  role: member.data.role,
});

/** Resolve a stable member ID first, then fall back to a unique display name
    for Notes created before ID-backed references were introduced. */
export const resolveMemberReference = (
  reference: string,
  membersByName: Map<string, MatchedMember>,
  membersById: Map<string, CollectionEntry<"members">>
) => {
  const byId = membersById.get(normalizeMemberReference(reference));
  return byId
    ? toMatchedMember(byId)
    : membersByName.get(normalizeAuthorName(reference));
};

export const resolveAuthorReferences = (
  references: string[],
  membersByName: Map<string, MatchedMember>,
  membersById: Map<string, CollectionEntry<"members">>
): ResolvedAuthor[] =>
  references.map((reference) => {
    const member = resolveMemberReference(reference, membersByName, membersById);
    return {
      name: member?.name ?? reference,
      member,
    };
  });

/** Build stable, display-only qualifiers for duplicate member names. A role
    distinguishes most duplicates; equal names in the same role also get an
    ordinal derived from their stable file IDs. */
export const buildMemberDisambiguation = (
  allMembers: CollectionEntry<"members">[]
) => {
  const nameCounts = new Map<string, number>();
  const roleGroups = new Map<string, CollectionEntry<"members">[]>();

  for (const member of allMembers) {
    const nameKey = normalizeAuthorName(member.data.name);
    const roleKey = `${nameKey}:${member.data.role}`;
    nameCounts.set(nameKey, (nameCounts.get(nameKey) ?? 0) + 1);
    roleGroups.set(roleKey, [...(roleGroups.get(roleKey) ?? []), member]);
  }

  const byMemberId = new Map<string, MemberDisambiguation>();
  for (const group of roleGroups.values()) {
    const nameKey = normalizeAuthorName(group[0].data.name);
    if ((nameCounts.get(nameKey) ?? 0) < 2) continue;

    const sorted = [...group].sort((a, b) => a.id.localeCompare(b.id));
    sorted.forEach((member, index) => {
      byMemberId.set(member.id, {
        sameRoleOrdinal: sorted.length > 1 ? index + 1 : undefined,
      });
    });
  }

  return byMemberId;
};

/** looked up by normalized name — lets pages tell lab members apart from
    external names and link/avatar the former. if two members share the
    exact same name, there's no way to tell from plain text which one is
    meant, so both are left out — safer unlinked than confidently wrong. */
export const buildMemberMaps = (allMembers: CollectionEntry<"members">[]) => {
  const memberDisambiguation = buildMemberDisambiguation(allMembers);

  const membersByName = new Map<string, MatchedMember>();
  const membersById = new Map<string, CollectionEntry<"members">>();
  for (const m of allMembers) {
    const key = normalizeAuthorName(m.data.name);
    membersById.set(m.id, m);
    if (memberDisambiguation.has(m.id)) continue;
    membersByName.set(key, toMatchedMember(m));
  }

  return { membersByName, membersById, memberDisambiguation };
};
