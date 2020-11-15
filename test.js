const url = require('url');

// console.log(new URL('/test'));
console.log(url.parse('/test', true));
// console.log(new url.URL('/test', 'https://example.org/'));
console.log(new url.URL('test'));
