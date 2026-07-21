---
title: "ERASE: Eliminating Redundant Visual Tokens via Adaptive Two-Stage Token
  Pruning"
authors: Yuna Lee, Kyoungho Min, Yulhwa Kim⁺
venue: arXiv preprint arXiv:2605.09982
venueShort: arXiv
year: "2026"
preprint: true
area: efficient-ai
abstract: Recent advancements in Vision-Language Models (VLMs) enable large
  language models (LLMs) to process high-resolution images, significantly
  improving real-world multimodal understanding. However, this capability
  introduces a large number of vision tokens, resulting in substantial
  computational overhead. To mitigate this issue, various vision token pruning
  methods have been proposed. Nevertheless, existing approaches predominantly
  rely on learned semantic features within the model to capture visual
  redundancy. Moreover, they lack adaptive mechanisms to adjust pruning
  strategies according to the complexity of the input image. In this paper, we
  propose ERASE, a two-stage vision token pruning framework that identifies and
  retains salient tokens through pruning strategies adaptive to image
  complexity. Experiment results demonstrate that ERASE significantly reduces
  vision tokens while preserving accuracy. For Qwen2.5-VL-7B, at a token pruning
  ratio of 85%, ERASE retains 89.46% of the original model accuracy, whereas the
  best prior method retains only 78.1%.
image: /images/publications/imgjuly-21-54.png
links:
  paper: https://arxiv.org/abs/2605.09982
  code: https://github.com/Tuna-Luna/ERASE
order: 1
---
