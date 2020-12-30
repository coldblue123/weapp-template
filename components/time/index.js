import { parseTime } from '../../utils/index'
Component({
  properties: {
    time: {
      type: [String, Number],
      value: ''
    },
    format: {
      type: String,
      value: '{y}-{m}-{d} {h}:{i}:{s}'
    }
  },
  data: {
    formatTime: '--'
  },
  observers: {
    time: function(val) {
      this.setData({
        formatTime: parseTime(val, this.data.format)
      })
    }
  }
})
