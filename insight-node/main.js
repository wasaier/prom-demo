const express = require("express");
const client = require("prom-client");
const register = new client.Registry();
const app = express();
const url = require('url');

// 新增默认标签，默认添加到所有的 metrics
register.setDefaultLabels({
  app: "monitor-nodejs-app",
});

// 默认开启 metrics 收集
client.collectDefaultMetrics({ register });


// 自定义 metrics
const monitor_api_request_total = new client.Counter({
  name: "monitor_api_req_total",
  help: "metric_help",
  labelNames: ["url"],
});

register.registerMetric(monitor_api_request_total)

app.get('*', async function (req, res, next) {
  const { pathname } = url.parse(req.url)
  monitor_api_request_total.inc({ url: pathname });
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
})

app.post('/report', async function (req, res, next) {
  const { pathname } = url.parse(req.url)
  monitor_api_request_total.inc({ url: pathname });
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
})

app.listen(8080)
