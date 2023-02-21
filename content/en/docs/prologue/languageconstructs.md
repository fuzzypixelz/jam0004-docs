---
title : "Language Constructs"
description: "Language Constructs"
lead: ""
draft: false
images: []
weight: 30
---

As a functional logic language, Ludwig does not need many language constructs to be expressive.
For the precise syntax, refer to [Syntax]({{< relref "docs/prologue/syntax.md" >}}).

## Notes
Of course, no language for creating music would be complete without a way to express the notes that should be played.
In fact, these are one of the only kinds of literals that Ludwig has [dedicated syntax]({{< relref "docs/prologue/syntax.md" >}}#musical-notes) for.

Because every Ludwig program is just one large expression that is lazily evaluated and played, individual notes are already valid songs.

<div class="example">
C
</div>

<div class="example">
1/B/2
</div>

## Lists
Maybe you like minimalism, but for the rest of us, individual notes are not exactly the most exciting songs. Ludwig programs can use lists to play multiple notes in sequence.

[Lists]({{< relref "/docs/prologue/syntax" >}}#lists) can be written directly as list literals
<div class="example">
[C, D, E, F, G, A, B, C/5]
</div>

or by prepending ('cons'-ing) one or more elements to an existing list
<div class="example">
C : D : [E, F, G, A, B, C/5]
</div>

In fact, every closed list expression of the form `[A, B, C]` is just syntactic sugar for prepending all elements to an empty list (`A : B : C : []`)

## Basic Let Bindings
It is often useful to give names to values to refer to them later. This is where let bindings come in.

<div class="example">
let cmaj = [C, E, G] in [cmaj, cmaj]
</div>

Notice how this evaluates to the nested list
<div class="example">
[[C, E, G], [C, E, G]]
</div>

Thanks to a lack of types, Ludwig has no issues with an 'ill-typed' expression of this form.

Also, because Ludwig is lazy, let-bound expressions are only evaluated when necessary, so infinite loops do not hang the program unless they are actually used
<div class="example">
let loop = loop in C
</div>

This behavior is crucial for creating infinitely playing tracks. (Reload this tab to make it stop)
<div class="example">
let scale = [C, D, E, F, G, A, B] in
let loop = scale : loop in 
loop
</div>

## Functions
Like most functional languages, functions in Ludwig are represented via [lambda expressions]({{< relref "docs/prologue/syntax" >}}#lambdas). For example, a function that returns its argument without doing anything with it might look like this[^not-runnable].
```
\x -> x
```



Functions in Ludwig only ever take exactly one argument. Functions taking multiple arguments can be emulated via [currying](https://en.wikipedia.org/wiki/Currying). 
This means that instead of taking two arguments, a function takes one argument and returns another function that takes the second argument.

Example: this is a function that takes two arguments and bundles them up in a list.
```
\x -> \y -> [x, y]
```

Calling a function doesn't need parentheses, similar to other functional languages like Haskell or OCaml.

<div class="example">
let playEachTwice = \x -> \y -> [x, x, y, y] in

playEachTwice C E
</div>

## Free Variables and Unification
The previous constructs already provided a solid foundation for a functional language, but Ludwig is also a logic language.

In a logic programming language, variables don't need to have values immediately. One can define a variable without ever giving it a value.
```
let x in x
``` 

How do you do anything useful with these variables? With unification!

A unification expression of the form
```
expr1 = expr2 in expr3
```
asserts that `expr1` and `expr2` should be equal. If there are any free (i.e. not yet substituted) variables in either of these, then these will be substituted so that `expr1` and `expr2` *are* equal. If this is not possible, the expression will fail.

For example, in the expression

<div class="example">
let x in 
let y in
x = C in
E = y in
[x, y]
</div>

`x` is substituted with `C` and `y` is substituted with `E` so that
both unification expressions are satisfied.

Why is this useful? Because nothing prevents the arguments to a unification expression to be more complicated structures!
For example, extracting the first element of a list could be achieved with this function
<div class="example">
let head = \list ->
  let first in
  let rest in
  list = (first : rest) in
  first
in
head [C, D, E]
</div>

Fun fact: 'basic' let bindings of the form `let x = expr in expr2` are just syntactic sugar for free let bindings and unification (`let x in x = expr in expr2`)

## Choice
How do you play two notes at the same time?
Say you want to play a C major chord. This would involve playing `C`, `E`, and `G` at the same time.

How do you write an expression in Ludwig that does this?
Well, you write one that returns *all three notes at the same time*. This is what [logical/non-deterministic choice]({{< relref "/docs/prologue/syntax.md" >}}#choice) does.

<div class="example">
C | E | G
</div>

The intuition for choice is really that a choice expression returns all values at the same time (though the implementation is closer to spatial choice from the [Verse Calculus](https://simon.peytonjones.org/assets/pdfs/verse-conf.pdf)).

Applying any operation to the result of a choice is equivalent to the choice between applying it to all results individually

e.g.
<div class="example">
let f = \x -> [C, x] in
f (C | E | G)
</div>

is equivalent to
<div class="example">
[C, C] | [C, E] | [C, G]
</div>

If unification inside any branch of the choice fails, it is ignored. In other words, `failure | something` is equivalent to `something`.

This can be used to emulate ML-style pattern matching
<div class="example">
let nextOctave = \note ->
    (note = C in C/5)
  | (note = D in D/5)
  | (note = E in E/5)
  | (note = F in F/5)
  | (note = G in G/5)
  | (note = A in A/5)
  | (note = B in B/5)
in
nextOctave C
</div>

## Constants

You may notice that Ludwig doesn't have any built-in syntax for numbers or *any* data structures besides lists.
Does this mean you cannot express anything non-trivial? 

No! Ludwig has the ability to [declare constants]({{< relref "/docs/prologue/syntax.md" >}}#bindings) (values that only unify with themselves) that are powerful enough to express any algebraic data type.

As an example, consider the standard inductive definition of natural numbers as [peano numbers](https://en.wikipedia.org/wiki/Peano_axioms) (given in Haskell syntax)

```hs
data Nat = Z | S Nat
```

Defining constants for the possible data constructors (`Z` and `S` in this case) is enough to express these with full support for pattern matching

<div class="example">
const Z in
const S in
let add = \n -> \m -> 
     (n = Z in m)
   | (let nMinus1 in
     (S nMinus1) = n in
     S(add nMinus1 m))
in
let replicate = \n -> \x ->
      (n = Z in [])
    | (let nMinus1 in
       (S nMinus1) = n in
       x : (replicate nMinus1 x))
in
replicate (add (S (S Z)) (S (S (S Z)))) C
</div>


[^not-runnable]: You may notice that this example is not playable. This is because Ludwig can only play notes, lists of notes, or choices between the former. If you type this into the [playground]({{< relref "/playground" >}}) anyway, you will see a (slightly cryptic) runtime error. What would it even mean to play the function `\x -> x`?
