import { getLCP, getFID, getCLS } from 'web-vitals';

import ttiPolyfill from 'tti-polyfill';

console.log(222);

ttiPolyfill.getFirstConsistentlyInteractive().then((tti) => {
  // Use `tti` value in some way.
  console.log('tti', tti);
});

getCLS(console.log);
getFID(console.log);
getLCP(console.log);

var observer = new PerformanceObserver((list) => {
  var entries = list.getEntries();
  for (var i = 0; i < entries.length; i++) {
    console.log(entries[i])
    console.log(JSON.stringify(entries[i], null, 4));
  }
});

observer.observe({
  entryTypes: ['longtask'],
});

function test() {
  console.time('test')
  let sum = 0
  for(let i = 0; i < 1000000000; i++) {
    sum += Math.random();
  }
  console.timeEnd('test')
  console.log(sum)
}

test()