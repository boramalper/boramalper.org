---
id: 520
title: 'pydis – A redis clone in Python 3 to disprove some falsehoods about performance'
date: 2019-03-02T01:23:58+02:00
author: Bora M. Alper
layout: post
guid: /assets/?p=520
permalink: /pydis-a-redis-clone-in-python-3-to-disprove-some-falsehoods-about-performance/
hefo_before:
  - "0"
hefo_after:
  - "0"
categories:
  - Software Engineering
tags:
  - experiments
  - optimization
  - python
---
I developed **pydis** in two days to disprove some of the falsehoods about performance and optimisation regarding software and interpreted languages in particular.

Unfortunately many programmers, due to their lack of experience, of some knowledge of computer architecture(s), or of an in-depth understanding of the task they are given, spend countless hours by making life harder for themselves in the name of marginal performance gains, often trading many other conveniences (such as type safety, garbage collection, etc) too.

**pydis** is < 250 lines of idiomatic Python code, providing a subset of redis&#8217; functionality for which there are official benchmarks, and yet it&#8217;s ~60% as fast as Redis measured in number operations per second.

Remember, man-hours are more expensive that cpu-time.

<https://github.com/boramalper/pydis>

## Results

![/assets/wp-content/uploads/2019/03/plot.png]({{site.baseurl}}/assets/wp-content/uploads/2019/03/plot.png)


| Benchmark        | pydis   | redis   | Ratio |
|------------------|--------:|--------:|------:|
| **SET**          | 301,582 | 379,944 | 0.794 |
| **GET**          | 264,841 | 455,237 | 0.582 |
| **INCR**         | 238,670 | 442,483 | 0.539 |
| **LPUSH**        | 246,867 | 386,442 | 0.639 |
| **RPUSH**        | 258,845 | 376,787 | 0.687 |
| **LPOP**         | 297,397 | 355,276 | 0.837 |
| **RPOP**         | 280,095 | 399,511 | 0.701 |
| **SADD**         | 223,700 | 416,842 | 0.537 |
| **HSET**         | 240,649 | 367,985 | 0.654 |
| **SPOP**         | 285,936 | 442,747 | 0.646 |
| **LRANGE (100)** | 26,162  | 99,703  | 0.262 |
| **LRANGE (300)** | 9,135   | 21,211  | 0.431 |
| **LRANGE (500)** | 5,788   | 14,649  | 0.395 |
| **LRANGE (600)** | 4,339   | 10,659  | 0.407 |
| **MSET**         | 157,963 | 172,226 | 0.917 |
