---
title: "Running multiple applications on one host"
---

## The problem

When running multiple applications on one host some odd behavior may occur. One common problem we've seen is that Applications start reporting under different names and/or environments. Such as an application switching between the staging and production environment after a deploy or restart of an application process or worker.

## Background

The AppSignal agent starts using an application config. It uses this configuration to send the data to the AppSignal servers to report it as that app on AppSignal.com.

By default AppSignal is configured to assume one application runs on one host. If you run more than one application on a host, some configuration is required to avoid sharing the AppSignal working directory between multiple applications. This way multiple AppSignal agents can run at the same time with a different application config.

-> 🔍 Read more about the AppSignal [working directory](/appsignal/how-appsignal-operates.html#working-directory).

## Configuration

To allow AppSignal to be used for multiple applications on one host we need to set the "working directory path" configuration option. Using this configuration option, we need to set a unique working directory path per application for AppSignal to store its (temporary) files. This way the AppSignal agent will not share the working directory between multiple applications.

### Ruby

To set the working directory path in the Ruby integration, add the following to your AppSignal configuration file. The [`working_directory_path`][ruby working_directory_path] value is an existing path on your host system.

```yaml
# Example: config/appsignal.yml
production:
  working_directory_path: "/tmp/project_1/"
```

####^ruby Read more

- [Ruby integration `working_directory_path` config option details][ruby working_directory_path]

[ruby working_directory_path]: /ruby/configuration/options.html#option-working_directory_path

### Elixir

To set the working directory path in the Elixir integration, add the following to your AppSignal configuration file. The [`working_directory_path`][elixir working_directory_path] value is an existing path on your host system.

```elixir
# Example: config/appsignal.exs
config :appsignal, :config,
  working_directory_path: "/tmp/project_1/"
```

####^elixir Read more

- [Elixir integration `working_directory_path` config option details][elixir working_directory_path]

[elixir working_directory_path]: /elixir/configuration/options.html#option-working_directory_path

### Node.js

To set the working directory path in the Node.js integration, add the following to your AppSignal configuration file. The [`workingDirectoryPath`][nodejs working_directory_path] value is an existing path on your host system.

```js
// Example: appsignal.js
const { Appsignal } = require("@appsignal/nodejs");

const appsignal = new Appsignal({
  // Other config
  workingDirectoryPath: "/tmp/project_1"
});
```

####^nodejs Read more

- [Node.js integration `workingDirectoryPath` config option details][nodejs working_directory_path]

[nodejs working_directory_path]: /nodejs/configuration/options.html#option-workingdirectorypath

### Front-end JavaScript

No working directory can be configured for Front-end JavaScript applications as it does not rely on the AppSignal agent process. If data is reported for the wrong application, please make sure the application is using the correct [Push API key](/appsignal/terminology.html#push-api-key)

## See also

- [Application topic](/application/)
- [Guides index](/guides/)
