---
title: "@appsignal/ember"
---

## Installation

Add the  `@appsignal/ember` and `@appsignal/javascript` packages to your `package.json`. Then, run `yarn install`/`npm install`.

You can also add these packages to your `package.json` on the command line:

```
yarn add @appsignal/javascript @appsignal/ember
npm install --save @appsignal/javascript @appsignal/ember
```

Starting with Ember 4, projects created with `ember new` include `ember-auto-import` out of the box. If your project does not, you will need to add some kind of method for loading `npm` packages into your application. We recommend using [`ember-auto-import`](https://github.com/ef4/ember-auto-import), which you can install using `ember-cli`:

```
ember install ember-auto-import
```

[A number of other methods and custom configurations are available](https://guides.emberjs.com/release/addons-and-dependencies/) for importing this library in a way that suits your app.

## Usage

### `Ember.onerror`/`Ember.RSVP.on("error")`

The default Ember integration is a function that binds to the `Ember.onerror` and `Ember.RSVP.on("error")` handlers. In a new app created using `ember-cli`, your `app.js` file might include something like this:

```js
import Appsignal from '@appsignal/javascript'
import Ember from 'ember'
import { installErrorHandler } from '@appsignal/ember'

const appsignal = new Appsignal({ 
  key: "YOUR FRONTEND API KEY"
})

installErrorHandler(appsignal, Ember)
```
