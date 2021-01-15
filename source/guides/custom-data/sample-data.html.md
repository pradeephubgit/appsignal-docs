---
title: "Adding sample data to a request"
---

Besides tags you can add more metadata to a transaction (or override default metadata from integrations such as Phoenix).

!> **Warning**: Do not use sample data to send personal data such as names or email addresses to AppSignal. If you want to identify a person, consider using a user ID, hash or pseudonymized identifier instead. You can use [link templates](/application/link-templates.html) in combination with [tags](/guides/custom-data/tagging-request.html) to link them back to your own system.


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

### `session_data`

Filled with session/cookie data by default, but can be overridden with the following call:

```js
span.setSampleData("session_data", {
  _csrf_token: "Z11CWRVG+I2egpmiZzuIx/qbFb/60FZssui5eGA8a3g=",
});
```

This key accepts nested objects that will be rendered as JSON on a Incident Sample page for both Exception and Performance samples.

![session_data](/assets/images/screenshots/sample_data/session_data.png)

### `params`

Filled with framework (such as Express) parameters by default, but can be overridden or filled with the following call:

```js
span.setSampleData("params", { string: "value", number: 123 });
```

This key accepts nested objects and will show up as follows on a Incident Sample page for both Exception and Performance samples, formatted as JSON.

![params](/assets/images/screenshots/sample_data/params.png)

### `environment`

Environment variables from a request/background job (typically filled by the default `http` integration, but can be further augmented by other integrations), but can be filled/overriden with the following call:

```js
span.setSampleData("environment", { CONTENT_LENGTH: "0" });
```

This call only accepts a one-level key/value object, nested values will be ignored.
This will result the following block on a Incident Sample page for both Exception and Performance samples.

![environment](/assets/images/screenshots/sample_data/environment.png)

### `custom_data`

Custom data is not set by default, but can be used to add additional debugging data to solve a performance issue or exception.

```js
span.setSampleData("custom_data", { foo: "bar" });
```

This key accepts nested objects and will result in the following block on a Incident Sample page for both Exception and Performance samples formatted as JSON.

![custom_data](/assets/images/screenshots/sample_data/custom_data.png)

## Next steps

- [Filtering app data](/guides/filter-data/) - next guide

---

- [Adding tags to a request](/guides/custom-data/tagging-request.html) - previous step in this guide
- [Tagging and Sample data guide](/guides/custom-data/) - the start of this guide
- [Tagging and Sample data topic](/application/tagging.html) - topic on tagging
- [Getting started guides](/guides/) - Guides overview
