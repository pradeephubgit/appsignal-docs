---
title: "Node.js Core"
---

Node.js contains several internal modules designed to enable asynchronous I/O capable APIs for your application. AppSignal provides automatic instrumentation for many of these modules.

## `http` instrumentation

AppSignal for Node.js will auto-instrument any incoming HTTP calls. When you create a new `Span`, it will be a child of the `Span` created by the core HTTP integration.

## `https` instrumentation

Appsignal for Node.js will also auto-instrument any incoming HTTPS calls. When you create a new `Span`, it will be a child of the `Span` created by the core HTTPS integration, if the `https` module was used.

## Heap statistics minutely probe

By default, Appsignal for Node.js will register a minutely probe that keeps track of the V8 engine's heap statistics. Once we detect these metrics we'll add a [magic dashboard](https://blog.appsignal.com/2019/03/27/magic-dashboards.html) to your app.

The metrics reported by this method correspond to those reported by the `v8.getHeapStatistics` method in the Node.js standard library. For more details on how to interpret these metrics, [see the official Node.js documentation on the `v8` module](https://nodejs.org/api/v8.html#v8getheapstatistics). The probe will report the following metrics grouped by `hostname` tag:

- `nodejs_total_heap_size` - gauge
- `nodejs_total_heap_size_executable` - gauge
- `nodejs_total_physical_size` - gauge
- `nodejs_used_heap_size` - gauge
- `nodejs_malloced_memory` - gauge
- `nodejs_number_of_native_contexts` - gauge
- `nodejs_number_of_detached_contexts` - gauge
