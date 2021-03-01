const fs = require('fs')
const path = require('path')
const TARGET = process.env.npm_lifecycle_event
const rootPath = path.resolve(__dirname)
const api = process.argv[2] || '' // 不传任何参数则是默认接口

// 生产环境接口base_url
const prodUrl = api ? `https://${api}-api.xxx/v1` : 'https://api.xxx.com/v1'
const production = `
// weapp prod base api
export const WE_APP_BASE_API = "${prodUrl}" 
`

// 开发环境base_url
const devUrl = api ? `http://${api}-api.xxx/v1` : 'https://api.xxx.com/v1'
const development = `
// weapp state base api
export const WE_APP_BASE_API = "${devUrl}"
`

const BASE_URL = {
  'dev': development,
  'build': production
}

// 在根目录中生成env.js文件(也就是主包内)
fs.writeFileSync(path.resolve(rootPath, 'env.js'), BASE_URL[TARGET])
// pages/activity/下生成env.js(也就是独立分包内), 因为独立分包存在加载不到主包中env.js的情况所以单独生成一份env文件
// 假如不需要独立分包,可以注释以下代码
fs.writeFileSync(path.resolve(rootPath, 'pages/activity/env.js'), BASE_URL[TARGET])

