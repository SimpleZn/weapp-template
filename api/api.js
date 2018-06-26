const config = require('../config');
const { host } = config;

function sendRequest(url, data, method = 'GET', onSuccess = null, onFailed = null, header = {'content-type': 'application/json'}) {
  console.log(`sendRequest url: ${url}, time: ${(new Date()).getTime()}`)

  wx.request({
    url: url,
    method: method,
    data: data,
    header: Object.assign({ 'token': getApp().getSession()}, header),
    success: function (r) {
      // 得到了session进行存储
      console.log('redv data:', r)
      if (r.statusCode === 200 && r.data.mktsSuccess) {
        if (onSuccess) {
          onSuccess(r);
        }
      } else {
        if (r.statusCode !== 200) {

        } else if (!r.data.mktsSuccess) {
          // 调用展示错误接口  mktsMessage
          wx.showToast({
            title: r.data.mktsMessage,
            icon: 'none',
            duration: 2000
          })
          if (onFailed) {
            onFailed(r);
          }
        }
      }
    },
    fail: function (r) {
      // todo
      onFailed(r)
    }
  })
}


module.exports = {
  sendRequest
}