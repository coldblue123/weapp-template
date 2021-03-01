// const app = getApp()
import { initTabActive } from '../../../utils/index'
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../../store/test'
Page({
  data: {
  },
  onLoad() {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['numA', 'numB', 'sum'],
      actions: ['handleUpdate']
    })
  },
  onUnload() {
    this.storeBindings.destroyStoreBindings()
  },
  onShow: function() {
    initTabActive.bind(this)(0)
  }

})
