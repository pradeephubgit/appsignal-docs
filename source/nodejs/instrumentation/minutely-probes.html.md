---
title: "Minutely probes"
---

Minutely probes are a mechanism to periodically send custom metrics to AppSignal. In minutely intervals from when the probe was first created, a user-defined function can be called in which you can capture metrics to send them to AppSignal. Minutely probe functions are ran asynchronously.

Starting with version `2.3.0`, you can enable or disable minutely probes entirely with the [`enableMinutelyProbes`](/nodejs/configuration/options.html#option-enableminutelyprobes) config option.

## Creating probes

If you need to track custom metrics from your app, you can add your own probe(s). To register a probe, you must call the `probes.register()` method with two arguments: a probe name, and an anonymous function to be called once every minute.

```js
const meter = appsignal.metrics();
const probes = meter.probes();

// the callback is fired once every minute from when
// `register` is called
probes.register("database", () => {
  meter.setGauge("database_size", 10);
});
```

To ensure all minutely probes are ran in a timely manner, it is important to avoid blocking the event loop for long periods inside a minutely probe callback.

## Overriding default probes

By default, `@appsignal/nodejs` configures a minutely probe which keeps track of Node.js V8 heap statistics. To disable this probe, use `probes.unregister()`:

```js
const probes = appsignal.metrics().probes();

probes.unregister("v8_stats");
```

Before version `2.3.0`, `probes.unregister()` is not available. In versions before `2.3.0`, you can use the [`enableMinutelyProbes`](/nodejs/configuration/options.html#option-enableminutelyprobes) config option to disable the default probe.
