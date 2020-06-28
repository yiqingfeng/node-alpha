// console.log(process.env.WINDIR, process.env.COMSPEC, process.platform)

let path = require('path');
let fs = require('fs');

console.log(path.join(__dirname, './src').split(/\\|\//));
console.log(path.resolve(__dirname, './src'));

// try {
// 	let a = fs.mkdirSync(path.join(__dirname, './test/a'));
// 	console.log(a);
// } catch (error) {
// 	console.error(error);
// }

fs.mkdir(path.join('./test/a'), (error) => {
	console.error(error);
})
