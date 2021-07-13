// 初始化aixos
import initAxios from './request/create'
App({
  onLaunch: function() {
    // 初始化axios
    initAxios()
    // 初始化全局分享
    _initShare()
  },
  globalData: {
    token: null,
    userInfo: null,
    systemInfo: wx.getSystemInfoSync()
  }
})

// 设置全局默认分享
function _initShare() {
  var PageTmp = Page
  Page = function(pageConfig) {
    pageConfig = Object.assign({
      onShareAppMessage: function() {
        return {
          title: 'weapp-template-默认分享文案',
          path: '/pages/main/index/index',
          imageUrl: 'https://img01.yzcdn.cn/vant/cat.jpeg'
        }
      }
    }, pageConfig)
    PageTmp(pageConfig)
  }
}
