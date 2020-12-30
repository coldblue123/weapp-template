/**
 * 基于wx.request封装的类axios请求
 * wx.request 的配置、axios的调用方式
 * @config 配置参数说明 --> ./defaults.js
 * @api axios(config) - 默认get
 * @api axios(url[, config]) - 默认get
 * @api axios.get(url[, config])
 * @api axios.post(url[, data[, config]])
 * @api axios.cache(url[, data[, config]]) - 缓存请求（内存）
 * @api axios.cache.storage(url[, data[, config]]) - 缓存请求（内存 & local storage）
 * @api axios.creat(config) - 初始化定制配置，覆盖默认配置
 * @use @app.js-onLaunch：axios.creat(config);   @page.js: axios.post(url[, data[, config]]);
 * @reference http://www.axios-js.com/zh-cn/docs/
 */

import Axios from './axios.class.js'

const axiosInstance = new Axios()
const { axios } = axiosInstance

axios.axios = axiosInstance.axios.bind(axiosInstance)
axios.creat = axiosInstance.creat.bind(axiosInstance)
axios.get = axiosInstance.get.bind(axiosInstance)
axios.post = axiosInstance.post.bind(axiosInstance)
// 获取缓存数据
axios.cache = axiosInstance.cache.bind(axiosInstance)
axios.cache.storage = axiosInstance.storage.bind(axiosInstance)

export default axios
