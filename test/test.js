const request = require('supertest');
const express = require('express');
const {getIpInfoMiddleware} = require('../lib/index');

const app = express();
app.use(getIpInfoMiddleware());

app.get('/ipInfo', function(req, res) {
  res.status(200).json(req.ipInfo);
});

request(app)
  .get('/ipInfo')
  .expect('Content-Type', /json/)
  .expect(200)
  .end(function(err, res) {
    if (err) throw err;
	console.log(res.body);
  });