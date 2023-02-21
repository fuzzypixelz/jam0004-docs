---
title : "Syntax"
description: "Ludwig Syntax"
lead: ""
draft: false
images: []
weight: 20
---

In the following `expr*` means _zero or more_ repetitions of the syntax form
`expr`, while `expr+` means _one or more_ repetitions or `expr` and `expr?`
means _zero or one_ occurrences of `expr` and finally `expr | expr'` means
_either_ the form `expr` or `expr'`. For example an non-negative integer literal
can be written as:

```h
digit = '0' | ... | '9'
number = digit+
```

Likewise we define identifiers:

```h
identifier_start = ('A' | ... | 'Z' | 'a' ... 'z')
identifier = identifier_start (identifier_start | '_' | digit)*
```

## Musical notes

Ludwig has special syntax for expressing the
[value](https://en.wikipedia.org/wiki/Note_value),
[pitch](https://en.wikipedia.org/wiki/Pitch_(music)) and
[octave](https://en.wikipedia.org/wiki/Octave) of a musical note using the
following syntax:

```h
pitch =
  | 'A'
  | 'A#' | 'Bb'
  | 'B'
  | 'A'
  | 'C'
  | 'C#' | 'Db'
  | 'D'
  | 'D#' | 'Eb'
  | 'E'
  | 'F'
  | 'F#' | 'Gb'
  | 'G'
  | 'G#' | 'Ab'
  | '_'
  
octave = (number '/')?

value = (number '/')?

note = value pitch octave
```

Values are expressed as their own inverse fractions. For example `8/C/4` denotes
the [Middle C](https://en.wikipedia.org/wiki/C_(musical_note)#Middle_C) note of
value (i.e duration) 1/8. Underscore (i.e `_`) denotes a pause.

## Lists

The syntax for (cons) lists is shared by many other ML-family languages:

```
list = 
    | '[' ((expr ',')* expr)? ']'
    | expr ':' expr
```

## Choice

Choice expressions are of the form `lhs | rhs`; Ludwig evaluates both `lhs` and
`rhs` and keeps both results unless one of them fails to compute; in which case
only the other one is left. Of course, if both options fail then the choice also
fails.

```h
choice = expr '|' expr
```

## Unification

There plus `=` symbol in Ludwig doesn't mean _assignment_ but rather
_unification_ which you can think of as 'structural equality', with some
caveats. Unification expressions always contain _continuation_ expressions.

```h
unify = expr '=' expr 'in' expr
```

## Bindings

Because there is no explicit notion of assignment bindings look a bit different,
though there is syntax sugar to alleviate this.

```h
binding =
  | 'let'   identifier 'in' expr
  | 'let'   identifier '='  expr 'in' expr
  | 'const' identifier 'in' expr
```

The second form reduces to the first by putting a unification expression in its
body. This _looks_ like regular assignment but is quite different semantically.

Constants are defined by using the `const` keyword, see the next [section]({{<
relref "/docs/prologue/languageconstructs.md" >}}#constants) for the difference
between the two.

## Lambdas

Lambdas (i.e anonymous function expressions) share the same syntax with Haskell-like
programming languages:

```h
lambda = '\' identifier '->' expr
```

## Applications

Like you would expect function application is curried and is done by simply
juxtaposition:

```h
apply = expr expr
```

## Summary

```h
expr =
  | note
  | list
  | choice
  | unify
  | lambda
  | apply
```
