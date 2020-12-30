let scene = '';

export function getPageInfo() {
  const postData = {};
  try {
    if (!scene) {
      scene = wx.getLaunchOptionsSync().scene || '';
    }
    postData.scene = scene;
  } catch (error) {
    //
  }
  const pageList = getCurrentPages();
  if (pageList.length) {
    const currentPage = pageList[pageList.length - 1];
    const defaultOptions = JSON.stringify({ default: true });
    postData.currentPage = currentPage.__route__;
    const optionNameList = ['op', 'options', 'option'];
    postData.currentOptions = defaultOptions;
    optionNameList.forEach((i) => {
      const option = currentPage.data[i] || currentPage[i];
      if (option) {
        postData.currentOptions = JSON.stringify(option);
      }
    });
    if (pageList.length > 1 && pageList[pageList.length - 2]) {
      const previousPage = pageList[pageList.length - 2];
      postData.previousPage = previousPage.__route__;
      postData.previousOptions = defaultOptions;
      optionNameList.forEach((i) => {
        const option = previousPage.data[i] || previousPage[i];
        if (option) {
          postData.previousOptions = JSON.stringify(option);
        }
      });
    }
  }
  return postData;
}

export function mergeConfig(config0 = {}, config1 = {}) {
  return {
    ...config0,
    ...config1,
  };
}

export function combineUrl(url, host) {
  return `${host.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
}

export function ifReqSuccess(res) {
  return /^2/.test(res.statusCode.toString()) && res.data.errcode === 0;
}

export function ifReqNeedAuth(res) {
  return res.data.errcode === 100 || res.data.errcode === 101;
}

export function handleError(res) {
  if (res && res.data && res.data.msg) {
    wx.showToast({
      title: res.data.msg,
      icon: 'none',
    });
  }
}
