// console.log(process.env.WINDIR, process.env.COMSPEC, process.platform)

// let path = require('path');
// let fs = require('fs');

// console.log(path.join(__dirname, './src').split(/\\|\//));
// console.log(path.resolve(__dirname, './src'));

// // try {
// // 	let a = fs.mkdirSync(path.join(__dirname, './test/a'));
// // 	console.log(a);
// // } catch (error) {
// // 	console.error(error);
// // }

// fs.mkdir(path.join('./test/a'), (error) => {
// 	console.error(error);
// })

// const ssl = require('./dist/modules/ssl');

// console.log(ssl.default.check());

const Onion = require('./dist/onion/index');

const app = new Onion.default()
const router = app.createRouter()

router.get('/', async ctx => { ctx.body = 'index page' })
router.get('/home', async ctx => { ctx.body = 'home page' })
router.post('/', async ctx => { ctx.body = 'post index' })

app.use(router.routes())

// app.use((ctx, next) => {
// 	ctx.body = 'get request';
// 	next();
// })
// app.use((ctx, next) => {
// 	ctx.body += Date.now();
// 	next();
// })
app.use((ctx, next) => {
	console.log(ctx.body);
	next();
})

app.listen(5000);
console.log('服务启动');
