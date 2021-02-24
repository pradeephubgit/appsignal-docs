---
title: "Public Endpoint - JSON Metrics"
---

This API endpoint is provided to add additional metrics to AppSignal, where an existing integration can't be used or the language used isn't supported (yet).

This endpoint is meant for integrations that send aggregated metrics over a small period, it's preferred to send one request every 5 seconds with 100 metrics over 100 requests per 5 minutes with one metric each.

## Endpoint

Request method: `POST`

| Endpoint | Description|
| --- | --- |
| https://appsignal-endpoint.net/metrics/json | Accepts JSON formatted data |

## URL parameters

| Parameter | Type | Description |
| --- | --- | --- |
| api_key | String | **Front-end** API key, can be found in [App settings](https://appsignal.com/redirect-to/app?to=info). |


```
https://appsignal-endpoint.net/metrics/json?api_key=<api_key>
```

## Body parameters

The post body should contain JSON formatted metrics separated by a newline, or as a full json body.

| Parameter | Type | Description |
| --- | --- | --- |
| name | String | Name of metric, shouldn't contain spaces or special characters, e.g. only (`[a-zA-Z0-9-_]`) |
| metricType | String | Metric type, can be one of `[gauge, counter, timing, histogram]` |
| value | Float | (Float) value |
| tags | Object<String, String> | Object containing tags. Both key and value should be a string, for example: `{ "hostname": "frontend1" }` |


Example of JSON body

```json
[
  {"name": "traffic_gauge", "metricType": "gauge", "value": 19.8, "tags": {"hostname": "frontend1"}},
  {"name": "error_counter", "metricType": "counter", "value": 10, "tags": {"hostname": "frontend1", "disk": "vda"}},
  {"name": "duration_timing", "metricType": "timing", "value": 19, "tags": {"lambda": "login"}},
  {"name": "duration_timing", "metricType": "histogram", "value": 5, "tags": {"lambda": "login"}}
]
```


Example of newline-separated body:

```
{"name": "traffic_gauge", "metricType": "gauge", "value": 19.8, "tags": {"hostname": "frontend1"}}\n
{"name": "error_counter", "metricType": "counter", "value": 10, "tags": {"hostname": "frontend1", "disk": "vda"}}\n
{"name": "duration_timing", "metricType": "timing", "value": 19, "tags": {"lambda": "login"}}\n
{"name": "duration_timing", "metricType": "histogram", "value": 5, "tags": {"lambda": "login"}}\n
```


-> **Note**: This endpoint is optimized for large amounts of traffic and does not validate the API key or payload, a `200` (`OK`) response is returned when the body size is within the `200k` limit. This doesn't mean the request is accepted when received.
