import axios from './axios'
import { getToken } from '../utils/action'
import { WE_APP_BASE_API } from '../env'
import { weLogin, removeToken, removeUserInfo, setUserInfo } from '../utils/action'
const reLogin = 401 // 重新登录

function initAxios() {
  const baseUrl = WE_APP_BASE_API
  const header = {
    'content-type': 'application/json; charset=UTF-8',
    'Authorization': 'Bearer ' + getToken()
  }
  const timeout = 15000

  // request 拦截部分请求参数
  // const transformRequest = (data) => {
  //   console.log(232323,data)
  //   return {
  //     ...data,
  //   };
  // };

  // respones 可添加一些自定义数据
  // const transformResponse = (res) => ({
  //   ...res,
  // });

  // resolve 拦截, 格式化返回数据
  const resolveWrap = ({ data = {}}) => {
    return data
  }

  // reject 拦截错误信息
  const rejectWrap = ({ data = {}}) => {
    console.log('接口请求错误', data)
    const message = data.message
    // 重新登录
    if (data.code === reLogin) {
      console.log('登录过期,重新登录中')
      wx.showLoading({ title: '登录中', mask: true })
      // 清除缓存
      removeToken()
      removeUserInfo()
      wx.removeStorageSync('ticket')
      // 重新执行微信登录请求
      weLogin().then((res) => {
        console.log('微信自动登录成功')
        setUserInfo().then(() => {
          console.log('获取用户信息成功')
          // 重新加载当前页
          const pages = getCurrentPages()
          const index = pages.length - 1
          console.log('401重载页面为', pages[index])
          pages[index].onLoad()
          pages[index].onShow()
          console.log('页面已重载')
          wx.hideLoading()
        }).catch(() => {
          wx.hideLoading()
        })
      }).catch((err) => {
        wx.hideLoading()
        console.log('微信自动登录失败', err)
      })
      return data
    } else {
      message && wx.showToast({ title: message, duration: 1500, icon: 'none' })
      return data
    }
  }

  // 状态码验证,根据不同的状态码做对于的操作
  const validateStatus = (res) => {
    return /^2/.test(res.statusCode.toString())
  }

  axios.creat({
    baseUrl,
    header,
    timeout,
    validateStatus,
    // transformRequest,
    // transformResponse,
    resolveWrap,
    rejectWrap
  })
}

export default initAxios
