---
title: "Introduction"
description: "Ludwig is a functional logic programming language designed to compose and play music."
lead: "Ludwig is a functional logic programming language designed to compose and play music."
date: 2020-10-06T08:48:57+00:00
lastmod: 2020-10-06T08:48:57+00:00
draft: false
images: []
menu:
  docs:
    parent: "prologue"
weight: 100
toc: true
---

## Getting started

First, clone the source repository of Ludwig and build the project using `npm
run luwig`, my tests in particular were done on macOS using npm `v9.4.0` and
node `v19.6.1`.

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
plays musical notes while _de-duplicating_ notes of the same pitch (more on this
later).

We then decided to design Ludwig as a functional logic programming language on
the browser.
