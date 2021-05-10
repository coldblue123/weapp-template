## weapp-template
动动你可爱的小手手点亮一颗star, 模板基于原生小程序 + axios(原生wx.request封装) + vant ui + less + iconfont + eslint 搭建, 纯粹干净, 希望能帮你少踩一些坑

## 启动项目
```bash
# 克隆项目
git clone https://github.com/coldblue123/weapp-template.git

# 进入项目目录
cd weapp-template

# 安装依赖
npm install

# 写入appid至项目
npm run dev 您的小程序appid

# 构建npm
微信开发者工具 工具 => 构建npm => 重新编译
```

## 目录
- [√ 环境变量配置](#env)
- [√ 自定义预处理命令配置](#create-env)
- [√ axios基于原生wx.request的封装](#axios)
- [√ vantUi](#vant)
- [√ 全局状态管理](#mox)
- [√ 计算属性](#computed)
- [√ less转wxss](#less)
- [√ sass转wxss](#sass)
- [√ iconfont组件](#iconfont)
- [√ 冗余文件过滤](#clear)
- [√ eslint](#eslint)

### <span id='env'>✅环境变量配置</span>
`env.js`里通过设置 `WE_APP_BASE_API` 来设置 `request` 请求的基本路径
```javascript
// weapp state base api
export const WE_APP_BASE_API = 'http://test001-api.xxx/v1'
```

### <span id='create-env'>✅自定义预处理命令配置</span>
`package.json` 里的 `scripts` 配置 `dev` `build`<br>
- 通过 `npm run dev ${1} ${2}` 启用开发环境<br>
- 通过 `npm run build ${1} ${2}` 打包上传环境<br>
`${1}`appid必传  `${2}`BASE_API默认正式服,非必传
#### 此功能为解决以下问题, 其作用类似于多环境变量<br>
1.便于多个小程序`appid`切换<br>
2.便于多个服务器`BASE_API`切换<br>
启用自定义预处理命令配置命令, 在编译前或上传前会自动替换`appid`与`BASE_API`<br>
<img src="https://note.youdao.com/yws/public/resource/6d39c8c0854ee74a82d677c892787543/xmlnote/EE4BC7D597754135BA40964AA99C89BB/4927">

### <span id="axios">✅axios基于原生wx.request的封装</span>
使用文档在`request/README.md`<br>
在`app.js`初始化
```javascript
import initAxios from './request/create'
App({
  onLaunch: function() {
    // 初始化axios
    initAxios()
  }
})
```
### <span id="vant">✅vantUi</span>

项目默认引入[vantUi](https://vant-contrib.gitee.io/vant-weapp/#/intro), 构建npm文件后生成 `miniprogram_npm/@vant/weapp` vantUi组件目录

### <span id="mox">✅全局状态管理</span>
`/components/mobx-example/index`为全局状态管理[mobx](https://developers.weixin.qq.com/miniprogram/dev/extended/utils/mobx.html)示例<br>
全局状态管理, 不要为了用而用, 看自己的项目是否有确切的需求, 花俏的堆砌反而会造成项目拥挤

### <span id="computed">✅计算属性</span>
`components/computed-example/index.js`为[computed](https://developers.weixin.qq.com/miniprogram/dev/extended/utils/computed.html)和[watch](https://developers.weixin.qq.com/miniprogram/dev/extended/utils/computed.html)示例<br>
wxs已经可以满足常规开发计算需要, 如果你的项目不严格要求组件化, 可以考虑不使用计算属性

### <span id="less">✅less转wxss</span>
vscode安装插件 `easy less`<br>
vscode编写less保存会自动编译生成wxss<br>
<img src="https://note.youdao.com/yws/public/resource/6d39c8c0854ee74a82d677c892787543/xmlnote/605844ECE813449C990FAF58643BF44F/4711"><br>
在`.vscode/settings.json`中添加以下配置
```json
"less.compile": {
      "outExt": ".wxss"
}
```

### <span id="sass">✅sass转wxss</span>
vscode安装插件 `easy sass`<br>
vscode编写scss保存会自动编译生成wxss<br>
<img src="https://note.youdao.com/yws/public/resource/6d39c8c0854ee74a82d677c892787543/xmlnote/B6D8CD72AFCF419DAC7394629C5588FC/4936"><br>
在`.vscode/settings.json`中添加以下配置
```json
  "easysass.formats": [{
    "format": "expanded",
    "extension": ".wxss"
  }]
```

### <span id="iconfont">✅iconfont组件</span>
`components/svg-icon` 已添加至全局组件<br>
`iconfont`文件在`app.less`中引入<br>
```html
<svg-icon icon="iconfont-github-o" size="108rpx" color="#333333"></svg-icon>
```

### <span id="clear">✅冗余文件过滤</span>
上传代码审核时会有不少冗余文件, 可以在`project.config.json`中过滤
```json
"packOptions": {
    "ignore": [
      {
        "type": "folder",
        "value": ".vscode"
      },
      {
        "type": "file",
        "value": ".gitignore"
      },
      {
        "type": "file",
        "value": ".eslintrc.js"
      },
      {
        "type": "file",
        "value": "package.json"
      },
      {
        "type": "file",
        "value": "package-lock.json"
      },
      {
        "type": "regexp",
        "value": "\\.md$"
      },
      {
        "type": "regexp",
        "value": "\\.less$"
      },
      {
        "type": "regexp",
        "value": "\\.scss$"
      }
    ]
  }
```

### <span id="eslint">✅eslint</span>
更改`.eslint.js`配置属于自己的规范, 小程序因为不支持`browser`显示, 所以仅在vscode中会出现错误提示, 并且在vscode中保存会自动格式化代码<br>
- 注意小程序全局变量会出现eslint错误, 因此需要手动添加全局变量<br>
<img src="https://note.youdao.com/yws/public/resource/6d39c8c0854ee74a82d677c892787543/xmlnote/E25860519A97403DA4183298CFFDB073/4639">
<img>

### 注意
`eslint`自动格式化和`wxss`自动编译转换在部分同学的 vscode 开发工具中不能正常使用<br>
解决方案: <br>
第一步: 在vscode中点击 文件=>将工作区另存为<br>
第二步: 在vscode中点击 文件=>打开工作区(选择刚刚另存为的工作区文件, 文件的后缀为`.code-workspace`) <br>
