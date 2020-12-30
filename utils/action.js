// 登录,退出,授权相关方法类
import { login, userInfo } from '../api/login'
import initAxios from '../request/create'

// 通过手机密码,验证码登录
export function phoneLogin(data) {
//   const app = getApp()
  return new Promise((resolve, reject) => {
    login(data).then((res) => {
      console.log(res)
      // 存入全局与缓存(按需储存)
      //   app.globalData.token = res.access_token
      wx.setStorageSync('token', res.access_token)
      // 重新初始化axios
      initAxios()
      resolve(res)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}

// 微信登录
export function weLogin() {
  return new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          login({ code: res.code, 'mode': 'mini_program_code' }).then((info) => {
            switch (info.status) {
              // 登录成功
              case 'LOGIN_SUCCESS':
                wx.setStorageSync('token', info.access_token)
                initAxios()
                resolve(info)
                break
              // 没有绑定
              case 'NO_BIND':
                // 进入绑定逻辑
                wx.setStorage({ key: 'ticket', data: info.ticket })
                reject(info)
                break
            }
          }).catch((error) => {
            console.log(error)
            reject(error)
          })
        }
      }
    })
  })
}

// 获取并设置用户信息
export function setUserInfo() {
  return new Promise((resolve, reject) => {
    const app = getApp() || this || null
    userInfo().then((res) => {
      console.log(res)
      // 存入全局与缓存
      app && (app.globalData.userInfo = res)
      wx.setStorageSync('userInfo', res)
      resolve(res)
    }).catch((err) => {
      console.log(err)
      reject(err)
    })
  })
}

// 获取token
export function getToken() {
  try {
    return wx.getStorageSync('token') || ''
  } catch (error) {
    console.log(error)
  }
}

// 删除token
export function removeToken() {
  try {
    wx.removeStorageSync('token')
    // 重新初始化axios
    initAxios()
  } catch (error) {
    console.log(error)
  }
}

// 获取用户信息
export function getUserInfo() {
  try {
    const app = getApp()
    return (app && app.globalData.userInfo) || wx.getStorageSync('userInfo')
  } catch (error) {
    console.log(error)
  }
}

// 清除用户信息
export function removeUserInfo() {
  try {
    const app = getApp()
    app && (app.globalData.userInfo = null)
    wx.removeStorageSync('userInfo')
  } catch (error) {
    console.log(error)
  }
}
