// const app = getApp()
import { initTabActive } from '../../../utils/index'
Page({
  data: {
  },
  onShow: function() {
    initTabActive.bind(this)(0)
  }

})
