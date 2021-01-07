---
title: "Adding tags to a request"
---

A request in AppSignal terms can be when a user accesses a certain route or api endpoint, it can also be a background job or a cron job.

Sometimes we need to attach an extra information to a request to help debug a certain issue or it could be that you want to know who the user was which initiated the request or it could be a paid customer whose details you want to see on lets say Stripe.

You can use the `tag` feature of AppSignal for this purpose.
## Ruby



```ruby
# Good, I18n.locale/default_locale returns a symbol
Appsignal.tag_request(
  user: current_user.id,
  admin_url: '<a href="url">Admin</a>',
  stripe_customer: '<a href="url">Stripe</a>',
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

## Elixir

Please check the documentation on [set_sample_data](/guides/custom-data/sample-data.html)


## Node.js

```js
const tracer = appsignal.tracer();
const span = tracer.currentSpan();
span.set("user", user_id);
span.set("admin_url", '<a href="url">Admin</a>');
span.set("stripe_customer", '<a href="url">Stripe</a>');
span.set("locale", locale);
span.set("default_locale", default_locale);
```

In AppSignal you can see the tag when you open a sepecific [Performance incident](https://appsignal.com/redirect-to/app?to=performance)
![Tag a request](/assets/images/screenshots/tags/tags.png)

## Limitations

Tags that do not meet these limitations are dropped without warning.

### Ruby

- The tag key must be a `String` or `Symbol`.
- The tagged value must be a `String`, `Symbol` or `Integer`.
- The length of the tag key and tagged value must be less than 100 characters.

### Node.js

- The tag key must be a `String`.
- The tagged value must be a `String`, `Number` or `Boolean`.
