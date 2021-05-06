---
title: "Heroku Logplex Logdrain setup"
description: "Learn how to set up Heroku Logplex Logdrains for AppSignal."
---

Most of the Heroku-specific features on AppSignal require a Logplex Logdrain in order to function.

You only have to setup this logdrain once per application and it will provide data for all features such as errors, dashboards and host metrics.

!> **Warning**: This will send **all** of your app's logs to our endpoint, not just the metrics. Our endpoint only parses the Logplex errors, Postgres/Redis/Host metrics and ignores the rest of your logs.

```
heroku drains:add "https://appsignal-endpoint.net/logplex?api_key=<push_api_key>&name=<app_name>&environment=<app_environment>"
```

Make sure to replace the placeholders (`<push_api_key>`, `<app_name>` and `<app_environment>`) with your AppSignal organization's Push API key, your app's name and environment. Make sure your app's name and environment match exactly with your app's AppSignal configuration. These values are case sensitive.

You can find your Push API key, app name and environment on AppSignal.com at ["App settings > Push & Deploy"](https://appsignal.com/redirect-to/app?to=info).

Once the logdrain is setup, [errors](/heroku/logplex-errors.html) and [dashboards](/heroku/dashboards.html) should appear automatically. Additional setup is required for [Host Metrics](/heroku/host-metrics.html).
