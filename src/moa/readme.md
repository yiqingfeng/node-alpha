# Moa 洋葱中间件 -- 仿 koa

参考文章：https://mp.weixin.qq.com/s/PkzPJipyG80Kpm7xwOrnIA

## 使用说明

```javascript
import http from 'http';
import Moa from 'moa';

const app = new Moa();

// 注册路由
const router = app.createRoute();
router.get('/test', async function (ctx, next) {
    ctx.body = 'hello test!';
    next();
});
app.use(router.routes()); 

// 注册路由简化版
// app.useRoute(router => {
//     router.get('/test', async function (ctx: moa.Context, next: () => void) {
//         ctx.body = 'hello test!';
//         next();
//     });
// });

app.use(async function (ctx, next) {
    ctx.body += 'end';
});

app.createServer(http, 3000);
```