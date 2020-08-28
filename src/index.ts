import http from 'http';
import moa from 'moa';
import Moa from './moa';

const app = new Moa();

const router = app.createRoute();

router.get('/test', async function (ctx: moa.Context, next: () => void) {
    ctx.body = 'hello test!';
    next();
});

app.use(router.routes());

app.use(async function (ctx: moa.Context, next: () => void) {
    ctx.body += 'end';
    next();
});

app.createServer(http, 3000);
