const request = require("request");

function sleep(delay = 5000) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}

function send(body) {
  return new Promise((resolve) => {
    request.post(`http://8.135.111.215:9091/metrics/job/test_job`, {
      body
    }, (err, data) => {
      resolve()
    })
  })
}

// 为什么在 prom metric 看 只有 payment
async function start() {
  for (let i = 0; i < 1000; i++) {
    await send(`insight_http_request_pv_total{url="/home"} ${i}\n`)
    await sleep(10);
    await send(`insight_http_request_pv_total{url="/goods"} ${i}\n`)
    await sleep(10);
    await send(`insight_http_request_pv_total{url="/order"} ${i}\n`)
    await sleep(10);
    await send(`insight_http_request_pv_total{url="/payment"} ${i}\n`)
    await sleep();
  }
}

start();