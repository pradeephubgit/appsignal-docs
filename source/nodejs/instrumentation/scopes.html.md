---
title: "Async tracing and Scopes"
---

Another concept unique to the Node.js integration is the concept of Scopes, which allow `Span`s to be recalled across asynchronous code paths that may not be linked to each other by being on the same direct code path.

## What is a "Scope"?

As mentioned in the [`Span` documentation](/nodejs/instrumentation/instrumentation.html#retrieving-the-current-span), the currently active `Span` can be recalled by calling `tracer.currentSpan()` to add data to it or create `ChildSpan`s from it.

```js
const tracer = appsignal.tracer();
const span = tracer.currentSpan();
```

Before it can be recalled again from elsewhere in your application (for example, in a completely different file), the `Span` must be given a Scope. This is not to be confused with "lexical scope", which is a language construct - it is a separate, but not unrelated, concept.

A Scope is a wrapper for a `Span` that allows it to be recalled across asynchronous code paths that may not be directly linked to each other (in an `EventEmitter` or a timer, for example, or even in a completely different file or function scope). This wrapper is invisible to you and is managed internally via the `Tracer` objects `ScopeManager` and the internal [`async_hooks` module](https://blog.appsignal.com/2020/09/30/exploring-nodejs-async-hooks.html).

These Scopes are stored in a stack, meaning that the most recent `Span` to be given a scope will be the next `Span` returned by `tracer.currentSpan()`.

## Assigning a Scope to a `Span`

A `Span` can be given a Scope like this:

```js
const tracer = appsignal.tracer();

tracer.withSpan(tracer.createSpan(), (span) => {
  // the span returned by `tracer.createSpan()` now has a Scope
  // it will be the next span to be returned by `tracer.currentSpan()`!
});
```

Once assigned to a Scope, the `Span` passed to `tracer.withSpan()` can be recalled using `tracer.currentSpan()` in a different file or lexical scope.

```js
tracer.withSpan(tracer.currentSpan(), (span) => {
  // `span` is the same span created by `tracer.createSpan()` in the example above!
});
```


### The context of `Span`

Any code executed within the callback passed as the second argument to `tracer.withSpan()` can be said have been executed within the _context_ of the `Span` passed as the first argument. If you consider that a `Span` has a start time and an end time, the _context_ of a `Span` is the empty space between those two points. In this "empty space", you can execute any code that you wish to instrument, as well as create children of the current `Span` in order to create more granular measurements.

This context can later be recreated in a completely different place (such as a different file in your project, or in a different lexical scope) by simply calling `tracer.withSpan()` again with the same `Span` (which can be recalled using `tracer.currentSpan()`).

```js
// the span returned by `tracer.currentSpan()` is passed to the callback as arg1: `span`
// it has a scope and will be the next `Span` to be returned by `tracer.currentSpan()`
tracer.withSpan(tracer.currentSpan(), (span) => {
  // your code goes here...
  someCode();

  // if you want to create a child span, you can call `tracer.withSpan()` with `span.child()`
  // to create context or that span
  tracer.withSpan(span.child(), (child) => {
    someOtherCode();
    child.close();
  });

  span.close(); // don't forget to close the span if you're done with it!
});
```

The callback passed to `tracer.withSpan()` can also be an async function:

```js
tracer.withSpan(tracer.currentSpan(), async (span) => {
  // all your async code goes here...
  await someCode();

  span.close(); // don't forget to close the span if you're done with it!
});
```

If the callback returns a value, it will become the return value of the `tracer.withSpan()` function.

The most recent `Span` passed to `tracer.withSpan()` also now has a scope, which means that it will be `Span` to be returned the next time you call `tracer.currentSpan()`. When the operation you wish to instrument is complete, call `span.close()` to stop the timer. 