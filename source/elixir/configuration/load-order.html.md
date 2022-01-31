---
title: "AppSignal for Elixir load order"
---

The AppSignal Elixir can be configured in a couple different ways. Through mix
configuration or through environment variables.

The configuration is loaded in a four step process. Starting with the package
defaults and ending with reading environment variables. The configuration
options can be mixed without losing configuration from a different option.
Using an initializer, a configuration file and environment variables together
will work.

## Load order

- 1. [Package defaults - `default`](#default)
- 2. [System detected settings - `system`](#system)
- 3. [Mix app config file - `file`](#file)
- 4. [Environment variables - `env`](#env)
- 5. [Overrides - `override`](#override)

##=default 1. Package defaults

The AppSignal package starts with loading its default configuration, setting
paths and enabling certain features.

The agent defaults can be found in the [package source]
(https://github.com/appsignal/appsignal-elixir/blob/main/lib/appsignal/config.ex)
as `Appsignal.Config.default_config`.

This source is listed as `default` in the [diagnose](/elixir/command-line/diagnose.html) output.

##=system 2. System detected settings

The package detects what kind of system it's running on and configures itself
accordingly.

For example, when it's running on Heroku it sets the configuration option
`:running_in_container` to `true` and `:log` to `"stdout"`.

This source is listed as `system` in the [diagnose](/elixir/command-line/diagnose.html) output.

##=file 3. Mix configuration

The AppSignal package is most commonly configured with configuration in the Mix
configuration file.

```elixir
# config/config.exs
# or config/prod.exs
config :appsignal, :config,
  otp_app: :appsignal_phoenix_example,
  name: "AppsignalPhoenixExample",
  push_api_key: "your-push-api-key",
  env: Mix.env,
  active: true
```

This step will override all given options from the defaults or system
detected configuration.

This source is listed as `file` in the [diagnose](/elixir/command-line/diagnose.html) output.

##=env 4. Environment variables

Our integration will look for its configuration in environment variables.
When found these will override all given configuration options from
previous steps.

```bash
export APPSIGNAL_APP_NAME="AppsignalPhoenixExample"
# start your app here
```

This source is listed as `env` in the [diagnose](/elixir/command-line/diagnose.html) output.

##=override 5. Overrides

When all the configuration is known, our integration will do a final check to find out if the configuration doesn't contradict itself or if some defaults config options are not set.

The "override" configuration source will include those last configuration changes made by the integration. When it overrides a config option value, this value is leading.

For example, at some point we deprecated the `skip_session_data` option in favor of the `send_session_data` option. When the `skip_session_data` config option was configured by the app, but `send_session_data` was not, the integration would use the value of `skip_session_data` to set the `send_session_data` config option value.
