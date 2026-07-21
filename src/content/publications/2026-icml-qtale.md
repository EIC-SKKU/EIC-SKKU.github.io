---
title: "QTALE: Quantization-Robust Token-Adaptive Layer Execution for LLMs"
authors: Kanghyun Noh, Jinheon Choi, Yulhwa Kim⁺
venue: International Conference on Machine Learning (ICML)
venueShort: ICML
venueType: conference
year: "2026"
area: efficient-ai
order: 1
abstract: >-
  Large language models (LLMs) demand substantial computational and memory
  resources, posing challenges for efficient deployment. Two

  complementary approaches have emerged to address these issues: token-adaptive
  layer execution,

  which reduces floating-point operations (FLOPs)

  by selectively bypassing layers, and quantization, which lowers memory
  footprint by reducing weight precision. However, naively integrating these
  techniques leads to additional accuracy degradation due to reduced redundancy

  in token-adaptive models. We propose QTALE

  (Quantization-Robust Token-Adaptive Layer Execution for LLMs), a novel
  framework that enables

  seamless integration of token-adaptive execution

  with quantization while preserving accuracy. Conventional token-adaptive
  methods reduce redundancy in two ways: (1) by limiting the diversity

  of training paths explored during fine-tuning, and

  (2) by lowering the number of parameters actively

  involved in inference. To overcome these limitations, QTALE introduces two key
  components:

  (1) a training strategy that ensures diverse execution paths are actively
  explored during fine-tuning,

  and (2) a post-training mechanism that allows flexible adjustment of the execu
image: /images/publications/imgjuly-21-42.png
preprint: false
links:
  paper: https://arxiv.org/abs/2602.10431
---
