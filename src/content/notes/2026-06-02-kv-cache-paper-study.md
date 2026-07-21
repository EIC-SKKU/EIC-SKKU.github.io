---
title: "[Multimodal Study] Week 10: Video Summarization with Large Language Model"
date: 2026-06-02
summary: Our reading group spent a week on KV-cache compression — here's what we
  took away, including where we still disagree.
category: Paper Study
authors:
  - kyoungho-min
  - seongjun-park
  - jinheon-choi
  - yuna-lee
---
This week's reading group covered three recent KV-cache compression papers back to back. Summary below, plus the parts we're still arguing about.

## What they agree on

All three papers start from the same observation: attention weight is concentrated on a small, mostly-stable subset of tokens, so the KV cache can be pruned aggressively without much quality loss — as long as the *selection* of which tokens to keep is done carefully.

![Whiteboard diagram from the discussion](/images/publications/placeholder.svg)

## Where it gets interesting

The papers diverge on when token importance should be decided:

1. **Static, decided once at prefill.** Cheapest, but brittle for long generations where importance shifts.
2. **Recomputed periodically during decode.** More accurate, but the recompute cost eats into the latency win if done naively.
3. **Predicted ahead of time by a small auxiliary model.** Appealing on paper, unclear if it holds up outside the paper's own benchmark suite.

Our rough take: option 2 is the most honest tradeoff for now, but only if the recompute step is cheap enough to hide behind the decode step's own memory-bound latency — which none of the three papers measure directly.

> If anyone wants to actually benchmark the recompute overhead on our own serving stack, we have a slot open for it next sprint.

Next week: eviction policies for multi-turn conversations, which none of these papers touch at all.