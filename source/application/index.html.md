---
title: "Applications"
---

Applications (previously known as "sites", also referred to as "apps") are Ruby, Elixir and JavaScript front-end applications monitored by AppSignal. Every application is unique by the combination of its name and environment.

A list of Applications appears on the [Application index] and in the application quick switcher. Every application has a parent [organization](/organization/index.html), which can have multiple applications. (Exception: Organizations created by the Heroku add-on only support one application.)

## Adding applications

To add a new Application to AppSignal, please follow the [add a new application setup wizard](/application/new-application.html).

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

## Running multiple applications on one host

When running multiple applications on one host some odd behavior may occur. This is because the default configuration of our AppSignal libraries assume a one application per host setting.

One common problem we've seen is that Applications start reporting under different names and/or environments. Such as an application switching between the staging and production environment after a deploy or restart of an application process or worker.

To allow AppSignal to be used for multiple applications on one host we need to set the `working_directory_path` configuration option ([Ruby](/ruby/configuration/options.html#option-working_directory_path) / [Elixir](/elixir/configuration/options.html#option-working_directory_path)). Using this configuration option, set a working directory path per application so that the AppSignal agent will not stop agents for other Applications that are running.

Read more about the AppSignal [working directory](/appsignal/how-appsignal-operates.html#working-directory).

## Removing an application

An application (app) in AppSignal is defined as the combination of the application name and environment, e.g. "My app - production". You can only delete one environment at a time through the UI.

Apps are automatically recreated when our servers receive data from your app. To remove an app, first make sure AppSignal is completely uninstalled from your applications before removing it on AppSignal.com

Please follow the uninstall guide for the programming language of your application(s) listed below:

- [Ruby gem uninstall guide](/ruby/installation.html#uninstall)
- [Elixir package uninstall guide](/elixir/installation.html#uninstall)
- [JavaScript for Front-end package uninstall guide](/front-end/installation.html#uninstall)

When your app is no longer pushing data to the AppSignal servers, delete your app on the [App Settings page](https://appsignal.com/redirect-to/app?to=edit) for your app on AppSignal.com.

- Visit the [App Settings](https://appsignal.com/redirect-to/app?to=edit) page.
- Scroll down to the bottom of the page.
- In the "Delete &lt;app name&gt;" section, click on the "delete &lt;app name&gt;" button and confirm the confirmation prompt.

Your app is now scheduled for deletion. It and all its data will be removed from your organization and our servers. This may take a few minutes, after which it will disappear from your apps list.

[Application index]: https://appsignal.com/accounts

## Migrating an application

If you do not want to move the metric and sample history of an application we'd recommend to deploy your application with the new organisation's push API key and your app should appear under the new organisation right away. Once the deploy is complete, you can remove the old app.

If you like to have the history of the application as well, you will then need to <a href="mailto:support@appsignal.com">contact us</a> so we can help you in this process by going through the following steps.

 - Step 1. First you'd need to update your PUSH API key for the app you'd like to move to an app-specific key, instead of an organisation-specific key. This ensures data that's being sent during the move will end up under the correct app.  You can find the app-specific key [here](https://appsignal.com/redirect-to/app?to=info).

 - Step 2. Once you inform us that you have taken care of the step above, we will then move the application data to the new organisation, this can take a couple of hours, depending on the amount of samples.

 - Step 3. Once the data migration is complete, we move the app itself to the new organisation. Note that we can't migrate everything, as some things are account specific, such as certain integration such as Jira/GitHub or notifiers such as Slack.

 - Step 4. Deploy the app again with the new organisation-specific API key (from the new organisation). The migration is now complete.
