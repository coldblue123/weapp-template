// const app = getApp()
import { initTabActive } from '../../../utils/index'
Page({
  onShow: function() {
    initTabActive.bind(this)(1)
  }
})
