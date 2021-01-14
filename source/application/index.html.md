---
title: "Applications"
---

Applications (previously known as "sites", also referred to as "apps") are Ruby, Elixir and JavaScript front-end applications monitored by AppSignal. Every application is unique by the combination of its name and environment.

A list of Applications appears on the [Application index] and in the application quick switcher. Every application has a parent [organization](/organization/index.html), which can have multiple applications. (Exception: Organizations created by the Heroku add-on only support one application.)

## Adding applications

If you're just getting started with AppSignal and haven't set up your first app yet, please follow the [add a new application guide](/guides/new-application.html) first.

-> 📖 Read our [add a new application guide](/guides/new-application.html).

## Environments

An application can have multiple [environments](/appsignal/terminology.html#environments) as long as every environment uses the same application name. Every environment is currently listed separately on the [Application index].

- "Demo application" - development
- "Demo application" - production
- "Demo application" - staging
- "Demo application" - test

## Namespaces

Namespaces are a way to group error incidents, performance incidents from [actions](/appsignal/terminology.html#actions), and host metrics in your app. By default AppSignal provides three namespaces: the "web", "background" and "frontend" namespaces. You can add your own namespaces to separate parts of your app like the API or Admin panel.

Namespaces can be used to group together incidents that are related to the same part of an application. It's also possible to configure notification settings on a per-namespace level.

Read more about [namespaces](namespaces.html) and how to configure them for your app.

## See also

- [📖 Removing an application guide](/guides/application/deleting-applications.html)
- [📖 Migrating an application between organizations guide](/guides/application/migrating-applications.html)
- [📖 Running multiple applications on one host](/guides/application/multiple-applications-on-one-host.html)

[Application index]: https://appsignal.com/accounts
