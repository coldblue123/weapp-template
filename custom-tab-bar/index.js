Component({
  data: {
    active: 0,
    list: [{
      pagePath: '/pages/main/index/index',
      iconPath: './image/home.png',
      selectedIconPath: './image/home_active.png',
      text: '首页'
    }, {
      pagePath: '/pages/main/me/index',
      iconPath: './image/me.png',
      selectedIconPath: './image/me_active.png',
      text: '我的'
    }
    ]
  },
  methods: {
    // 切换底部导航
    switchTab(e) {
      console.log(e, this.data.list)
      const data = this.data.list[e.detail]
      const url = data.pagePath
      wx.switchTab({ url })
      this.setData({
        active: e.detail
      })
    }
  }
})
