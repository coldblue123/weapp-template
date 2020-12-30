import request from '../request/axios'

// 获取邀请记录列表
export function getInvitedList(data) {
  return request.axios({
    method: 'get',
    url: `/invited`,
    data
  })
}

// 获取邀请统计和直邀\间邀统计
export function getUserInfoById(userId, data) {
  return request.axios({
    method: 'get',
    url: `/users/${userId}`,
    data
  })
}

// 获取钱包明细
export function getBillsList(data) {
  return request.axios({
    method: 'get',
    url: `/bills`,
    data
  })
}

// 获取轮播图
export function getInviteImg(data) {
  return request.axios({
    method: 'get',
    url: '/img/invite',
    data
  })
}

// 获取邀请二维码
export function getInviteCode(data) {
  return request.axios({
    method: 'post',
    url: '/qrcodes/mini/program',
    data
  })
}

// 获取邀请二维码
export function getBillsDetail(id, data) {
  return request.axios({
    method: 'get',
    url: `/bills/${id}`,
    data
  })
}

// 根据用户类型获取业务类型
export function getBusinessType(data) {
  return request.axios({
    method: 'get',
    url: `/bills/business/type`,
    data
  })
}
