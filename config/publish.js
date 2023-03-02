/**
 * 发布配置
 */

const path = require('path');

module.exports = {
  // 开发环境
  dev: {
    host: '10.45.47.161',
    port: '22',
    user: 'root',
    pass: 'root123456',
    remotePath: '/root/web/NewRetail/B2B/TradingPlatform',
    scriptLocation: '/root/web/deploy/deploy-eshop-trading-platform.sh',
  },
  // 测试环境
  test: {
    host: '',
    port: '',
    user: '',
    pass: '',
    remotePath: '',
  },
  // 南京生产环境
  prod: {

  },
  // 本地环境
  local: {
    localPath: path.resolve(__dirname, '../test'),
  },
};
