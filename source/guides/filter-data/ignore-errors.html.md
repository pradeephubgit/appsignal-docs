---
title: "Ignore errors"
---

Errors (or exceptions) raised by an app will be visible in the [Error incident list](https://appsignal.com/redirect-to/app?to=exceptions). Not all errors are important and can be ignored.

To prevent AppSignal from reporting these errors and alerting you, you can add a list of errors to ignore in the app's configuration. Ignoring errors will filter out the error data from the data sent to AppSignal. The filtered error will not be visible in the incident lists.

-> 🔕 If you only don't want to be notified about certain errors, but still report them, please [read about our notification settings][notifications] to customize the app's notification settings.

## Ignoring errors

To ignore errors, it's possible to configure an "ignore errors" _denylist_ in the AppSignal integration configuration. By adding error names to this list the integrations will know not to send any ignored error data along with the other app data.

For each configuration the "ignore errors" list needs to be set in the AppSignal configuration. Read this guide for the integration language your app uses to configure the ignored errors list.

-> 💡 It's not possible to ignore all errors, or disable error reporting entirely. It is possible to [disable notifications for errors][notifications].

## Ruby

To ignore errors in Ruby, add the following to your AppSignal configuration file. The [`ignore_errors`][ruby ignore_errors] value is an Array of Strings.

```yaml
# Example: config/appsignal.yml
production:
  ignore_errors:
    - ActiveRecord::RecordNotFound
    - ActionController::RoutingError
```

-> ⚠️ Names set in [`ignore_errors`][ruby ignore_errors] will be matched on class name and not class inheritance. If you want to match all subclasses of a certain Exception, all subclasses have to be listed separately.

###^ruby Read more

- Read more about the [Ruby `ignore_errors` config option][ruby ignore_errors].
- [Exception handling with AppSignal in Ruby](/ruby/instrumentation/exception-handling.html).

[ruby ignore_errors]: /ruby/configuration/options.html#option-ignore_errors

## Elixir

To ignore errors in Elixir, add the following to your AppSignal configuration file. The [`ignore_errors`][elixir ignore_errors] value is a List of Strings.

```elixir
# Example: config/appsignal.exs
config :appsignal, :config,
  ignore_errors: ["SpecificError", "AnotherError"]
```

-> ⚠️ Names set in [`ignore_errors`][elixir ignore_errors] will be matched on module name.

###^elixir Read more

- Read more about the [Elixir `ignore_errors` config option][elixir ignore_errors].
- [Exception handling with AppSignal in Elixir](/elixir/instrumentation/exception-handling.html).

[elixir ignore_errors]: /elixir/configuration/options.html#option-ignore_errors

## Node.js

To ignore errors in Node.js, add the following to your AppSignal configuration file. The [`ignoreErrors`][nodejs ignore_errors] value is an Array of Strings.

```js
// Example: appsignal.js
const { Appsignal } = require("@appsignal/nodejs");

const appsignal = new Appsignal({
  // Other config
  ignoreErrors: ["SpecificError", "AnotherError"]
});
```

-> ⚠️ Names set in [`ignoreErrors`][nodejs ignore_errors] will be matched on the `Error` objects `name` property only, and will not honor any class inheritance. If you want to match subclasses of `Error`, each subclass has to be listed separately.

###^nodejs Read more

- Read more about the [Node.js `ignoreErrors` config option][nodejs ignore_errors].
- [Exception handling with AppSignal in Node.js](/nodejs/tracing/exception-handling.html).

[nodejs ignore_errors]: /nodejs/configuration/options.html#option-ignoreErrors

## Front-end JavaScript

To ignore errors in Front-end JavaScript, add the following to your AppSignal configuration file. The [`ignoreErrors`][js ignore_errors] value is an Array of Regular expressions.

```js
// Example: appsignal.js
import Appsignal from "@appsignal/javascript"

const appsignal = new Appsignal({
  // Other config
  ignoreErrors: [/a specific error message/, /another error message/]
});
```

-> ⚠️ Names set in [`ignoreErrors`][js ignore_errors] will be matched by using a regular expression. The regular expression is matched `message` property of a given `Error`.

###^javascript Read more

- Read more about the [front-end JavaScript `ignoreErrors` config option][js ignore_errors].
- [Exception handling with AppSignal in Node.js](/nodejs/tracing/exception-handling.html).

[js ignore_errors]: /front-end/configuration/

## Next steps

- [Ignoring actions](/guides/filter-data/ignore-actions.html) - the next step in this guide

---

- [Request header collection](/guides/filter-data/filter-headers.html) - the previous step in this guide
- [Filtering app data](/guides/filter-data/) - the start of this guide
- [Getting started guides](/guides/) - Guides overview

[notifications]: /application/notification-settings.html
