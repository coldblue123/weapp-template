import request from '../request/axios'

// 登录
export function login(data) {
  return request.axios({
    method: 'post',
    url: '/tokens',
    data
  })
}

// 获取用户信息
export function getInfo() {
  return request.axios({
    method: 'get',
    url: '/users/me'
  })
}
