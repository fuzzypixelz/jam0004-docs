---
title: "Introduction"
description: "Ludwig is a lazy functional logic programming language designed to compose and play music."
lead: "Ludwig is a lazy functional logic programming language designed to compose and play music."
date: 2020-10-06T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 10
toc: true
---

Ludwig programs are just expressions that evaluate to a lazy list of notes. These can contain [non-deterministic choices]({{< relref "docs/prologue/languageconstructs" >}}#choice) between notes, which will be played at the same time.

## Getting started

The easiest way to play with Ludwig is through the [playground]({{<relref "playground.md">}}).

If you'd like to build Ludwig from source, clone the source
[repository](https://github.com/fuzzypixelz/jam0004) and build the project using
the `luwig` npm script, my tests in particular were done on macOS using npm
`v9.4.0` and node `v19.6.1`.

```console
git clone git@github.com:fuzzypixelz/jam0004.git
cd ludwig
npm run ludwig
open dest/index.html
```

Next, webpack should generate the build files under `dest/`. Simply open the
`index.html` with your browser of choice (Chromium-based browsers are recommended).

## Rationale

Ludwig is [Innf107](https://github.com/Innf107) and
[fuzzypixelz'](https://github.com/fuzzypixelz) submission for the 4th [Lang
Jam](https://github.com/langjam/langjam). This edition's theme is:

> The sound(ness) of one hand typing

At first we thought of making a language where all tokens can be typed using
_only_ one side of the keyboard — we would quickly get disenchanted with this
idea. After a fair bit of Brainstorming™ we thought of making a language which
plays musical notes. 
Having discussed logic programming and the upcoming verse, the thought of using choice to play the notes typed with each hand at the same time came quite naturally.

We then decided to design Ludwig as a lazy functional logic programming language on
the browser.
