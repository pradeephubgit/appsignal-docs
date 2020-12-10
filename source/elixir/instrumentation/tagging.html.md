---
title: "Tagging and Sample Data"
---

Use the [`Appsignal.Span.set_sample_data`](https://hexdocs.pm/appsignal/Appsignal.Span.html#set_sample_data/2) function to supply extra context on errors and
performance issues. This can help to add information that is not already part of
the request, session or environment parameters.

```elixir
Appsignal.Span.set_sample_data(Appsignal.Tracer.root_span, "tags", %{locale: "en"})
```

!> **Warning**: Do not use tagging to send personal data such as names or email
   addresses to AppSignal. If you want to identify a person, consider using a
   user ID, hash or pseudonymized identifier instead. You can use
   [link templates](/application/link-templates.html) to link them to your own
   system.

## Tags

Using tags you can easily add more information to errors and performance issues
tracked by AppSignal. There are a few limitations on tagging though.

- The tag key must be a `String` or `Atom`.
- The tagged value must be a `String`, `Atom` or `Integer`.

Tags that do not meet these limitations are dropped without warning.

`set_sample_data` can be called multiple times, but only the last value will be retained:

```elixir
Appsignal.Span.set_sample_data(Appsignal.Tracer.root_span, "tags", %{locale: "en"})
Appsignal.Span.set_sample_data(Appsignal.Tracer.root_span, "tags", %{user: "bob"})
Appsignal.Span.set_sample_data(Appsignal.Tracer.root_span, "tags", %{locale: "de"})
```
will result in the following data:

```elixir
%{
  locale: "de"
}
```

### Link templates

Tags can also be used to create link templates. Read more about link templates
in our [link templates guide](/application/link-templates.html).


## Sample Data

Besides tags you can add more metadata to a span by passing custom data to be shown on your sample pages.

### `custom_data`
Custom data is not set by default, but can be used to add additional debugging data to solve a performance issue or exception.

```
Appsignal.Span.set_sample_data(Appsignal.Tracer.root_span, "custom_data", %{foo: "bar"})
```
This key accepts nested objects and will result in the following block on a Incident Sample page for both Exception and Performance samples formatted as JSON.

![custom_data](/assets/images/screenshots/sample_data/custom_data.png)

-> **Note**: The "params", "session_data" or "environment" will be overwritten at the end of the request in Plug and Phoenix applications. We recommend using "custom_data" instead.
