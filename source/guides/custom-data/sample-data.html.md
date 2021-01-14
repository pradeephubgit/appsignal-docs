---
title: "Adding sample data to a request"
---

Besides tags you can add more metadata to a transaction (or override default metadata from integrations such as Phoenix).

## Ruby

### `custom_data`
Custom data is not set by default, but can be used to add additional debugging data to solve a performance issue or exception.

```
Appsignal::Transaction.current.set_sample_data("custom_data", {foo: "bar"})
```

## Elixir

### `custom_data`
Custom data is not set by default, but can be used to add additional debugging data to solve a performance issue or exception.

```
Appsignal.Span.set_sample_data(Appsignal.Tracer.root_span, "custom_data", %{foo: "bar"})

```

## Node.js

Sample data with the following key/value pairs can be set **on the root span**:

```js
const span = tracer.currentSpan();
span.setSampleData("key", { string: "value", number: 123 }); // sets additional sample data
```

The first argument to `setSampleData` takes a `key`, that can be one of the following:

### `custom_data`

Custom data is not set by default, but can be used to add additional debugging data to solve a performance issue or exception.

```js
span.setSampleData("custom_data", { foo: "bar" });
```

This key accepts nested objects and will result in the following block on a Incident Sample page for both Exception and Performance samples formatted as JSON.

![custom_data](/assets/images/screenshots/sample_data/custom_data.png)
