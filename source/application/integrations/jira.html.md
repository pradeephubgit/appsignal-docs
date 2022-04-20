---
title: "Jira"
---

[Jira](https://www.atlassian.com/software/jira)  is the tracker for teams planning and building great products.

## Configuring Jira

Before we can link AppSignal to Jira we need to configure Jira to accept our OAuth request.

Sign in to Jira and open the "Settings" (Cogwheel) menu on the bottom of the sidebar. Then select "Products".

![Administration navigation](/assets/images/screenshots/jira/navigation.png)

In the "Product settings" screen look for the "Application links" under the "Integrations" section in the navigation.

![Application links navigation](/assets/images/screenshots/jira/application_links.png)

You'll be presented with a small form for a URL. Enter: `https://appsignal.com` in the field for a new Application Link.

If you receive a "No response was received from the URL you entered" error. Don't be alarmed, this is actually OK. Now click "continue".

### Application details

In the modal, only fill out the "Application Name".

![Application setup](/assets/images/screenshots/jira/setup.png)

After saving the integration, click the "Edit" icon for the newly created integration and go to the "Incoming Authentication" tab in the new modal.

![OAuth navigation](/assets/images/screenshots/jira/oauth_navigation.png)

### OAuth setup

In the "Incoming OAuth" tab, setup OAuth with the following values:

* Consumer Key: `7668c385bf3f09c0219ec178a50ff736`
* Consumer Name: `AppSignal`
* Public Key:

```
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAzDFa3UEFFJ95IcKkgxT7
D5RBH1iuQjronacnEqN7PiuIaxnAdFKTNcSPz1u7qxKefx0l0cYkj3fLoMyygYza
tmBIQSleUvj3dRxgX56d1U4rkbYFq6cf2DorJBWRSMdPPOavO11IUOK+W+Yb+/MR
vR5sPVDh2VRwPJWUUWa+MGPbXdcpHH+e5YLx7ug2RWnxIbPqUoqpeTE3kz8YD/91
RiQKfPTDuUzY44vkWcJvdSpEqgNXyOwx5Vb2Opnf1P4rxc28nhHt64s+U1g8eR81
5LKYZsG1Ci9EduIk+uivrtFVd2z37pDrQWkITFxo8i0PWGXwSkGB8PYs3xsFseJS
wQIDAQAB
-----END PUBLIC KEY-----
```

And finally, save the OAuth configuration.

## Configuring AppSignal

Now that the Jira-end is setup up we can [link it to AppSignal](https://appsignal.com/redirect-to/app?to=integrations/jira/edit). (Open the application in AppSignal you want to link Jira to and go to "Integrations" (left-hand side navigation bar, "Configure" section).)

Enter in the "Jira installation location" the root path of your Jira app, e.g. `https://appsignal-test-1.atlassian.net`. Press "Link AppSignal to Jira".

You'll be presented with an authentication confirmation screen.

![Jira OAuth confirmation](/assets/images/screenshots/jira/authentication.png)

Upon pressing "Allow" you'll be returned to AppSignal. Here you need to select which project and issue type you want to use for AppSignal issues.

If, upon selecting a issue type, you get an error, please read the ["Errors"](#errors) section for what to do.

## Errors

AppSignal requires a number of fields to be present when the integration is activated. If fields are missing, we will show an error message during the setup.

Required fields are:

* Labels
* Environment
* Summary
* Description

In order to fix these messages, you have to add the fields to the Jira screens by going to the "Issues" tab in the "Settings" menu. First check which "screen" your issue type is using on the "Issue types" page, in the "Related Schemes" column for the issue type you selected in AppSignal.

Then navigate to the "Screens" page in the "Screens" section.

![Issues screens page](/assets/images/screenshots/jira/screens.png)

Click on "Configure" in the "Actions" column for the relevant "Screen".

On this "Configure" page you'll be presented with a list of fields that are configured in this Jira screen. Go to the bottom of the page where the new field dropdown is located and select the required fields, as listed in the ["Errors"](#errors) section, from the dropdown. Go back to AppSignal and relink the Jira issue type.

![Issue fields](/assets/images/screenshots/jira/fields.png)

Getting Jira working can be a bit of a hassle, but it should work if you follow the above steps with care. If you run into any issues, don't hesitate to contact us at [support@appsignal.com](mailto:support@appsignal.com) if other errors occur.
