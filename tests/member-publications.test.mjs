import assert from "node:assert/strict";
import { test } from "node:test";
import { buildMemberPublications } from "../src/lib/member-publications.ts";

const member = (id, name, role = "ms") => ({ id, data: { name, role } });
const publication = (id, authors) => ({ id, data: { authors } });
const ids = (map, memberId) => map.get(memberId).map((paper) => paper.id);

test("matches full author names, strips contribution marks, and deduplicates coauthors", () => {
  const members = [
    member("yuna", "Yuna Lee"),
    member("kyoungho", "Kyoungho Min"),
    member("ann", "Ann Kim"),
  ];
  const paper = publication(
    "paper",
    "YUNA LEE*, Kyoungho Min⁺, Yuna Lee, and Annabelle Kim"
  );
  const result = buildMemberPublications(members, [paper]);

  assert.deepEqual(ids(result, "yuna"), ["paper"]);
  assert.deepEqual(ids(result, "kyoungho"), ["paper"]);
  assert.deepEqual(ids(result, "ann"), []);
});

test("does not attribute publications to ambiguous names, even across different roles", () => {
  const members = [
    member("minjun-ms", "Minjun Kim", "ms"),
    member("minjun-phd", "Minjun Kim", "phd"),
    member("jiyoon-a", "Jiyoon Kim"),
    member("jiyoon-b", "Jiyoon Kim"),
    member("seungmin", "Seungmin Kim"),
  ];
  const result = buildMemberPublications(members, [
    publication("paper", "Minjun Kim, Jiyoon Kim, Seungmin Kim⁺"),
  ]);

  for (const id of ["minjun-ms", "minjun-phd", "jiyoon-a", "jiyoon-b"]) {
    assert.deepEqual(ids(result, id), []);
  }
  assert.deepEqual(ids(result, "seungmin"), ["paper"]);
});

test("preserves supplied publication order and includes empty profiles without mutating inputs", () => {
  const members = [member("mingun", "Mingun Kim"), member("jacob", "Jacob Morton")];
  const papers = [
    publication("newest", "Mingun Kim"),
    publication("external", "An External Author"),
    publication("older", "Mingun Kim* "),
  ];
  const before = structuredClone({ members, papers });
  const result = buildMemberPublications(members, papers);

  assert.deepEqual(ids(result, "mingun"), ["newest", "older"]);
  assert.deepEqual(ids(result, "jacob"), []);
  assert.deepEqual({ members, papers }, before);
  assert.equal(result.get("mingun")[0], papers[0]);
});
