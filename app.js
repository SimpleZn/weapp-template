/**
 * Created by happy on 3/6/18.
 */
var config = require('./config');
var service = config.service;

App({
  // 小程序初始化时执行，我们初始化客户端的登录地址，以支持所有的会话操作
  appData: {
    appId: service.appId,
    baseUrl: `${service.host}/weapp/`,
    tunnelStatus: 'close'//统一管理唯一的信道连接的状态：connect、close、reconnecting、reconnect、error
  },
  onLaunch: function () {
    let updateManager = null
    if (wx.canIUse('getUpdateManager')) {
      updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        // 请求完新版本信息的回调
        console.log(res.hasUpdate)
      })

      updateManager.onUpdateReady(function () {
        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        wx.showModal({
          title: '小程序有新版本啦',
          content: '点击确定立刻刷新',
          showCancel: false,
          success: function (res) {
            updateManager.applyUpdate()
          }
        })
      })

      updateManager.onUpdateFailed(function () {
        // 新的版本下载失败
      })
    }
    
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb === 'function' && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb === 'function' && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})