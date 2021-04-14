---
title: "Uptime monitoring"
---

With AppSignal uptime monitoring you can receive alerts when your application is down.
We check the given URL of your application from multiple regions across the world and will open an alert when any of these regions can't reach the given URL. We also graph the performance of this endpoint from different regions around the world.

![Screenshot of uptime monitoring page](/assets/images/screenshots/uptime_monitoring.png)

## Setup

To setup a new uptime monitor check, click the "Add uptime monitor" button on the Uptime Monitoring page.

![Screenshot of uptime monitoring setup page](/assets/images/screenshots/uptime_monitoring_setup.png)

Fill out the name and provide a full url (including http/https) to the page you'd like to check. Note that we consider any response in the 200 range a succesfull request and any other response code will yield a failure.

Use the description field to help out anyone who receives the alert, by providing information on who to contact or how to solve the issue.

Select a notifier to recieve notifications when the endpoint does not return a 200 state. Sometimes there can be small network hickups, we recommend to use a warmup of at least 1 minute to prevent alerts being sent when there's not actually an issue.


## Regions

We will request the given URL from the following regions:

* Asia-Pacific (Seoul)
* Europe (Frankfurt)
* North-America (N. Virginia)
* South-America (São Paulo)


### IP whitelisting

We run our uptime checks on a serverless framework and have no control over what IP address will be used to make the request to the given URL. Therefore at this moment we're unable to provide a list of IP addresses to whitelist. Right now this feature requires the given URL to be publicly reachable.


## Metrics

For every uptime monitor check we create serveral custom metrics you can use to set your own (custom) triggers on. These metrics are:


### Error count

This metric is a **Counter** that is either 0 if there's no issue, or 1 when there is an issue.

![Screenshot of uptime monitoring error count custom metrics form](/assets/images/screenshots/uptime_monitoring_error_count.png)


The metric name is `uptime_monitor_error_count` and the tags are:

* `region` the region we made the request from, region tags are:
  * `asia-pacific`
  * `europe`
  * `north-america`
  * `south-america`
* `name` the name of the uptime monitor check.


### Endpoint performance

This metric is a **Gauge** that is tracks the duration per region.

![Screenshot of uptime monitoring performance custom metrics form](/assets/images/screenshots/uptime_monitoring_performance.png)


The metric name is `uptime_monitor_duration` and the tags are:

* `region` the region we made the request from, region tags are:
  * `asia-pacific`
  * `europe`
  * `north-america`
  * `south-america`
* `name` the name of the uptime monitor check.
