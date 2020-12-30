/** config - axios默认配置项 */

export default {
  // 请求接口地址
  url: undefined,
  // 请求的参数
  data: {},
  // 请求的 header
  header: 'application/json',
  // 超时时间，单位为毫秒
  timeout: undefined,
  // HTTP 请求方法
  method: 'GET',
  // 返回的数据格式
  dataType: 'json',
  // 响应的数据类型
  responseType: 'text',
  // 开启 http2
  enableHttp2: false,
  // 开启 quic
  enableQuic: false,
  // 开启 cache
  enableCache: false,

  /** 以上为wx.request的可配置项，参考 https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html */
  /** 以下为wx.request没有的新增配置项 */

  // {String} baseURL` 将自动加在 `url` 前面，可以通过设置一个 `baseURL` 便于传递相对 URL
  baseUrl: '',
  // {Function} （同axios的validateStatus）定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 reject
  validateStatus: undefined,
  // {Function} 请求参数包裹（类似axios的transformRequest），通过它可统一补充请求参数需要的额外信息（appInfo/pageInfo/场景值...），需return data
  transformRequest: undefined,
  // {Function} resolve状态下响应数据包裹（类似axios的transformResponse），通过它可统一处理响应数据，需return res
  transformResponse: undefined,
  // {Function} resolve状态包裹，通过它可做接口resolve状态的统一处理
  resolveWrap: undefined,
  // {Function} reject状态包裹，通过它可做接口reject状态的统一处理
  rejectWrap: undefined,
  // {Boolean} _config.useCache 是否开启缓存
  useCache: false,
  // {String} _config.cacheName 缓存唯一key值，默认使用url&data生成
  cacheName: undefined,
  // {Boolean} _config.cacheStorage 是否开启本地缓存
  cacheStorage: false,
  // {Any} _config.cacheLabel 缓存标志，请求前会对比该标志是否变化来决定是否使用缓存，可用useCache替代
  cacheLabel: undefined,
  // {Number} _config.cacheExpireTime 缓存时长，计算缓存过期时间，单位-秒
  cacheExpireTime: undefined
}
