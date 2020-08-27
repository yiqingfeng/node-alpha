/**
 * @description 通用方法处理
 */
import base from './base';
import path from './path';
import cp from './cp';
import fs from './fs';

export default {
    ...base,
    ...path,
    ...cp,
    ...fs,
};
