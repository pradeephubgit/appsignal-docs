---
title: "Adding tags to a request"
---

A request in AppSignal terms can be when a user accesses a certain route or API endpoint, it can also be a background job or a cron job.

Sometimes we need to attach an extra information to a request to help debug a certain issue or it could be that you want to know who the user was which initiated the request or it could be a paid customer whose details you want to see on lets say Stripe.

You can use the `tag` feature of AppSignal for this purpose.

!> **Warning**: Do not use tagging to send personal data such as names or email addresses to AppSignal. If you want to identify a person, consider using a user ID, hash or pseudonymized identifier instead. You can use [link templates](/application/link-templates.html) to link them back to your own system.

## Ruby

```ruby
# Good, I18n.locale/default_locale returns a symbol
Appsignal.tag_request(
  user_id: current_user.id,
  stripe_customer_id: stripe_customer_id,
  locale: I18n.locale,
  default_locale: I18n.default_locale
)

# Bad, hash type is not supported
Appsignal.tag_request(
  i18n: {
    locale: I18n.locale,
    default_locale: I18n.default_locale
  }
)
```

### Limitations

Tags that do not meet these limitations are dropped without warning.

- The tag key must be a `String` or `Symbol`.
- The tagged value must be a `String`, `Symbol` or `Integer`.
- The length of the tag key and tagged value must be less than 100 characters.

## Elixir

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

### Limitations

Tags that do not meet these limitations are dropped without warning.

- The tag key must be a `String` or `Atom`.
- The tagged value must be a `String`, `Atom` or `Integer`.

## Node.js

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

## Link templates

The list of tags for the sample can be found in the tags box on an [error](https://appsignal.com/redirect-to/app?to=performance) and [performance] (https://appsignal.com/redirect-to/app?to=performance) incident detail page.

Using [link templates](/application/link-templates.html) it's possible to use the tag data to link back to your app, such as the admin interface for the signed in user. See "Link 1" and "Link 2" as examples in the screenshot below.

![Tag a request](/assets/images/screenshots/tags/tags.png)
