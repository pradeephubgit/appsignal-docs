---
title: "Next.js"
---

The AppSignal integration for [Next.js](https://nextjs.org/) 9.3.0+, designed to be used in conjunction with `@appsignal/nodejs`.

It is recommended to be used with [`@appsignal/javascript`](https://github.com/appsignal/appsignal-javascript/tree/develop/packages/javascript) and [`@appsignal/react`](https://github.com/appsignal/appsignal-javascript/tree/develop/packages/react) on the client-side for full-stack performance monitoring and error tracking.

At this time, it's only possible to use this integration with a [custom server script](https://nextjs.org/docs/advanced-features/custom-server). The integration **does not** work when using the Next CLI (e.g. `next start`).

If you plan to use this in a serverless environment, we recommend using just [`@appsignal/javascript`](https://github.com/appsignal/appsignal-javascript/tree/develop/packages/javascript) and the [`@appsignal/react`](https://github.com/appsignal/appsignal-javascript/tree/develop/packages/react) integration.

## Installation

Add both the `@appsignal/nodejs` and `@appsignal/nextjs` packages to your `package.json`. Then, run `yarn install`/`npm install`.

You can also add these packages to your `package.json` on the command line:

```bash
yarn add @appsignal/nodejs @appsignal/nextjs
npm install --save @appsignal/nodejs @appsignal/nextjs
```

You can then import and use the package in your app.

## Usage

The `@appsignal/nextjs` package exports the `getRequestHandler()` function, which is designed to be used in the place of the `app.getRequestHandler()` method provided by the `next` module.

Create a `server.js` in your project root and add the following:

```js
// ENSURE APPSIGNAL IS THE FIRST THING TO BE REQUIRED/IMPORTED
// INTO YOUR APP!
const { Appsignal } = require("@appsignal/nodejs");

const appsignal = new Appsignal({
  active: true,
  name: "<YOUR APPLICATION NAME>",
  pushApiKey: "<YOUR API KEY>", // Note: renamed from `apiKey` in version 2.2.5
});

const { getRequestHandler } = require("@appsignal/nextjs");

const url = require("url");
const next = require("next");
const { createServer } = require("http");

const PORT = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = getRequestHandler(appsignal, app);

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    // You might want to handle other routes here too, see
    // https://nextjs.org/docs/advanced-features/custom-server
    handle(req, res, parsedUrl);
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
```

Don't forget to also update your `package.json` to refer to the new entrypoint file:

```json
"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
}
```

The integration will then track any queries served by Next.js, and send metrics and statistics to AppSignal. This also works great with Express and the `@appsignal/express` integration:

```js
// ENSURE APPSIGNAL IS THE FIRST THING TO BE REQUIRED/IMPORTED
// INTO YOUR APP!
const { Appsignal } = require("@appsignal/nodejs");

const appsignal = new Appsignal({
  active: true,
  name: "<YOUR APPLICATION NAME>",
  pushApiKey: "<YOUR API KEY>", // Note: renamed from `apiKey` in version 2.2.5
});

const { getRequestHandler } = require("@appsignal/nextjs");

const {
  expressErrorHandler,
  expressMiddleware,
} = require("@appsignal/express");

const next = require("next");
const express = require("express");

const PORT = parseInt(process.env.PORT, 10) || 3000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

app.prepare().then(() => {
  express()
    .use(expressMiddleware(appsignal))
    .use(getRequestHandler(appsignal, app))
    .use(expressErrorHandler(appsignal))
    .listen(PORT, (err) => {
      if (err) {
        throw err;
      }

      console.log(`> Ready on http://localhost:${PORT}`);
    });
});
```

## Features

### Web Vitals Reporting (EXPERIMENTAL)

**Requires Next.js v9.4.0+**

In Next.js 9.4.0, support was added for [Core Web Vitals](https://web.dev/vitals/) reporting. Core Web Vitals are the quality signals key to delivering great UX on the web, on top of which the famous [Lighthouse](https://developers.google.com/web/tools/lighthouse) reports are built. `@appsignal/nextjs` includes experimental support for sending these metrics to AppSignal.com.

This works by providing a handler function, which is designed to be used as an endpoint in your application. When called, the `pathname` of the request must be equal to `/__appsignal-web-vitals`.

```js
const { Appsignal } = require("@appsignal/nodejs");

const appsignal = new Appsignal({
  active: true,
  name: "<YOUR APPLICATION NAME>",
  pushApiKey: "<YOUR API KEY>", // Note: renamed from `apiKey` in version 2.2.5
});

const {
  getRequestHandler,
  EXPERIMENTAL: { getWebVitalsHandler },
} = require("@appsignal/nextjs");

const url = require("url");
const next = require("next");
const { createServer } = require("http");

const PORT = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = getRequestHandler(appsignal, app);
const vitals = getWebVitalsHandler(appsignal);

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;

    if (pathname === "/__appsignal-web-vitals") {
      vitals(req, res);
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
```

If you're using Express with Next.js, the function also works as an Express middleware. If used as an Express middleware, the `/__appsignal-web-vitals` endpoint will be made available automatically:

```js
app.prepare().then(() => {
  express()
    .use(expressMiddleware(appsignal))
    .use(getWebVitalsHandler(appsignal))
    .use(getRequestHandler(appsignal, app))
    .use(expressErrorHandler(appsignal))
    .listen(PORT, (err) => {
      if (err) {
        throw err;
      }

      // eslint-disable-next-line no-console
      console.log(`> Ready on http://localhost:${PORT}`);
    });
});
```

Once mounted to your app, you can `POST` useful metrics to the `/__appsignal-web-vitals` endpoint by exporting a `reportWebVitals` function from `pages/_app.js`:

```js
export function reportWebVitals(metric) {
  const body = JSON.stringify(metric);
  const url = "/__appsignal-web-vitals";

  // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
  (navigator.sendBeacon && navigator.sendBeacon(url, body)) ||
    fetch(url, { body, method: "POST", keepalive: true });
}
```

On successful setup, two new [magic dashboards](https://blog.appsignal.com/2019/03/27/magic-dashboards.html) will be created for you - Next.js and Next.js Web Vitals.

Usage of this feature is **EXPERIMENTAL** and may change or be deprecated in future releases.
