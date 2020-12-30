import request from '../request/axios'

export function testRequest(data) {
  return request.axios({
    method: 'GET',
    url: '/categories',
    data
  })
}
