# WTF URL!

![Nobody Expects the Spanish Inquisition](./monty-python-spanish-inquisition.png)]

## Description

WTF URL is a Node.js native WHATWG compliant URL constructor grammar based fuzzer.

Based on grammars of this project, WTF URL generates random valid URLs.

Although it's first purpose is to fuzz URLs, you can fit it to generate any kinds of formats by writing and importing the corresponding grammar.

## Examples

You can find examples in the `./examples/` directory.

```bash
$ node ./examples/fuzzing-whatwg-url.js
```

## Grammars

You can find examples in the `./grammars/` directory.

Currently only the following grammars exist:

- [ABNF](https://tools.ietf.org/html/rfc2234)
- [URI](https://tools.ietf.org/html/rfc3986)

## Implementation

WTF URL uses the [ABNF](https://tools.ietf.org/html/rfc2234) grammar syle to describe formats.

Each grammar is currently expressed as custom intermediary representation object where the key is the token name and the value the token's ABNF AST.

Generators are used to cycle through each branch of the grammar generation process and return a result without storing them all in memory.

Randomness plays an important role. Here are the types of nodes in a grammar that use random numbers:

- ranges (`$range), character who's code is in the range `[$range.from, $range.to]`
- OR operators (`$or), token who's index is in the range `[0, $range.$or.length - 1]`
- quantifiers (`$quantifier), number of repetitions for a token in the range `[$quantifier.min, $quantifier.max]`
