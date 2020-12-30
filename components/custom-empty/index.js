Component({
  options: {
    styleIsolation: 'shared', // 页面 wxss 样式将影响到自定义组件
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    image: {
      type: String,
      value: '/images/empty.png'
    },
    description: {
      type: String,
      value: '暂无数据'
    }
  },
  data: {
  },
  methods: {
  }
})
