# EZWrap

[![Build Status](https://travis-ci.org/kfitzgerald/ezwrap.svg?branch=master)](https://travis-ci.org/kfitzgerald/ezwrap) [![Coverage Status](https://coveralls.io/repos/github/kfitzgerald/ezwrap/badge.svg?branch=master)](https://coveralls.io/github/kfitzgerald/ezwrap?branch=master)

This module makes dealing with parsed XML objects easy and painless. Uses [Needle's](https://github.com/tomas/needle) XML formatted objects.
 
For example, a parsed [Needle](https://github.com/tomas/needle) XML response might look like this: 

```xml
<NodeName someAttribute="someValue">
    <ChildNode>Value 1</ChildNode>
</NodeName>
```

Becomes:

```json
{
  "name": "NodeName",
  "value": "",
  "attributes": {
    "someAttribute": "someValue"
  },
  "children": [
    {
      "name": "ChildNode",
      "value": "Value 1",
      "attributes": {},
      "children": []
    }
  ]
}
```

EZWrap makes dealing with traversing child nodes and attributes easy and reliable. If a node in the path does not exist, no problem. The fluent-like interface handles missing or empty nodes without a problem.

## Installation

Install like so:

```sh
npm i --save ezwrap
```

## Usage

```js
const EZWrap = require('ezwrap');

const res = new EZWrap(response.body); // provide the parsed xml object to the constructor

// Get a node attribute
res.attr('someAttribute'); // => someValue

// Get a value from a child node
res.get('ChildNode').value; // => Value 1

// Safely handle missing paths in the XML
res.get('Does').get('Not').get('Exist').value; // => null

```

Custom inspection is included so that visualizing where you are in the tree is simple.

For example, in the node REPL:

```text
$ node
> const EZWrap = require('ezwrap')
undefined

> const xml = {
...   "name": "NodeName",
...   "value": "",
...   "attributes": {
.....     "someAttribute": "someValue"
.....   },
...   "children": [
...     {
.....       "name": "ChildNode",
.....       "value": "Value 1",
.....       "attributes": {},
.....       "children": []
.....     }
...   ]
... }
undefined

> res = new EZWrap(xml)
<NodeName someAttribute="someValue">
  <ChildNode ... />
</NodeName>

> res.get('ChildNode')
<ChildNode>
  Value 1
</ChildNode>

```

Really convenient for REPL and debugging, especially with payloads with a ton of child nodes and deep trees.


## Browser Usage

You can use this module in the browser too. A separate file is included, which has been run through Babel and Browserify for browser compatibility.

## EZWrap API

- [`new EZWrap(xmlObject)`](#new-ezwrapxmlobject)
  - [`ezwrap.isWrapped`](#ezwrapiswrapped)
  - [`ezwrap.length`](#ezwraplength)
  - [`ezwrap.value`](#ezwrapvalue)
  - [`ezwrap.name`](#ezwrapname)
  - [`ezwrap.attr(name)`](#ezwrapattrname)
  - [`ezwrap.all(name)`](#ezwrapallname)
  - [`ezwrap.get(name)`](#ezwrapgetname)
  - [`ezwrap.find(closure)`](#ezwrapfindclosure)
  - [`ezwrap.forEach(closure)`](#ezwrapforeachclosure)
  - [`ezwrap.filter(closure)`](#ezwrapfilterclosure)
  - [`ezwrap.map(closure)`](#ezwrapmapclosure)
- [`EZWrap.getEmptyObject([options])`](#ezwrapgetemptyobjectoptions)

### `new EZWrap(xmlObject)`

Returns a new wrapped instance where:
- `xmlObject` – the XML-parsed object to wrap

### `ezwrap.isWrapped`

Property which denotes whether the object is EZWrapped (`true`)

### `ezwrap.length`

Property which returns the number of children the node contains.

### `ezwrap.value`

Property which returns the value of the node or `null` if not defined.

### `ezwrap.name`

Property which returns the name of the node or `null` if not defined.

### `ezwrap.attr(name)`

Gets an attribute value on the node where:
- `name` – is the name of the attribute

Returns the value of the attribute or `null` if not defined.

### `ezwrap.all(name)`

Filters children nodes where:
- `name` – is the name of the child nodes to keep

Returns an EZWrapped object containing the filtered nodes. 

### `ezwrap.get(name)`

Gets the first node where:
- `name` – is the name of the child node to get

Returns the EZWrapped child object, or a wrapped empty object if not found. 

### `ezwrap.find(closure)`

Similar to Array.find(), gets the first node where:
- `closure(node)` – is a function called on each child node until the return value is truthy.
  - `node` – EZWrapped child node 

Returns the selected EZWrapped node or an empty EZWrapped node if no nodes were matched. 
 
### `ezwrap.forEach(closure)`

Similar to Array.forEach(), calls the closure function for each child node.
- `closure(node)` – function called on each child node
  - `node` – EZWrapped child node 

### `ezwrap.filter(closure)`

Similar to Array.filter(), calls the closure function for each child node and keeps the filtered results.
- `closure(node)` – function called on each child node. Return truthy to keep the node in the results.
  - `node` – EZWrapped child node
  
Returns an EZWrapped object containing the filtered children.

### `ezwrap.map(closure)`

Similar to Array.map(), calls the closure function for each child node and returns an array of mapped results.`
- `closure(node)` – function called on each child node. The value returned will be included in the results.
  - `node` – EZWrapped child node

Returns an array of mapped result values.


## Class Functions

### `EZWrap.getEmptyObject([options])`

Class/static function that generates raw XML-like objects, where:
- `options`: 
  - `name`: Optional node name
  - `value`: Optional node value
  - `attributes`: Optional attributes object
  - `children`: Optional array of node objects

Returns a raw, unwrapped node object.


## Contributing

There is plenty of room for this module to grow. Feel free to contribute additions!

### Building

To build the browser bundle, run:

```sh
npm run build
``` 

This will update:
- `dist/ezwrap.js`
- `dist/ezwrap.min.js`
- `dist/ezwrap.min.js.map`

### Testing

To run the unit tests with code coverage and linting:

```sh
npm run report
```

### All Package Scripts

Included scripts you can run are:
- `npm run clean` – Cleans the distribution and coverage directories
- `npm run build` – Builds the browser distribution
- `npm run test` – Runs unit tests without coverage
- `npm run cover` – Runs unit tests with coverage
- `npm run lint` – Runs eslint for code quality checks
- `npm run report` – Runs `build`, `cover`, and `lint`

Good luck, and have fun!