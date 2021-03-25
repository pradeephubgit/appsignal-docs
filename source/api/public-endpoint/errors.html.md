---
title: "Public Endpoint - Errors"
---

This Error API endpoint is provided to add additional errors to AppSignal, where an existing integration can't be used or the language used isn't supported (yet).

## Endpoint

Request method: `POST`

| Endpoint | Description|
| --- | --- |
| https://appsignal-endpoint.net/errors | Accepts JSON formatted data |

## URL parameters

| Parameter | Type | Description |
| --- | --- | --- |
| api_key | String | **Front-end** API key, can be found in [App settings](https://appsignal.com/redirect-to/app?to=info). |


```
https://appsignal-endpoint.net/errors?api_key=<api_key>
```

## Body parameters

The post body should contain a JSON object, formatted as follows:

| Parameter | Type | Description |
| --- | --- | --- |
| timestamp | Integer | (Epoch) timestamp when error occurred |
| action | String | (Optional) Action name where error occurred (e.g. `BlogpostController#show` or `UserInfoLambda#perform`) |
| namespace | String | Namespace where error occurred (e.g. `frontend` or `lambda` ) |
| error | Error | Error object, see description below |
| revision | String | (Optional) Full (GIT) revision hash of application |
| tags | Object<String, String> | (Optional) Tags to filter the sample on, or to provide additional context. Make sure both key and values are strings (e.g. `{"account_id": "abc-123"}`) |
| params | Object<String, String> | (Optional) Parameters that were given to the function where the error occurred. Make sure both key and values are strings (e.g. `{"id": "abc-123"}`) |
| environment | Object<String, String> | (Optional) Environment values that were set when the error occurred. Make sure both keys and values are strings (e.g. `{"REGION": "eu-central-1"}`)  |
| breadcrumbs | Array<Breadcrumb> | (Optional) Array of breadcrumbs, recorded before the error occurred. See below for description of Breadcrumb object |
| language | String | (Optional) Language string, used to format the backtrace. Accepted values are `ruby`, `javascript`. Leave empty when using another language |

Error:

| Parameter | Type | Description |
| --- | --- | --- |
| name | String | Error name (e.g. `StandardError`) |
| message | String |  (Optional) Error message |
| backtrace | Array<String> |  (Optional) Array of backtrace lines, each line should be a string |

Breadcrumb:

| Parameter | Type | Description  |
| ------ | ------ | ----- |
|  category  |  String  |  Category to label the event under (e.g. `network` or `navigation`) |
|  action  |  String  |  Contextual information related to the event  |
|  message  |  String  |  (optional) A log message or other string to send to AppSignal  |
|  metadata  |  Object<string, string>  |  (optional) An object of metadata related to the event  |

For example:

```json
{
  "action": "BlogpostController#show",
  "namespace": "frontend",
  "timestamp": 1559201249,
  "error": {
    "name": "StandardError",
    "message": "Error message",
    "backtrace": [
      "backtrace/line:1",
      "backtrace/line:2"
    ]
  },
  "environment": {
    "os": "windows",
    "agent": "super secret user agent"
  },
  "params": {
    "foo": "bar"
  },
  "tags": {
    "account_id": "abc-123"
  },
  "revision": "revision-abc",
  "breadcrumbs": [
    {
      "timestamp": 1559201249,
      "category": "request",
      "action": "http://google.com",
      "message": "request failed",
      "metadata": {
        "code": "not_found"
      }
    }
  ],
  "language": "javascript"
}
```

-> **Note**: This endpoint is optimized for large amounts of traffic and does not validate the API key or payload, a `200` (`OK`) response is returned when the body size is within the `200k` limit. This doesn't mean the request is accepted when received.
