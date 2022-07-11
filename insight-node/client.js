const request = require('request');

function call() {
  const random = Math.random();
  if (random < 0.5) {
    request.get('http://localhost:8080/home')
  } else if (random < 0.8) {
    request.get('http://localhost:8080/me')
  } else {
    request.get('http://localhost:8080/order')
  }
  setTimeout(() => {
    call()
  }, 1000)
}

call();