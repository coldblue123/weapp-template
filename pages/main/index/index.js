// const app = getApp()
import { initTabActive } from '../../../utils/index'
Page({
  data: {
  },
  onLoad: function() {
  },
  onShow: function() {
    initTabActive.bind(this)(0)
  },
  // 跳转
  toDetail(e) {
    wx.navigateTo({
      url: e.target.dataset.url
    })
  }

})
