---
title: "Apollo Server"
---

The AppSignal for Node.js integration for Apollo GraphQL (`apollo-server`) v2.0.0+.

## Installation

Add both the `@appsignal/nodejs` and `@appsignal/apollo-server` packages to your `package.json`. Then, run `yarn install`/`npm install`.

You can also add these packages to your `package.json` on the command line:

```bash
yarn add @appsignal/nodejs @appsignal/apollo-server
npm install --save @appsignal/nodejs @appsignal/apollo-server
```

You can then import and use the package in your app.

## Usage

The module includes an Apollo Server plugin for automatically instrumenting the resolvers of your application.

To use the Apollo Server plugin, require it from the `@appsignal/apollo-server` package, and pass it in the `plugins` property when initialising `ApolloServer`, with an `Appsignal` instance as an argument:

```js
const { createApolloPlugin } = require("@appsignal/apollo-server");

const server = new ApolloServer({
  /* ... */
  plugins: [createApolloPlugin(appsignal)],
});
```

!> **NOTE:** In order for a [GraphQL query](https://www.apollographql.com/blog/the-anatomy-of-a-graphql-query-6dffa9e9e747/) to have its own entry in the Performance view of AppSignal.com, you must give it a name. For example, the named query `query AllBooks { books }` will show up in the performance view as an entry named `AllBooks`, but the unnamed query `{ books }` will be grouped together with all other unnamed queries, showing up in the performance view as a single entry named `[unknown graphql query]`.

## Full example

```js
// ENSURE APPSIGNAL IS THE FIRST THING TO BE REQUIRED/IMPORTED
// INTO YOUR APP!
const { Appsignal } = require("@appsignal/nodejs");
const { createApolloPlugin } = require("@appsignal/apollo-server");

// You can also use one of the apollo-server integrations here,
// e.g. `apollo-server-<integration>`. Note that you will also need to require
// the AppSignal integration for it separately.
const { ApolloServer } = require("apollo-server");

const appsignal = new Appsignal({
  active: true,
  name: "<YOUR APPLICATION NAME>",
  pushApiKey: "<YOUR API KEY>", // Note: renamed from `apiKey` in version 2.2.5
});

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    hello: () => "world",
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [createApolloPlugin(appsignal)],
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
```

## Features

The integration will send the following instrumentation data to AppSignal:

- ✅ Query duration
- ✅ GraphQL query bodies
- ✅ Errors
