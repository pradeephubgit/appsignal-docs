---
title: "Adding tags to a request"
---

Use tagging to supply extra context on errors and performance incidents. This can help to add information that is not already part of the request, such as the session data, headers, environment data or parameters. Tags can also be used to filter on samples within an incident to find all errors for a specific user, or slow pages for a specific locale.

Tags can be set wherever the current transaction or span is accessible. We recommend calling it before you application code runs in the request, such as in a callback. The list of tags for the sample can be found in the tags box on an [error](https://appsignal.com/redirect-to/app?to=performance) and [performance] (https://appsignal.com/redirect-to/app?to=performance) incident detail page.

Using [link templates](/application/link-templates.html) it's possible to use the tag data to link back to your app, such as the admin panel for the signed in user. See "Link 1" and "Link 2" as examples in the screenshot below.

![Tag a request](/assets/images/screenshots/tags/tags.png)

!> **Warning**: Do not use tagging to send personal data such as names or email addresses to AppSignal. If you want to identify a person, consider using a user ID, hash or pseudonymized identifier instead. You can use [link templates](/application/link-templates.html) to link them back to your own system.

## Ruby

With the AppSignal for Ruby gem, use the `Appsignal.tag_request` (or `Appsignal.tag_job`) helper methods to add tags to error and performance samples.

You can use `Appsignal.tag_request` wherever the current transaction is accessible, we recommend calling it before you application code runs in the request, such as in a `before_action` using Rails.

```ruby
before_action do
  Appsignal.tag_request(
    :user_id => current_user.id,
    :stripe_customer_id => stripe_customer_id,
    :locale => I18n.locale,
    :default_locale => I18n.default_locale
  )
end
```

### Limitations

Tags that do not meet these limitations are dropped without warning.

- The tag key must be a `String` or `Symbol`.
- The tagged value must be a `String`, `Symbol` or `Integer`.
- The length of the tag key and tagged value must be less than 100 characters.
- Nested hash values are not supported for tags, please use [custom data](/guides/custom-data/sample-data.html) instead.

```ruby
# Unsupported: hash value type is not supported
Appsignal.tag_request(
  :i18n => {
    :locale => I18n.locale,
    :default_locale => I18n.default_locale
  }
)
```

## Elixir

Use the [`Appsignal.Span.set_sample_data`](https://hexdocs.pm/appsignal/Appsignal.Span.html#set_sample_data/2) function to supply extra context on errors and performance samples. Use the `"tags"` sample key for the function to add tags to the span.

```elixir
Appsignal.Span.set_sample_data(
  Appsignal.Tracer.root_span,
  "tags",
  %{
    locale: "en",
    user_id: user_id,
    stripe_customer_id: stripe_customer_id,
    locale: locale,
    default_locale: default_locale
  }
)
```

### Last call is leading

The `set_sample_data` helper can be called multiple times, but only the last value will be retained. When the code is run below:

```elixir
Appsignal.Span.set_sample_data(Appsignal.Tracer.root_span, "tags", %{locale: "en"})
Appsignal.Span.set_sample_data(Appsignal.Tracer.root_span, "tags", %{user: "bob"})
Appsignal.Span.set_sample_data(Appsignal.Tracer.root_span, "tags", %{locale: "de"})
```

it will result in the following tags being stored:

```elixir
%{
  locale: "de"
}
```

### Limitations

Tags that do not meet these limitations are dropped without warning.

- The tag key must be a `String` or `Atom`.
- The tagged value must be a `String`, `Atom` or `Integer`.
- Nested map values are not supported for tags, please use [custom data](/guides/custom-data/sample-data.html) instead.

```elixir
# Unsupported: map value type is not supported
Appsignal.Span.set_sample_data(
  Appsignal.Tracer.root_span,
  "tags",
  %{
    i18n: %{
      locale: "en_GB",
      default_locale: "en_US"
    }
  }
)
```

## Node.js

Use the Span's `set` function to add tags to spans for errors and performance samples.

```js
const tracer = appsignal.tracer();
const span = tracer.currentSpan();
span.set("user_id", user_id);
span.set("stripe_customer_id", stripe_customer_id);
span.set("locale", locale);
span.set("default_locale", default_locale);
```

### Limitations

Tags that do not meet these limitations are dropped without warning.

- The tag key must be a `String`.
- The tagged value must be a `String`, `Number` or `Boolean`.
- Nested object values are not supported for tags, please use [custom data](/guides/custom-data/sample-data.html) instead.

```js
const tracer = appsignal.tracer();
const span = tracer.currentSpan();

# Unsupported: object value type is not supported
span.set("i18n", { locale: "en_GB", default_locale: "en_US" });
```
