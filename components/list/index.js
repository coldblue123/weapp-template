Component({
  options: {
    styleIsolation: 'shared', // 页面 wxss 样式将影响到自定义组件
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    loading: {
      type: Boolean,
      value: false
    },
    empty: {
      type: Boolean,
      value: false
    },
    emptyText: {
      type: String,
      value: '暂无数据'
    },
    finished: {
      type: Boolean,
      value: false
    },
    error: {
      type: Boolean,
      value: false
    },
    finishedText: {
      type: String,
      value: '我是有底线的'
    },
    errorText: {
      type: String,
      value: '加载失败'
    }
  },
  data: {
  },
  methods: {
    // 重新加载
    restore() {
      this.triggerEvent('restore')
    }
  }
})
