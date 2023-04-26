## litebc
Simple & Lightweight Browser Checker module.

May not as effective like JS powered ones, But doing it is exact purposes already.

### How it works
- Basically just validating captcha more than two times.

### Example
http.server:

```js
const { createServer } = require("http");
const litebc = require("litebc");

let server = createServer((req, res) => {
  litebc(req, res, _ => {
    // Handle your exact request here
  });
});
```

expressjs:

```js
const app = require("express")();
const litebc = require("litebc");

app.use(litebc);
// The rest of your code
```

### Setting Maximum refresh
By default, We refresh on validation for `3` times. To change this, Simply do:

```js
const litebc = require("litebc");

litebc.setMax(4); // Change redirect validations to 4 times
```

Keep in mind that some browser may gonna throw TOO_MANY_REDIRECT error.

### Changing cookie name
By default, We set cookie under name `__nobot_sid`. To change this, Simply do:

```js
const litebc = require("litebc");

litebc.setCookieName("newCookieName");
```
