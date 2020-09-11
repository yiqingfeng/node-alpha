
import createServer from './modules/server';
import startApp from './app/index';

const START_DATE: number = Date.now();

process.on('exit', () => {
    const now = Date.now();
    console.log(`SYSTEM exit at ${now}, has run ${now - START_DATE} ms`);
});
process.on('SIGINT', () => process.exit());

startApp(createServer());
console.log(`SERVER start at ${Date.now()}, use time ${Date.now() - START_DATE} ms`);
