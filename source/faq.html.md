---
title: "Frequently Asked Questions"
---

- AppSignal libraries
  - [What programming languages does AppSignal support?](#what-programming-languages-does-appsignal-support)
  - [Filtering data](#filtering-data)
      - [How to ignore actions from your app?](#how-to-ignore-actions-from-your-app)
      - [How to ignore errors in your app?](#how-to-ignore-errors-in-your-app)
      - [How to filter data that's being send to AppSignal?](#how-to-filter-data-thats-being-send-to-appsignal)
  - [How to add additional instrumentation to my app?](#how-to-add-additional-instrumentation-to-my-app)
  - [How to run multiple applications on one host?](#how-to-run-multiple-applications-on-one-host)
  - [What Operating Systems does AppSignal support?](#what-operating-systems-does-appsignal-support)
  - [How to debug an issue with the AppSignal integration?](#how-to-debug-an-issue-with-the-appsignal-integration)
- User account
  - [How to enable two-factor authentication (2FA) for the AppSignal app?](#how-to-enable-two-factor-authentication-2fa-for-the-appsignal-app)
- Applications
  - [How to transfer an app from one organization to another?](#how-to-transfer-an-app-from-one-organization-to-another)

## AppSignal libraries

### What programming languages does AppSignal support?

AppSignal supports the [Ruby](https://www.ruby-lang.org/en/) and [Elixir](https://elixir-lang.org/) programming languages. We also have [JavaScript packages](/front-end) available for the browser to catch client-side errors.

### Filtering data

#### How to ignore actions from your app?

By [ignoring actions](/application/data-collection.html#ignore-actions) it's possible to not record any data for the configured actions, requests, background jobs, etc.

#### How to ignore errors in your app?

By [ignoring errors](/application/data-collection.html#ignore-errors) AppSignal will ignore errors matching the exact name of an error.

#### How to filter data that's being send to AppSignal?

- [Filter parameters and background job arguments](/application/data-collection.html#parameters).
- [Skip sending session data for requests](/application/data-collection.html#session-data).

### How to add additional instrumentation to my app?

Add additional instrumentation to your app to gain more insights in how your application is performing by measuring the duration of separate events. Read how in the documentation for our [Ruby gem](/ruby/instrumentation/instrumentation.html) and [Elixir package](/elixir/instrumentation/instrumentation.html).

### How to run multiple applications on one host?

By default AppSignal is configured to assume one application runs on one host. If you run more than one application on a host, some odd behavior may occur, such as data being reported for a different app.

To configure AppSignal for multiple applications on one host the AppSignal working directory needs to be configured. Read more about how to configure the working directory on our [applications documentation page](https://docs.appsignal.com/application/#running-multiple-applications-on-one-host).

### What Operating Systems does AppSignal support?

Please see our [Operating Systems](/support/operating-systems.html) page for the full list of support Operating Systems and what packages it requires.

### How to debug an issue with the AppSignal integration?

Please see our [debugging guide](/support/debugging.html) for a complete guide to debug issues with the AppSignal integration.

Also check our [known issues](/support/known-issues.html) page for issues that may be present in your version of the AppSignal integration.

## User account

### How to enable two-factor authentication (2FA) for the AppSignal app?

Please see our [two-factor authentication](/user-account/two-factor-authentication.html) page for more information.

## Application

### How to transfer an app from one organization to another?

If you do not want to move the metric and sample history of an application we'd recommend to deploy your application with the new organisation's push API key and your app should appear under the new organisation right away. Once the deploy is complete, you can remove the old app.

If you like to have the history of the application as well, you will then need to <a href="mailto:support@appsignal.com">contact us</a> so we can help you in this process by going through the following steps.

 - Step 1. First you'd need to update your PUSH API key for the app you'd like to move to an app-specific key, instead of an organisation-specific key. This ensures data that's being sent during the move will end up under the correct app.  You can find the app-specific key here: https://appsignal.com/redirect-to/app?to=info

 - Step 2. Once you inform us that you have taken care of the step above, we will then move the application data to the new organisation, this can take a couple of hours, depending on the amount of samples.

 - Step 3. Once the data migration is complete, we move the app itself to the new organisation. Note that we can't migrate everything, as some things are account specific, such as certain integration such as Jira/GitHub or notifiers such as Slack.

 - Step 4. Deploy the app again with the new organisation-specific API key (from the new organisation). The migration is now complete.
