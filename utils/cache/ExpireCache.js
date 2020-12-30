import CacheItem from './CacheItem';

export default class ExpireCache extends CacheItem {
  constructor(data, timeout, cacheLabel) {
    super(data, timeout, cacheLabel);
  }
  // 定义静态数据map来作为缓存池
  static cacheMap = new Map();

  // 数据是否过期
  static isExpire(name, curCacheLabel) {
    const data = this.cacheMap.get(name);

    // 没有数据 一定过期
    if (!data) return true;

    // 获取系统当前时间戳
    const { expireTime, cacheLabel } = data;
    const currentTime = new Date().getTime();
    // 缓存含过期时间&&已过期
    const timeExpire = expireTime && currentTime > expireTime;
    // 缓存含过期标记&&标记已变化
    const labelExpire = curCacheLabel && cacheLabel && curCacheLabel !== cacheLabel;

    if (timeExpire || labelExpire) {
      this.cacheMap.delete(name);
      return true;
    }

    // 不过期
    return false;
  }

  // 当前data在 cache 中是否过期 - 判断时间&标记
  static has(name, cacheLabel) {
    return !this.isExpire(name, cacheLabel);
  }

  // 删除
  static delete(name) {
    return this.cacheMap.delete(name);
  }

  /**
   * 获取，如有过期标记需要传入过期标记或者先用has判断
   * @param {Any} name 缓存名称
   * @param {Any} cacheLabel 缓存标记
   */
  static get(name, cacheLabel) {
    return this.has(name, cacheLabel) ? this.cacheMap.get(name).data : null;
  }

  // 存储
  static set(name, data, timeout, cacheLabel) {
    const itemCache = new ExpireCache(data, timeout, cacheLabel);
    // 缓存
    this.cacheMap.set(name, itemCache);
  }
}
