import http from 'http';
import Moa from './moa';

const app = new Moa();

// 简化版
app.useRoute(router => {
    router.get('/test', async function (ctx: moa.Context, next: () => void) {
        ctx.body = 'hello test!';
        next();
    });
});

app.use(async function (ctx: moa.Context, next: () => void) {
    ctx.body += 'end';
    next();
});

app.createServer(http, 3000);
