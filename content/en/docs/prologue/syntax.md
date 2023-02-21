---
title : "Syntax"
description: "Ludwig Syntax"
lead: ""
draft: false
images: []
---

In the following `expr*` means _zero or more_ repetitions of the syntax form
`expr`, while `expr+` means _one or more_ repetitions or `expr` and `expr?`
means _zero or one_ occurrences of `expr` and finally `expr || expr'` means
_either_ the form `expr` or `expr'`. For example an non-negative integer literal
can be written as:

```h
number = (0 || 1 || ...)+
```

## Musical notes

Ludwig has special syntax for expressing the
[value](https://en.wikipedia.org/wiki/Note_value),
[pitch](https://en.wikipedia.org/wiki/Pitch_(music)) and
[octave](https://en.wikipedia.org/wiki/Octave) of a musical note using the
following syntax:

```h
pitch =
  || A
  || A# || Bb
  || B
  || C
  || C# || Db
  || D
  || D# || Eb
  || E
  || F
  || F# || Gb
  || G
  || G# || Ab
  
octave = (number/)?

value = (number/)?

note = value pitch octave
```

Values are expressed as their own inverse fractions. For example `8/C/4` denotes
the [Middle C](https://en.wikipedia.org/wiki/C_(musical_note)#Middle_C) note of
value (i.e duration) 1/8.

## Choice

Choice expressions are of the form `lhs | rhs`; Ludwig evaluates both `lhs` and
`rhs` and keeps both results unless one of them fails to compute; in which case
only the other one is left. Of course, if both options fail then the choice also
fails.

```h
choice = expr | expr
```
