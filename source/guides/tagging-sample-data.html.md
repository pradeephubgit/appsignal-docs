---
title: "Tagging and sample data"
---
You can supply extra context on errors and performance issues. This can help to add information that is not already part of the request, session or environment parameters.

## Tags

Using tags you can easily add more information to errors and performance issues
tracked by AppSignal.


### Ruby

#### Limitations


- The tag key must be a `String` or `Symbol`.
- The tagged value must be a `String`, `Symbol` or `Integer`.
- The length of the tag key and tagged value must be less than 100 characters.

Tags that do not meet these limitations are dropped without warning.

```ruby
# Good, I18n.locale/default_locale returns a symbol
Appsignal.tag_request(
  user: current_user.id,
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

### Elixir

#### Limitations
- The tag key must be a `String` or `Atom`.
- The tagged value must be a `String`, `Atom` or `Integer`.

Tags that do not meet these limitations are dropped without warning.

`set_sample_data` can be called multiple times, but only the last value will be retained:

```elixir
Appsignal.Transaction.set_sample_data("tags", %{locale: "en"})
Appsignal.Transaction.set_sample_data("tags", %{user: "bob"})
Appsignal.Transaction.set_sample_data("tags", %{locale: "de"})
```
will result in the following data:

```elixir
%{
  locale: "de"
}
```

### Node.js

#### Limitations

- The tag key must be a `String`.
- The tagged value must be a `String`, `Number` or `Boolean`.

Tags that do not meet these limitations are dropped without warning.

```js
const span = tracer.currentSpan();
span.set("a key", "value"); // sets a tag
```
