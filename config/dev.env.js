var merge = require('webpack-merge');
var prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    // API_ROOT: '"https://cnodejs.org/api/v1"'     // 配置API接口地址
    // API_ROOT: '"http://192.168.31.242/ksbapi2/api/"',     // 配置API接口地址

    API_ROOT: '"http://BroccoliSpring/gcx/api"',     // mock 接口地址

});
