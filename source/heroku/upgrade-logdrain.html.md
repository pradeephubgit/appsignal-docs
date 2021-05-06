---
title: "Heroku Logplex Logdrain upgrade"
description: "Learn how to upgrade Heroku Logplex Logdrains for AppSignal."
---

AppSignal has two endpoints for Heroku Logplex Logdrain data.

One is available on `https://push.appsignal.com` and one on `https://appsignal-endpoint.net`.

The Logplex endpoint on `https://push.appsignal.com` is deprecated and will not be updated with new features.

If you are not sure what endpoint is used currently, navigate to your project folder on your disk and list the current logdrains with the following command:

```
heroku drains
```

To migrate to the new Logdrain endpoint, remove the old drain by copying the old drain from the command above and run

```
heroku drains:remove <drain>
```

Then add the new endpoint drain by running:

```
heroku drains:add "https://appsignal-endpoint.net/logplex?api_key=<push_api_key>&name=<app_name>&environment=<app_environment>"
```

For example:

```
# List current drains
heroku drains
# => https://push.appsignal.com/logplex?api_key=my-api-key&name=HerokuApp&environment=production (d.1225304a-ae76-11eb-8529-0242ac130003)

# Remove old drain
heroku drains:remove https://push.appsignal.com/logplex?api_key=my-api-key&name=HerokuApp&environment=production

# Add new drain
heroku drains:add https://appsignal-endpoint.net/logplex?api_key=my-api-key&name=HerokuApp&environment=production
```
