---
title: "AppSignal for JavaScript configuration"
---

## `Appsignal` options

The `Appsignal` object can be initialized with the following options:

| Config key | Type | Description  |
| ------ | ------ | ----- |
|  key  |  string  |  Your AppSignal Push API key.  |
|  uri  |  string  |  (optional) The full URI of an AppSignal Push API endpoint. This setting will not have to be changed. |
|  namespace  |  string  |   (optional) A namespace for errors.  |
|  revision  |  string  |   (optional) A Git SHA of the current revision. |
|  ignoreErrors  |  RegExp[]  |   (optional) An array of `RegExp`s to check against the `message` property of a given `Error`. If it matches, the error is ignored. Do not use a global flag in any regular expressions, as it may cause [unexpected behavior](http://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test#using_test_on_a_regex_with_the_global_flag) leading to some errors not being ignored. |
