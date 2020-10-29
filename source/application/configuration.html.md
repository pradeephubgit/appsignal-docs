---
title: "Configuration"
---

Configuration. Important, because without it the AppSignal integrations won't know which application it's instrumenting or in which environment.

In this section we'll explain how configuration works in AppSignal integrations, what options can be configured in the integrations, what the minimal configuration needed is and in what order the configuration is loaded.

-> 📖 Want a more practical read on how to add or change AppSignal configuration? Read our [guide on how to configure AppSignal][guide] in your apps.

## Minimal required configuration

Every app needs to have four key configuration options set for AppSignal to report data for it. These config options help AppSignal identify an app, and group all the data for it in an app environment on AppSignal.com. Every app is a combination of the app name and environment, in AppSignal terminology this is an "app".

These required configuration options are:

- App name
  - The app name as it is reported and shown on AppSignal.com
- App environment
  - The app environment as it is reported and shown on AppSignal.com
- Push API key
  - The key used to identify which organization the app belongs to.
- AppSignal active
  - The config option used to enable, or disable, environments on the host's config. This allows users to disable development and test environments, and only report data for the production and staging environment, for example.

The detailed list of required options per integration can be found in the [configuration options section](#configuration-options). Find the list of required configuration options at the top of each config options page.

-> 💡 For Front-end JavaScript all required options are combined in a [`key` config option][frontend config], and the app name and environment are configured on AppSignal.com during the "add app" wizard.

-> 💡 Some of these configuration options may be set to a default value by the integrations, such as the app name for Rails apps, and environment for Elixir and Node.js apps.

## Configuration options

Every integration has its own set of configuration options. There's a list of shared options and options specific to each integration.

The full list of configuration options can be found in the language integration sections:

- [Ruby configuration options](/ruby/configuration/options.html)
- [Elixir configuration options](/elixir/configuration/options.html)
- [Node.js configuration options](/nodejs/configuration/options.html)
- [Front-end JavaScript configuration options][frontend config]

## Configuration methods

There are two main ways ways to configure AppSignal integrations, by (configuration) file or by system environment variables. Use the configuration method that best fits your app setup.

-> 📖 Read our [guide on how to configure AppSignal][guide] in your app.

## Configuration load order

Depending on the integration the load order of the configuration may differ, please consult the load order page for the integrations for more information:

- [Ruby configuration load order](/ruby/configuration/load-order.html)
- [Elixir configuration load order](/elixir/configuration/load-order.html)
- [Node.js configuration load order](/nodejs/configuration/load-order.html)

## See also

- [AppSignal configuration guide][guide]
- AppSignal integration configuration topics:
    - [Ruby configuration topic](/ruby/configuration/)
    - [Elixir configuration topic](/elixir/configuration/)
    - [Node.js configuration topic](/nodejs/configuration/)
    - [Front-end JavaScript configuration topic][frontend config]

[guide]: /guides/configuration.html
[frontend config]: /front-end/configuration/
