# Decimalize
A JS decimal expressions library written in TypeScript

Allows you to write easily readable arithmetic expressions using more precise decimal types

```javascript
const difference = (x, y) => dec`${x} - ${y}`;
```


## Numbers in JavaScript

Have you ever tried running `0.1 + 0.2` in your browser console?

If you have, you'll see that the answer is not `0.3` as you might expect, but instead `0.30000000000000004`, this is due to inherent inaccuracy in how the IEEE 754 specification represents decimal numbers in binary
(you can read more about this [here](https://en.wikipedia.org/wiki/Floating-point_arithmetic#Accuracy_problems)).

For this reason, many languages offer some kind of `decimal` or precision type which trades speed and range for accuracy. These are useful for handling numbers where accuracy is more important, like financial applications.

### JavaScript does not support any such type natively

&nbsp;

While there are libraries available which can model decimal values more precisely, JavaScript also does not support operator overloading, which forces code to be written in method chains like:

```javascript
a.add(b).dividedBy(c);
```

Even this simple example is not especially pretty to read, once you have a handful of these and then throw `null` or `NaN` into the mix, it starts to get pretty nasty.

&nbsp;

## Decimalize

This library uses [Parzec](https://github.com/johtela/parzec) in combination with [BigNumber.js](https://github.com/MikeMcl/bignumber.js/) to deploy arithmetic expression parsing of precise decimals in the form of JS template literals

This means that instead of using method chains, you can write a simple, readable expression like

```javascript
 dec`0.1 + 0.2` 
```
Here, the numbers will be parsed using the BigNumber.js library, rather than the JS native `number` type, so precision can be maintained

You can use variables as interpolated arguments in your expression

```javascript
let price = dec`${cost} * ${tax}`;
```

You can also combine variables and static numbers in your expression
```javascript
let result = dec`(${index} + 1) / ${base}`

const calculatePercentage(amount, total) => dec`(${amount} / ${total}) * 100`
```

## Argument Types

&nbsp;

Arguments can be a `number`, `string` or `BigNumber` type, whatever values you pass in are immediately handed to the BigNumber constructor, and as such any invalid inputs will make the result of your expression, the BigNumber representation of `NaN` (which can be coerced to native `NaN` as number type)

In future, this will be extended to allow you to configure how values such as `NaN`, `null` and `undefined` will be handled.

## Operators

&nbsp;

Decimalize currently supports the standard arithmetic operators, `+ * / - ( )`

Additional operators may be added in future for exponents and other operations, but for now these are only supported by BigNumber in method syntax

## Configuration

&nbsp;

This library does not expose any configuration at the moment, however, there are various configuration options available for BigNumber.js, which you can read about over at its [project page](https://github.com/MikeMcl/bignumber.js/)

## Dependencies

&nbsp;

The incredible [BigNumber.js](https://github.com/MikeMcl/bignumber.js/) and the amazing [Parzec](https://github.com/johtela/parzec), both of which are licensed under MIT, as is this library