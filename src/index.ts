import utils from './utils';

console.log(utils.cpExec('echo hello').data);

function hi(name: string): string {
    return `hi, ${name}!`;
}

console.log(hi('Jack'));
