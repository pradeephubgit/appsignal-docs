---
title: "Tagging and Sample Data"
---

You can supply extra context on errors and performance issues using tags and sample data. 
This can help to add information that is not already part of the request, session or environment parameters.


!> **Warning**: Do not use tagging to send personal data such as names or email
   addresses to AppSignal. If you want to identify a person, consider using a
   user ID, hash or pseudonymized identifier instead. You can use
   [link templates](/application/link-templates.html) to link them to your own
   system.

-> 📖 Also read our guide on [how to set up tags and sample data](/guides/tagging-sample-data.html).

## Tags

Using tags you can easily add more information to errors and performance issues
tracked by AppSignal.

### Link templates

Tags can also be used to create link templates. Read more about link templates
in our [link templates guide](/application/link-templates.html).


## Sample Data

Besides tags you can add more metadata to a transaction (or override default metadata from integrations such as Phoenix).
