//获取应用实例
const eventNames = require('../../constant/events.js')
const { service } = require('../../config')
var app = getApp();

Page({
  data: {
    loginUrl: '', // 登录注册绑定url
  },

  onLoad: function () {
    wx.hideShareMenu()
    // console.log('web-view on load: ', app.getSession());
    this.setData({
      loginUrl: service.loginUrl + app.getSession()
    });
  },

  handleMessage: function(r) {
    console.log('handle-message: ', r);
    app.events.trigger(eventNames.BIND_LOGIN, r.detail.data[0]);
  }

});

