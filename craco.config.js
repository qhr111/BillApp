const path = require('path');

module.exports = {
    //webpack配置
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
};