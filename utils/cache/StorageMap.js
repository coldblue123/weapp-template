export default class StorageMap {
  static getCacheName(name) {
    // INJECTION_FROM_WEBPACK.serverType用户区分当前环境
    return `${"INJECTION_FROM_WEBPACK.serverType"}iyourcar_cache_${name}`;
  }
  get(name) {
    let storageData = null;
    try {
      storageData = wx.getStorageSync(name);
    } catch (e) {}
    return storageData;
  }
  set(name, data) {
    wx.setStorage({
      key: name,
      data,
    });
  }
  delete(name) {
    wx.removeStorageSync(name);
  }
}

export const storageMap = new StorageMap();
