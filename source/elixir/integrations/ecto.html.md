# Instrumenting Ecto queries

AppSignal uses Ecto’s Telemetry instrumentation to gain information about queries ran in your app by attaching a handler that gets called whenever a query is executed.

## Automatic instrumentation

The Ecto instrumentation automatically hooks into your Ecto repos if you've set your `:otp_app` configuration to match your app's OTP app name. The new installer wil automatically set that option, but you'll need to add it to your appsignal.exs  config file manually when upgrading:

``` elixir
config :appsignal, :config,
  otp_app: :appsignal_phoenix_example, <--
  name: "appsignal_phoenix_example",
  push_api_key: "your-api-key",
  env: Mix.env
```

The integration thens use your app's configuration to find out which repos are configured, as your app will have a configuration line like this in config/config.exs :

``` elixir
config :appsignal_phoenix_example,
  ecto_repos: [AppsignalPhoenixExample.Repo]
```

## Manual handler attachment

For repos that aren't listed in the `:ecto_repos` configuration, you can attach a handler manually when starting your app’s supervisor. In most applications, this is done in your application’s `start/2` function.

``` elixir
def start(_type, _args) do
  children = [
    AppsignalPhoenixExample.Repo,
    AppsignalPhoenixExampleWeb.Endpoint
  ]

  :telemetry.attach(
    "appsignal-ecto",
    [:appsignal_phoenix_example, :repo, :query],
    &Appsignal.Ecto.handle_event/4,
    nil
  )

  opts = [strategy: :one_for_one, name: AppsignalPhoenixExample.Supervisor]
  Supervisor.start_link(children, opts)
end
```

In this example, we’ve attached the Telemetry handler to our Phoenix application by calling `:telemetry.attach/4` with the following arguments:

#### Argument 1

`"appsignal-ecto"` is the name of the handler. This should be unique. If you have multiple repos you’d like to have instrumentation for, give each a unique name (like `"appsignal-ecto-1"` and `"appsignal-ecto-2"`).

#### Argument 2

`[:appsignal_phoenix_example, :repo, :query]` is the name of the event to watch. It’s a combination of the repo module’s name (`AppsignalPhoenixExample.Repo`), and the event name (`:query`).

If you're using a repo that's nested every level is it's own element. `Apps.AppsignalPhoenixExample.Repo` would result in `[:apps, :appsignal_phoenix_example, :repo, :query]`.

#### Argument 3
`&Appsignal.Ecto.handle_event/4` is the function the event will be sent to in the AppSignal integration.

#### Argument 4

We’ll omit the handler configuration by passing `nil` as the fourth argument.

## Telemetry < 0.3

For versions of Telemetry &lt; 0.3.0, you'll need to call it slightly differently:

```elixir
Telemetry.attach(
  "appsignal-ecto",
  [:appsignal_phoenix_example, :repo, :query],
  Appsignal.Ecto,
  :handle_event,
  nil
)
```
