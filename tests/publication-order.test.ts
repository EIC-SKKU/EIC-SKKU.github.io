import assert from "node:assert/strict";
import test from "node:test";
import {
  comparePublicationsNewestFirst,
  resolvePublicationOrders,
} from "../src/lib/publication-order.ts";

const entry = (id: string, year: number, order?: number) => ({
  id,
  data: { year, order },
});

test("blank orders continue from the highest explicit value", () => {
  const result = resolvePublicationOrders([
    entry("old", 2023, 1),
    entry("latest", 2026, 36),
    entry("new-paper", 2026),
  ]);
  assert.deepEqual(result.map((paper) => paper.data.order), [1, 36, 37]);
});

test("multiple new papers use addition history, not collection iteration order", () => {
  const papers = [
    entry("second", 2026),
    entry("existing", 2026, 36),
    entry("first", 2026),
    entry("uncommitted", 2026),
  ];
  const added: Record<string, number> = { first: 100, second: 200 };
  const orders = (items: typeof papers) =>
    Object.fromEntries(
      resolvePublicationOrders(items, (paper) => added[paper.id] ?? 0)
        .map((paper) => [paper.id, paper.data.order])
    );
  assert.deepEqual(orders(papers), {
    existing: 36,
    first: 37,
    second: 38,
    uncommitted: 39,
  });
  assert.deepEqual(orders([...papers].reverse()), orders(papers));
});

test("new later additions preserve earlier automatic numbers", () => {
  const existing = [entry("seed", 2026, 36), entry("first", 2026)];
  const added: Record<string, number> = { first: 100, second: 200 };
  const original = resolvePublicationOrders(existing, (paper) => added[paper.id]);
  const later = resolvePublicationOrders(
    [...existing, entry("second", 2026)],
    (paper) => added[paper.id]
  );
  assert.equal(original.find((paper) => paper.id === "first")?.data.order, 37);
  assert.equal(later.find((paper) => paper.id === "first")?.data.order, 37);
  assert.equal(later.find((paper) => paper.id === "second")?.data.order, 38);
});

test("a history-free checkout resolves deterministically without mutating source data", () => {
  const papers = [entry("zeta", 2026), entry("alpha", 2026)];
  papers.forEach((paper) => { Object.freeze(paper.data); Object.freeze(paper); });
  Object.freeze(papers);
  const result = resolvePublicationOrders(papers);
  assert.deepEqual(result.map((paper) => [paper.id, paper.data.order]), [["zeta", 2], ["alpha", 1]]);
  assert.equal(papers[0].data.order, undefined);
  assert.equal(papers[1].data.order, undefined);
});

test("higher order comes first within a year while year groups remain chronological", () => {
  const sorted = [
    entry("newer-addition-old-year", 2018, 37),
    entry("older-this-year", 2026, 34),
    entry("newer-this-year", 2026, 36),
    entry("last-year", 2025, 29),
  ].sort(comparePublicationsNewestFirst);
  assert.deepEqual(sorted.map((paper) => paper.id), [
    "newer-this-year", "older-this-year", "last-year", "newer-addition-old-year",
  ]);
});
