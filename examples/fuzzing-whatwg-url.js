'use strict';

const rfc2234Grammar = require('../grammars/rfc2234-grammar');
const rfc3986Grammar = require('../grammars/rfc3986-grammar');

const grammarUtils = require('../src/grammar-utils');
const wtfUrl = require('../src/wtf-url');

const url = require('url');

const mergedGrammar = grammarUtils.mergeGrammars([
  rfc2234Grammar,
  rfc3986Grammar
]);

const token = mergedGrammar.URI;

const generator = wtfUrl.routeToken(mergedGrammar, token);
let parsed = null;
let next = null;
let i = 0;

while ((next = generator.next()).value) {
  try {
    new (url.URL)(next.value) && (parsed = true);
  } catch (e) {
    parsed = false;
  }

  i += 1;

  console.log('>', i, '-', next.value, parsed);
}
