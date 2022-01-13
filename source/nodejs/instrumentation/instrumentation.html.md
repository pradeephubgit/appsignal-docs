---
title: "Custom instrumentation for Node.js"
---

In order to find out what specific pieces of code are causing performance problems it's useful to add custom instrumentation to your application. This allows us to create better breakdowns of which code runs slowest and what type of action the most amount of time was spent on.

## The Tracer object

AppSignal for Node.js contains a new concept that is different from the current Ruby implementation - the `Tracer` object. The `Tracer` object contains various methods that you might use when creating your own custom instrumentation.

The Tracer is responsible for tracking the currently active `Span`, and exposes functions for creating and activating new `Span`s.

### Retrieving the `Tracer`

```js
const tracer = appsignal.tracer();
```

If the agent is currently inactive (you must actively set it as such by setting `active: true`), then the AppSignal client will return an instance of `NoopTracer`, which is safe to call within your code as if the agent were currently active but does not record any data.

## Creating and using a Span

A `Span` is the name of the object that we use to capture data about the performance of your application, any errors and any surrounding context. A `Span` can form a part of a broader **trace**, a hierarchical representation of the flow of data through your application.

Each `Span` contains the following state:

- A name
- A start and finish timestamp
- Tags
- Sample data
- The parent `Span`s ID (if any)
- `SpanContext` identification of a `Span`

It is designed to closely follow the concept of a Span from the [OpenTelemetry](https://github.com/open-telemetry/opentelemetry-specification) standard specification, but there are some minor differences that we'll get into later.

### Retrieving the current `RootSpan`

In most cases, a `RootSpan` will be created by one of our automatic instrumentations, e.g. the `http` module integration. To add any custom instrumentation to your trace, you'll need to retrieve that `RootSpan` using the `Tracer` instance.

```js
const rootSpan = tracer.rootSpan();
```

Once you have the current `RootSpan`, you'll be able to add data to it and create `ChildSpan`s from it. If a current `Span` is not available, then `tracer.rootSpan()` will return a `NoopSpan`.
### Creating a new `Span`

A `Span` can be created by calling `tracer.createSpan()`, which initializes a new `RootSpan` if there's no current `RootSpan` on the _scope_ or a `ChildSpan` of the present `RootSpan`.

```js
const tracer = appsignal.tracer();
const span = tracer.createSpan();
```

A `RootSpan` is a type of `Span` which encapsulates the end-to-end latency for the entire request. As a `Span` is created, its start time is recorded. To give the span an end time, the `Span` must be [closed](#closing-a-span) when all the operations that the `Span` is recording are finished.

When a `Span` is created, it is not bound to any _scope_. This means it cannot be recalled again from a different place in your app without first being given a _scope_. Read more about scopes [here](scopes.html).

### Child spans

A `ChildSpan` can be created to represent a subdivision of the total length of time represented by the `RootSpan`. This is useful for instrumenting blocks of code that are run inside of the lifetime of a `RootSpan`.

```js
const tracer = appsignal.tracer();
const rootSpan = tracer.rootSpan();
const childSpan = rootSpan.child();
```

A `ChildSpan` can also be created by passing an optional second argument to `tracer.createSpan()`.

```js
const tracer = appsignal.tracer();
const childSpan = tracer.createSpan(undefined, rootSpan);
```

After a `Span` is created, you can begin adding data to it using methods on the `Span` object. `ChildSpan`s and `RootSpan`s share the same interface.





















### Configuring a `Span`

#### Naming a `Span`

A `Span` name is used to identify a certain sample error and performance issues in the relevant tables in our UI. It should concisely identify the work represented by the `Span` (this could be an RPC method name, a function name, or a route name).

```js
const tracer = appsignal.tracer();
const span = tracer.currentSpan();
span.setName("GET /route");
```

The `Span` name should be the most general string that identifies a (statistically) interesting group of `Span`s, rather than individual `Span` instances. These names function as a grouping mechanism. **Under no circumstances should they contain dynamic parameters such as IDs.**

Examples:

```
GET /users/:id
Query.fetchAll
```

#### Adding metadata to a `Span`

More information on this is available [here](/guides/custom-data/).

#### Adding an error to a `Span`

More information on this is available [here](/nodejs/tracing/exception-handling.html).

### Closing a `Span`

As `Span`s represent a length of time, they must be given a finish time once all the operations that the `Span` is timing have completed. You do this by calling `span.close()`.

```js
const tracer = appsignal.tracer();
const span = tracer.currentSpan();
span.setName("GET /route");

// do stuff...

span.close();
```

If the `RootSpan` is created by the core `http` integration (the most common case), the `RootSpan` is closed automatically by the integration. If any children of this `RootSpan` are left unclosed, then they are dropped from the trace.

#### Complete example

Here is an example of creating a child span from the current root span, adding information to it, and then closing it.

```js
const tracer = appsignal.tracer();
const rootSpan = tracer.rootSpan();
const childSpan = rootSpan.child();

childSpan.setName(`Query.sql.model.action`);
childSpan.setCategory("get.query");
childSpan.close();
