Component({
  properties: {
    // 转换数字
    num: {
      type: [String, Number],
      value: 0
    },
    // 保留几位小数
    decimal: {
      type: [Number, String],
      value: 1
    },
    // 默认值
    defaultVlue: {
      type: String,
      value: '--'
    },
    // 是否显示+号
    more: {
      type: Boolean,
      value: false
    }
  },
  data: {
    nuitStr: ''
  },
  observers: {
    num: function(val) {
      this.init()
    }
  },
  methods: {
    init() {
      const { num, more, decimal } = this.data
      const nuitStr = this.parseNum(num, more, decimal)
      this.setData({
        nuitStr
      })
    },
    // 格式化数字单位
    parseNum(num, more = true, decimal) {
      num = Number(num)
      decimal = Number(decimal)
      if (num > Number.MAX_SAFE_INTEGER) {
        return console.error('已超出最大安全数字')
      }
      if (num > 10000 && num < 1e8) {
        // 当超过1万，不足1亿时，以“W”字显示，默认保留一位小数
        return (num / 10000).toFixed(decimal) + (more ? 'W' + '+' : 'W') || this.data.defaultVlue
      } else if (num > 1e8) {
        // 当超过1亿时，以“E”字显示，默认保留一位小数
        return (num / 1e8).toFixed(decimal) + (more ? 'E' + '+' : 'E') || this.data.defaultVlue
      } else {
        return num.toFixed(decimal) || this.data.defaultVlue
      }
    }
  }
})
