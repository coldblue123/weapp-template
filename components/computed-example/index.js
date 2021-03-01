const computedBehavior = require('miniprogram-computed').behavior
Component({
  behaviors: [computedBehavior],
  data: {
    a: 1,
    b: 2,
    c: 1,
    d: 2,
    result: 3
  },
  computed: {
    // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
    // 这个函数的返回值会被设置到 this.data.sum 字段中
    sum: function(data) {
      return data.a + data.b
    }
  },
  watch: {
    'c, d': function(c, d) {
      this.setData({
        result: c + d
      })
    }
  },
  methods: {
    onTap() {
      this.setData({
        a: this.data.b,
        b: this.data.a + this.data.b
      })
    },
    handleUpdataSum() {
      const { a, b } = this.data
      this.setData({
        a: b,
        b: a + b
      })
    },
    handleUpdataResult() {
      const { c, d } = this.data
      this.setData({
        c: d,
        d: c + d
      })
    }
  }
})
