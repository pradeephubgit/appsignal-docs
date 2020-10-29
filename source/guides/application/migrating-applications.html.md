---
title: "Migrating applications between organizations"
---

While it's not possible to directly transfer apps between organizations in the AppSignal.com interface, they can be moved with some configuration changes. We do not have an option for migrating on the AppSignal.com app because of these configuration changes. The organization-level Push API key needs to be changed in an app to migrate an app.

To migrate an app you can choose to [either keep](#migration-with-app-data-and-history), or [not keep](#migration-without-keeping-app-data-and-history) the app's data and history: errors, performance measurements, metrics, etc.

## Migration without keeping app data and history

If you do not want to keep the app's data we recommend to update your application config with the new organization's Push API key. After a deploy, a new app with the same name and environment will appear under the new organisation. Once the new app reports data, you can remove the old app in the other organization.

## Migration with app data and history

If you like to have the history of the application as well, you will then need to [contact us][contact] so we can help you in this process by going through the following steps.

 - Step 1
  - First you'd need to update your Push API key for the app you'd like to move to an app-specific key, instead of an organization-specific key. This ensures data that's being sent during the move will end up under the correct app.  You can find the app-specific key in the [app settings section][app settings], the second key listed there.
 - Step 2
  - Once you [inform us][contact] that you have taken care of the step above, we will then move the application data to the new organization. This process can take a couple of hours, depending on the amount of samples.
 - Step 3
  - Once the data migration is complete, we move the app itself to the new organization.
  - Note that we can't migrate everything, as some things are organization specific, such as certain integration such as Jira/GitHub or notifiers such as Slack.
 - Step 4
  - Deploy the app again with the new organization-specific API key (from the new organization) as found in the [app settings section][app settings], first key listed there.
  - The migration is now complete.

[contact]: mailto:support@appsignal.com
[app settings]: https://appsignal.com/redirect-to/app?to=info
