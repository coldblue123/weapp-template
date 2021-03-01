/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0 || +time <= 0 || !time) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value ] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * 对象深度克隆
 * @param {Object|Array} target
 */
export function deepClone(obj) {
  var newObj = obj instanceof Array ? [] : {}
  for (var item in obj) {
    var temple = typeof obj[item] === 'object' && obj[item] !== null ? deepClone(obj[item]) : obj[item]
    newObj[item] = temple
  }
  return newObj
}

/**
 * tabbar焦点控制
 * @param {string|number} index
 */
export function initTabActive(index) {
  if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    this.getTabBar().setData({
      active: index
    })
  }
}

/** base64转本地图片
 * @param {string} base64
 */
export function base64toSrc(base64) {
  return new Promise((resolve, reject) => {
    const fs = wx.getFileSystemManager()
    const [, format, bodyData] = /data:image\/(\w+);base64,(.*)/.exec(base64) || []
    // 随机定义路径名称
    var hash = new Date().getTime()
    if (!format) {
      reject('不存在base64格式文件信息')
      return
    }
    const filePath = `${wx.env.USER_DATA_PATH}/${hash}.${format}`
    const buffer = wx.base64ToArrayBuffer(bodyData)
    console.log(123123)
    // 将base64图片写入
    fs.writeFile({
      filePath,
      data: buffer,
      encoding: 'binary',
      success: () => {
        resolve(filePath)
      }
    })
  })
}

/**
 * 返回头部导航高度 px
 */
export function getNavbarHeight() {
  const statusBarHeight = wx.getSystemInfoSync().statusBarHeight
  const navHeight = 46 + statusBarHeight
  return navHeight
}
