/**
 * Axios.js
 */

/* eslint-disable no-underscore-dangle */
import wxRequest from './wxRequest';
import defaults from './defaults';
import { combineUrl, mergeConfig } from './util';
import Buffer from '../utils/cache/Buffer';
import Storage from '../utils/cache/Storage';
import StorageMap from '../utils/cache/StorageMap';

class Axios {
  constructor(config = defaults) {
    this.defaultConfig = config;
  }

  /**
   * 初始化用户配置，会覆盖默认配置
   * @param {Object} _config 配置
   */
  creat(_config = {}) {
    this.defaultConfig = mergeConfig(this.defaultConfig, _config);
  }

  axios($1 = {}, $2 = {}) {
    let config = $1;
    // 兼容axios(url[, config])方式
    if (typeof $1 === 'string') {
      config = $2;
      config.url = $1;
    }
    return this.request(config);
  }

  get(url, _config = {}) {
    const config = {
      ..._config,
      url,
      method: 'GET',
    };
    return this.request(config);
  }

  post(url, data = {}, _config = {}) {
    const config = {
      ..._config,
      url,
      data,
      method: 'POST',
    };
    return this.request(config);
  }

  /**
   * 请求缓存api，缓存于内存中
   */
  cache(url, data = {}, _config = {}) {
    const config = {
      ..._config,
      url,
      data,
      method: 'POST',
    };
    return this._cache(config);
  }

  /**
   * 请求缓存api，缓存于本地缓存中
   */
  storage(url, data = {}, _config = {}) {
    const config = {
      ..._config,
      url,
      data,
      method: 'POST',
      cacheStorage: true,
    };
    return this._cache(config);
  }

  /**
   * 请求缓存
   * @param {Object} _config 配置
   * @param {Boolean} _config.useCache 是否开启缓存
   * @param {String} _config.cacheName 缓存唯一key值，默认使用url&data生成
   * @param {Boolean} _config.cacheStorage 是否开启本地缓存
   * @param {Any} _config.cacheLabel 缓存标志，请求前会对比该标志是否变化来决定是否使用缓存，可用useCache替代
   * @param {Number} _config.cacheExpireTime 缓存时长，计算缓存过期时间，单位-秒
   */
  _cache(_config) {
    const {
      url = '',
      data = {},
      useCache = true,
      cacheName: _cacheName,
      cacheStorage,
      cacheLabel,
      cacheExpireTime,
    } = _config;
    const computedCacheName = _cacheName || `${url}#${JSON.stringify(data)}`;
    const cacheName = StorageMap.getCacheName(computedCacheName);

    // return buffer
    if (useCache && Buffer.has(cacheName, cacheLabel)) {
      return Buffer.get(cacheName);
    }

    // return storage
    if (useCache && cacheStorage) {
      if (Storage.has(cacheName, cacheLabel)) {
        const data = Storage.get(cacheName);
        // storage => buffer
        Buffer.set(
          cacheName,
          Promise.resolve(data),
          cacheExpireTime,
          cacheLabel
        );
        return Promise.resolve(data);
      }
    }
    const curPromise = new Promise((resolve, reject) => {
      const handleFunc = (res) => {
        // do storage
        if (useCache && cacheStorage) {
          Storage.set(cacheName, res, cacheExpireTime, cacheLabel);
        }
        return res;
      };

      this._request(_config)
        .then((res) => {
          resolve(handleFunc(res));
        })
        .catch(reject);
    });

    // do buffer
    Buffer.set(cacheName, curPromise, cacheExpireTime, cacheLabel);

    return curPromise;
  }

  request(_config) {
    // config支持缓存
    if (_config.useCache) return this._cache(_config);

    return this._request(_config);
  }

  _request(_config = {}) {
    let config = mergeConfig(this.defaultConfig, _config);
    const { baseUrl, url, header, data = {}, transformRequest } = config;
    const computedConfig = {
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        ycFrom: 'yc-component',
        ...header,
      },
      ...(baseUrl && {
        url: combineUrl(url, baseUrl),
      }),
      ...(transformRequest &&
        typeof transformRequest === 'function' && {
          data: transformRequest(data),
        }),
    };
    config = mergeConfig(config, computedConfig);
    // console.log('iyourcar-component-axios__request-config :', config);
    return wxRequest(config);
  }
}

export default Axios;
