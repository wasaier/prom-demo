const express = require("express");
const client = require("prom-client");
const register = new client.Registry();
const app = express();

// 新增默认标签，默认添加到所有的 metrics
register.setDefaultLabels({
  app: "monitor-nodejs-app",
});

// 默认开启 metrics 收集
client.collectDefaultMetrics({ register });


// 自定义 metrics
const monitor_api_request_total = new client.Counter({
  name: "monitor_api_request_total",
  help: "metric_help",
  labelNames: ["url"],
});

register.registerMetric(monitor_api_request_total)

app.get('/home', async function (req, res) {
  monitor_api_request_total.inc({ url: '/home' });
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
})

app.get('/about', async function (req, res) {
  monitor_api_request_total.inc({ url: '/about' });
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
})

app.get("/metrics", async function (req, res) {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(8080)
