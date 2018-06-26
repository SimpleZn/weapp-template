/**
 * 小程序配置文件
 */
let host = 'host-url'

const res = wx.getSystemInfoSync() || {}
if (res.platform === 'devtools') {
  host = 'host-dev-url'
}

const appId = ''

module.exports = {
  appId,
  host,
  service: {
    loginUrl: '',
  }
}
