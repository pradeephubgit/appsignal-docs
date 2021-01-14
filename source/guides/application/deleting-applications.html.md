---
title: "Removing an application"
---

An application (app) in AppSignal is defined as the combination of the application name and environment, e.g. "My app - production". You can only remove/delete one environment at a time through the UI.

-> 💡 Apps are automatically recreated when our servers receive data from your app. To remove an app, first make sure AppSignal is completely uninstalled from your applications before removing it on AppSignal.com

Please follow the uninstall guide for the programming language of your application(s) listed below:

- [Ruby gem uninstall guide](/ruby/installation.html#uninstall)
- [Elixir package uninstall guide](/elixir/installation.html#uninstall)
- [JavaScript for Front-end package uninstall guide](/front-end/installation.html#uninstall)

When your app is no longer pushing data to the AppSignal servers, remove your app on the [App Settings page](https://appsignal.com/redirect-to/app?to=edit) for your app on AppSignal.com.

- Visit the [App Settings](https://appsignal.com/redirect-to/app?to=edit) page.
- Scroll down to the bottom of the page.
- In the "Delete &lt;app name&gt;" section, click on the "delete &lt;app name&gt;" button and confirm the confirmation prompt.

Your app is now scheduled for deletion. It and all its data will be removed from your organization and our servers. This may take a few minutes, after which it will disappear from your apps list.

## See also

- [Application topic](/application/)
- [Guides index](/guides/)
