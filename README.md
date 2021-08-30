# Express IP

This is an express module for getting IP information using geoip-country. It can also be used as express middleware. Basically its an express middleware. So with this, you can get info about an IP.

# Installation

```
npm install @sansamour/express-ip
```

# Usage

## short
```
const express = require('express');
const app = express();
const {getIpInfoMiddleware} = require('@sansamour/express-ip');
app.use(getIpInfoMiddleware());

app.get('/', function (req, res) {
    res.send(req.ipInfo);
});

```
## full
```
const express = require('express');
const app = express();
const {getIpInfoMiddleware} = require('@sansamour/express-ip');
const PORT = process.env.PORT || 7000;
const path = require('path');

app.use(getIpInfoMiddleware());


app.set("PORT", PORT);

app.get('/', function (req, res) {
    res.send(req.ipInfo);
});

app.listen(app.get('PORT'), function () {
    console.log('Express started on http://localhost:' +
        app.get('PORT') + '; press Ctrl-C to terminate.');
});

```

# Author
sansamour <hoidhxd@gmail.com> (http://tutorialspots.com)