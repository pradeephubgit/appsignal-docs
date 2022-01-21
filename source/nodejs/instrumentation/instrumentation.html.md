---
title: "Custom instrumentation for Node.js"
---

In order to find out what specific pieces of code are causing performance problems it's useful to add custom instrumentation to your application. This allows us to create better breakdowns of which code runs slowest and what type of action the most amount of time was spent on.

-> **Note**: Make sure you've [installed AppSignal](/nodejs/installation.html) before adding custom instrumentation to your application if it's not integrated by one of our supported [integrations](/nodejs/integrations/index.html).

-> **Note**: This page only describes how to add performance instrumentation to your code. To track errors please read our [exception handling](/nodejs/instrumentation/exception-handling.html) guide.

## The Tracer object

The `Tracer` object provided by the AppSignal for Node.js integration contains various functions that you might use when creating your own custom instrumentation.

The Tracer is responsible for tracking the current root and active `Span`s, and exposes functions for creating and activating new Spans. We will discuss these functions on this page in more detail.

### Retrieving the Tracer

The tracer object can be retrieved by calling the `tracer()` function on the `Appsignal` client object.

```js
const tracer = appsignal.tracer();
```

If AppSignal is configured to not be active (`active: false`), the AppSignal client will return a tracer object that will not record any data. It is safe to call this tracer object within your code as you would if the integration was active.

## Creating and using a Span

A Span is the name of the object that we use to capture data about the performance of your application, any errors and any surrounding context. A Span can form a part of a broader trace, a hierarchical representation of the flow of data through your application.

Each Span contains the following metadata:

- The parent Spans ID (if any)
- A start and finish time
- A name (RootSpan only)
    - The action name for requests and background jobs, e.g. `GET /user/profile` and `BackgroundJob.perform`. Requests and background jobs are grouped together by this name.
- A category
    - The name of the event shown in the performance event timeline, e.g. `fetch_all.user_service` and `render.handlebars`. For the RootSpan this will the top-level first Span in the event timeline that all other Spans will be shown under.
- [Error data](/nodejs/instrumentation/exception-handling.html)
- [Sample data](/guides/custom-data/sample-data.html) (RootSpan only)
- [Tags](/guides/custom-data/tagging-request.html) (RootSpan only)

It is designed to closely follow the concept of a Span from the [OpenTelemetry standard specification](https://github.com/open-telemetry/opentelemetry-specification), but there are some minor differences that we'll get into later.

### Retrieving the current Span

The currently active Span can be recalled to add data to it or create ChildSpans from it.

```js
const tracer = appsignal.tracer();
const span = tracer.currentSpan();
```

### Retrieving the current root Span

In most cases, a root Span (`RootSpan`) will be created by one of our automatic instrumentations, e.g. the `http` module integration. To add any custom instrumentation to your trace, you'll need to retrieve that RootSpan using the Tracer instance.

```js
const tracer = appsignal.tracer();
const rootSpan = tracer.rootSpan();
```

Once you have the current RootSpan, you'll be able to [add data](#configuring-a-span) to it and create [ChildSpan](#creating-a-child-span) from it. If a current Span is not available, then `tracer.rootSpan()` will return a NoopSpan.

### Creating a Span

A Span can be created by calling `tracer.createSpan()`, which initializes a new RootSpan if there's no current RootSpan on the _scope_ or a ChildSpan of the current RootSpan.

```js
const tracer = appsignal.tracer();
const span = tracer.createSpan();
```

A `RootSpan` is a type of Span which encapsulates the end-to-end latency for the entire request. As a Span is created, its start time is recorded. To give the span an end time, the Span must be [closed](#closing-a-span) when all the operations that the Span is recording are finished.

When a Span is created, it is not bound to any _scope_. This means it cannot be recalled again from a different place in your app without first being given a _scope_. Read more about scopes [here](scopes.html).

### Creating a child Span

A ChildSpan can be created to represent a subdivision of the total length of time represented by the RootSpan. This is useful for instrumenting blocks of code that are run inside of the lifetime of a RootSpan.

```js
const tracer = appsignal.tracer();
const rootSpan = tracer.rootSpan();
const childSpan = rootSpan.child();
```

A ChildSpan can also be created by passing an optional second argument to `tracer.createSpan()`.

```js
const tracer = appsignal.tracer();
const childSpan = tracer.createSpan(undefined, rootSpan);
```

After a Span is created, you can begin adding data to it using methods on the Span object. ChildSpans and RootSpans share the same interface. After you are done instrumenting the block of code you need to [close](#closing-a-span) the span.

### Configuring a Span

#### Setting a RootSpan name

The RootSpan name communicates what part of the app the Span recorded data for, such as which request endpoint or which background job worker. The Span name is used in the UI to group all requests on the same endpoint together, or background jobs from the same worker, to find it back easier.

```js
// Necessary setup
const tracer = appsignal.tracer();
const rootSpan = tracer.rootSpan();

// Examples of RootSpan names
rootSpan.setName("GET /user/profile"); // For a HTTP endpoint
rootSpan.setName("BackgroundWorker.perform"); // For a background worker job
```

ChildSpans can not be configured with names, read how [set categories](#setting-a-span-category) instead.

#### Setting a Span category

Every Span has a category. This category label is used in the event timeline for performance measurements, to show the durations of Spans. It also used to group together Span in the same category group, and show breakdowns per group. This helps determine if a HTTP request took more time querying the database, or render a HTML view. This data is also used in the "Slow Events" feature, to highlight slow HTTP requests and database queries across the application.

For more information on how what category names to use, please read our [event naming guide](/api/event-names.html).

```js
// Necessary setup
const tracer = appsignal.tracer();

// Set the category for a RootSpan
const rootSpan = tracer.rootSpan();
rootSpan.setName("GET /user/profile");
rootSpan.setCategory("process_request.express");

// Set the category for a ChildSpan
const childSpan = rootSpan.child();
childSpan.setCategory("perform.sql");
// And then perform query
childSpan.close() // Close Span after the query has been performed

// Close the RootSpan at the end of the HTTP request
rootSpan.close()
```

#### Adds sanitized SQL data as a string to a Span

In the event timeline, additional metadata can be shown for events. To show SQL queries that have been performed, you can use the `setSQL` function.

Any query set on a Span this way will be automatically sanitized of any values in the query. This prevents any personal identifiable information and passwords to accidentally leak to our servers.

```js
// Necessary setup
const tracer = appsignal.tracer();
const rootSpan = tracer.rootSpan();
childSpan.setName("GET /user/profile");

// Set SQL query as metadata on the ChildSpan
const childSpan = rootSpan.child();
childSpan.setCategory("perform.sql");
childSpan.setSQL("SELECT * FROM users WHERE email = 'hello@example.com'");
// The query will be sanitized and reported as:
// SELECT * FROM users WHERE email = ?
childSpan.close() // Close Span after the query has been performed

// Close the RootSpan at the end of the HTTP request
rootSpan.close()
```
#### Adding metadata to a Span

For more information, see the [custom data guide](/guides/custom-data/).

#### Adding an error to a Span

For more information, see the [exception handling page](/nodejs/instrumentation/exception-handling.html).

### Closing a Span

As Spans represent a length of time, they must be given a finish time once all the operations that the Span is timing have completed. You do this by calling `span.close()`.

```js
const tracer = appsignal.tracer();
const span = tracer.createSpan();
span.setName("GET /user/profile");

// do stuff...

span.close();
```

If the RootSpan is created by the core `http` instrumentation (the most common case), the RootSpan is closed automatically by the instrumentation. If any children of this RootSpan are left unclosed, then they are dropped from the trace. Generally speaking, you should close the spans that you create, but not the spans that are created by the instrumentations.

#### Complete example

Here is an example of creating a child span from the current root span, adding information to it, and then closing it.

```js
const tracer = appsignal.tracer();
const rootSpan = tracer.rootSpan();
rootSpan.setName("GET /user/profile");
rootSpan.setCategory("perform.request");

// Do things like performing queries and rendering HTML
const childSpan = rootSpan.child();
childSpan.setCategory("get.query");
childSpan.setSQL("SELECT * FROM users WHERE email = 'hello@example.com'");

childSpan.close();
rootSpan.close();
```
