---
title: Shortcut (formerly Clubhouse)
---

Shortcut (formerly Clubhouse) describes itself as the first project management platform for software development that brings everyone on every team together to build better products.

The Shortcut integration is a personal integration, each person with access to an app (who wants to be able to use this feature) has to complete these steps. This integration __does not__ automatically create issues on Shortcut, to prevent story-overload.

Website: [Shortcut.com](https://shortcut.com/)

## Features

- Create Shortcut stories for error & performance incidents in AppSignal.
  - On an incident detail page go to the "Issue trackers" box on the right-hand side of the page.
  - Click "Send to Shortcut"

## Setting up

- Visit your Shortcut account's API token section: [app.shortcut.com/settings/account/api-tokens](https://app.shortcut.com/settings/account/api-tokens)
  - Generate a new API token by entering a name for it, e.g. AppSignal.
  - Click "Generate Token".
  - The generated token will be displayed. Copy it.
    - It will have this format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`
- [Visit the AppSignal Shortcut integration page](https://appsignal.com/redirect-to/app?to=integrations/shortcut/edit) for the app you want to link.
  - Paste the Shortcut API token into the "API token" field.
  - Click the "create integration" button.

AppSignal is now set up to use the Shortcut integration!